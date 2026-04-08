export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start and end dates required' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  let analysis, status;
  if (duration < 21) { status = "Short"; analysis = "Cycle shorter than normal. May indicate hormonal imbalance."; }
  else if (duration <= 35) { status = "Normal"; analysis = "Cycle length is within normal range (21-35 days)."; }
  else { status = "Long"; analysis = "Cycle longer than 35 days. This is a key PCOS indicator."; }

  return res.status(200).json({ duration, status, analysis });
}