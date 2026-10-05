export function calculateTrainingStatus(hours, starts) {
  const maxHours = 30;
  const maxStarts = 40;

  const hoursScore = hours / maxHours;
  const startsScore = starts / maxStarts;
  const percentage = ((hoursScore + startsScore) / 2) * 100;

  let status;
  if (percentage >= 66.67) {
    status = "green";
  } else if (percentage >= 33.33) {
    status = "yellow";
  } else {
    status = "red";
  }

  return { status, percentage: Number(percentage.toFixed(2)) };
}
