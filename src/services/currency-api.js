const currencyUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';

const fetchCurrency = async () => {
  try {
    const response = await fetch(currencyUrl);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchCurrency;
