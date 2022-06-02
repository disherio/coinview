
const getExchanges = async () => {
  const res = await fetch(
      `https://e8ak6srjh8.execute-api.us-east-2.amazonaws.com/exchanges`, 
      {
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
}

const getExchange = async (exchangeId) => {
  const res = await fetch(
      `https://e8ak6srjh8.execute-api.us-east-2.amazonaws.com/exchange/${exchangeId}`, 
      {
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
}

export { getExchanges, getExchange }
