const numberToCurrency = (value: string | number) => {
  return value
    .toString()
    .replace(/\D/g, '') // only numbers
    .replace(/(\d)(\d{2})$/, "$1.$2") // the first 2 numbers on the right are the cents, adds a point(".")
    .replace(/(?=(\d{3})+(\D))\B/g, ",") // for each 3 numbers adds a comma(",")
};

export default numberToCurrency;
