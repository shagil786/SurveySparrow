export function generateData(xRange, yRange, numberOfPoints = 5) {
  const xJump = (xRange[1] - xRange[0]) / numberOfPoints,
    yJump = (yRange[1] - yRange[0]) / numberOfPoints;

  const generateRandomNumber = (min, max) => Math.random() * (max - min) + min;
  const xLabels = Array.from(
    { length: numberOfPoints },
    (_, i) => i * xJump + 1
  );
  const yLables = Array.from({ length: numberOfPoints }, (_, i) => (i + 1) * yJump);
  const values = Array.from({ length: numberOfPoints + 1 }, () =>
    generateRandomNumber(yRange[0], yRange[1])
  );
  const minValue = Math.min(...values);
  const data = values?.filter((value) => value !== minValue);
  console.log(yLables);
  return {
    minValue: minValue,
    data: data.map((y, i) => ({ x: xLabels[i % xLabels.length], y })),
    labels: { x: xLabels, y: yLables },
  };
}

export function maxArray(data) {
  return data?.reduce((curr, acc) => Math.max(curr, acc), -Infinity);
}

export function minArray(data) {
  return data?.reduce((curr, acc) => Math.min(curr, acc), Infinity);
}
