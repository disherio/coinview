const getCoins = async (count) => {
  const res = await fetch(
      `https://e8ak6srjh8.execute-api.us-east-2.amazonaws.com/coins?limit=${count}`, 
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

const getCoinDetails = async (coinId) => {
  const res = await fetch(
      `https://e8ak6srjh8.execute-api.us-east-2.amazonaws.com/coin/${coinId}`, 
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

const getCoinHistory = async (coinId, timeperiod) => {
  const res = await fetch(
    `https://e8ak6srjh8.execute-api.us-east-2.amazonaws.com/${coinId}/history?timePeriod=${timeperiod}`, 
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


export { getCoins, getCoinDetails, getCoinHistory }