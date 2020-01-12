const checkPlateFormat = (res, plate) => {
  const re = new RegExp('([A-Z]{3})([0-9]{4})');
  if (!plate || !re.test(plate))
    return res.status(400).send(`The license plate must follow the following format: AAA1234.`);
};

module.exports = { checkPlateFormat };
