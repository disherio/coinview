
const getStats = async () => {
  const res = await fetch(
      "https://api.coinranking.com/v2/stats", 
      {
        "method": "GET",
        "headers": {
        // need to hide tokens in production
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

export { getStats }