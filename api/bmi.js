export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { weight, height } = req.body;

  if (!weight || !height) {
    return res.status(400).json({ error: 'Weight and height are required' });
  }

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  let category, advice;
  if (bmi < 18.5) { category = "Underweight"; advice = "Consider gaining healthy weight"; }
  else if (bmi < 25) { category = "Normal"; advice = "Great! Maintain your healthy weight"; }
  else if (bmi < 30) { category = "Overweight"; advice = "Weight management can help reduce PCOS risk"; }
  else { category = "Obese"; advice = "Weight loss is strongly recommended to reduce PCOS symptoms"; }

  return res.status(200).json({ bmi: parseFloat(bmi), category, advice });
}