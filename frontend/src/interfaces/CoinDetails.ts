export default interface CoinDetails{
  "uuid": string,
  "symbol": string,
  "name": string,
  "description": string,
  "color": string,
  "iconUrl": string,
  "websiteUrl": string,
  "links": object[],
  "supply": {
    "confirmed": boolean,
    "total": string,
    "circulating": string
  },
  "numberOfMarkets": number,
  "numberOfExchanges": number,
  "24hVolume": string,
  "marketCap": string,
  "price": string,
  "btcPrice": string,
  "priceAt": number,
  "change": string,
  "rank": number,
  "sparkline": string[],
  "allTimeHigh": {
    "price": string,
    "timestamp": number
  },
  "coinrankingUrl": string,
  "tier": number,
  "lowVolume": boolean,
  "listedAt": number,
}

