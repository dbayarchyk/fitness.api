const getBodyMassIndex = (weight, height) => Math.round(weight / Math.pow(height / 100, 2));

export default getBodyMassIndex;
