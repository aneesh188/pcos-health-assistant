export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { symptoms, bmi, cycleData } = req.body;

  // PCOS Risk Detection Logic (Rotterdam Criteria)
  let score = 0;
  let flags = [];

  // 1. Menstrual symptoms
  if (symptoms.irregularPeriods) { score += 30; flags.push("Irregular periods detected"); }
  if (symptoms.absentPeriods) { score += 35; flags.push("Absent periods — high risk indicator"); }

  // 2. Androgen symptoms
  if (symptoms.excessHair) { score += 15; flags.push("Excess facial/body hair (hirsutism)"); }
  if (symptoms.persistentAcne) { score += 10; flags.push("Persistent acne"); }
  if (symptoms.hairThinning) { score += 10; flags.push("Hair thinning"); }
  if (symptoms.darkPatches) { score += 10; flags.push("Dark skin patches"); }

  // 3. Metabolic symptoms
  if (symptoms.weightGain) { score += 10; flags.push("Unexplained weight gain"); }
  if (symptoms.difficultyLosingWeight) { score += 10; flags.push("Difficulty losing weight"); }
  if (symptoms.fatigue) { score += 5; flags.push("Chronic fatigue"); }

  // 4. BMI factor
  if (bmi > 25) { score += 10; flags.push("BMI above normal range"); }
  if (bmi > 30) { score += 10; flags.push("Obese BMI — increased risk"); }

  // 5. Cycle irregularity
  if (cycleData && cycleData.avgCycleLength > 35) {
    score += 20; flags.push("Long cycle length detected");
  }

  // Determine risk level
  let riskLevel, recommendation, color;

  if (score >= 60) {
    riskLevel = "High Risk";
    color = "red";
    recommendation = "Please consult a gynecologist immediately. Multiple PCOS indicators detected.";
  } else if (score >= 30) {
    riskLevel = "Medium Risk";
    color = "orange";
    recommendation = "Some PCOS symptoms detected. Schedule a doctor visit for blood tests and ultrasound.";
  } else {
    riskLevel = "Low Risk";
    color = "green";
    recommendation = "Low risk detected. Maintain a healthy lifestyle and monitor your cycle regularly.";
  }

  return res.status(200).json({
    score,
    riskLevel,
    color,
    recommendation,
    flags,
    disclaimer: "This is a screening tool only. Always consult a qualified healthcare provider."
  });
}