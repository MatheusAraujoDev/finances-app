const currencyToNumber = (text: string) => {
  return Number(
    text
      .toString()
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.'),
  );
};

export default currencyToNumber;
