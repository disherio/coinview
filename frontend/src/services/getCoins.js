const getCoins = async (count) => {
  const res = await fetch(
      `https://api.coinranking.com/v2/coins?limit=${count}`, 
      {
        "method": "GET",
        "headers": {
        "x-access-token": "coinrankingf4f50f46ee7fff173f7a0c22cdb44bf2369f30d9f4983ab5",
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
      `https://api.coinranking.com/v2/coin/${coinId}`, 
      {
        "method": "GET",
        "headers": {
        "x-access-token": "",
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
    `https://api.coinranking.com/v2/coin/${coinId}/history?timePeriod=${timeperiod}`, 
      {
        "method": "GET",
        "headers": {
        "x-access-token": "",
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