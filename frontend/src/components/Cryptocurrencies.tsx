import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Divider, Typography, Spin } from 'antd'
import { CryptoDetails } from '../components' 
import { getCoins } from '../services/getCoins'
import { default as CoinListing } from '../interfaces/CoinListing'

const { Title } = Typography;

interface CrypocurrenciesProps {
  simplified: boolean
}

const defaultState: CoinListing[] = [
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
    "sparkline": [""],
    "lowVolume": false,
    "coinrankingUrl": "",
    "24hVolume": "",
    "btcPrice": ""
}
]



const Cryptocurrencies: React.FC<CrypocurrenciesProps> = ({simplified}: CrypocurrenciesProps) => {
  const count = simplified ? 12 : 100;
  const [searchTerm, setSearchTerm] = useState('')
  const [state, setState] = useState(defaultState)


  // coin data update // Currently makes an api call everytime search is changed, 
  useEffect(() => {
    let mounted: boolean = true;
    getCoins(count).then(res =>{ if(mounted) {
      const filteredData = res.data.coins.filter((coin: CoinListing) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setState(filteredData); mounted = false;
    }})  
    return;
  },[searchTerm])

  return (
    <> 
      { simplified ? <></> : 
        <div className='search-cryto'>
          <Title>Coin Rankings</Title>
          <Input placeholder='Search Coins' onChange={(e) => setSearchTerm(e.target.value)}/>
          <Divider dashed></Divider>
        </div>
      }

      {(state.length>1) ?
      <Row gutter={[32, 32]} className="crypto-card-container">
        {state.map((coin) => (
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
      : <><p>Loading Coins...</p><Spin></Spin></>}

    </>

  )
}

export default Cryptocurrencies