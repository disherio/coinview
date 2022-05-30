import React, { useState, useEffect } from 'react'
import { CryptoDetails } from '../components' 
import { getCoins } from '../services/getCoins'

const Cryptocurrencies: React.FC = () => {
  const [state, setState] = useState({
    coins: [
      {
        "uuid": "",
        "symbol": "",
        "name": "",
        "color": "",
        "iconUrl": "",
        "marketCap": "",
        "price": "",
        "listedAt": 0,
        "tier": 0,
        "change": "",
        "rank": 0,
        "sparkline": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "lowVolume": false,
        "coinrankingUrl": "",
        "24hVolume": "",
        "btcPrice": ""
    }
    ], 
  })

  useEffect(() => {
    let mounted: boolean = true;
    getCoins()
            .then(res =>{
                    if(mounted) {
                            setState(res.data)
                            mounted = false;
                    }
            })
    
    return;
},[])

  return (
    <> 
      <ul>
        {state.coins.map(coin => {
          return (
            <li key={coin.uuid}>
              <CryptoDetails price={coin.price} name={coin.name}/>
            </li>
          )
        })}
      </ul>

    </>
  )
}

export default Cryptocurrencies