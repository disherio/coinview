import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { CryptoDetails } from '../components' 
import { getCoins } from '../services/getCoins'

interface CrypocurrenciesProps {
  simplified: boolean
}

const Cryptocurrencies: React.FC<CrypocurrenciesProps> = ({simplified}: CrypocurrenciesProps) => {
  const count = simplified ? 12 : 100;
  const [state, setState] = useState({
    coins: [
      {
        "uuid": "",
        "symbol": "",
        "name": "",
        "color": "",
        "iconUrl": "",
        "marketCap": "-1",
        "price": "-1",
        "listedAt": 0,
        "tier": 0,
        "change": "-1",
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
    getCoins(count)
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
      <Row gutter={[32, 32]} className="crypto-card-container">
        {state.coins.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card 
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className='crypto-image' src={coin.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(parseFloat(coin.price))}</p>
                <p>Market Cap: {millify(parseFloat(coin.marketCap))}</p>
                <p>Daily Change: {millify(parseFloat(coin.change))}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {/* <ul>
        {state.coins.map(coin => {
          return (
            <li key={coin.uuid}>
              <CryptoDetails price={coin.price} name={coin.name}/>
            </li>
          )
        })}
      </ul> */}

    </>
  )
}

export default Cryptocurrencies