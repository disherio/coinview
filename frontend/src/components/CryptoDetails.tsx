import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select, Divider, Card, List, Button, Spin } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined} from '@ant-design/icons'
import { getCoinDetails, getCoinHistory } from '../services/getCoins'
import LineChart from './LineChart'
import LineChartProps from '../interfaces/props/LineChartProps'

import { default as CoinDetails } from '../interfaces/CoinDetails'

const { Title, Text}= Typography
const { Grid } = Card;
const { Item } = List;
const Loading = Spin;

const defaultState: CoinDetails = {
  "uuid": "",
  "symbol": "",
  "name": "",
  "description": "",
  "color": "",
  "iconUrl": "",
  "websiteUrl": "",
  "links": [{}],
  "supply": {
    "confirmed": false,
    "total": "0",
    "circulating": "0"
  },
  "numberOfMarkets": 0,
  "numberOfExchanges": 0,
  "24hVolume": "0",
  "marketCap": "0",
  "price": "0",
  "btcPrice": "0",
  "priceAt": 0,
  "change": "0",
  "rank": 0,
  "sparkline": [''],
  "allTimeHigh": {
    "price": "0",
    "timestamp": 0,
  },
  "coinrankingUrl": '/',
  "tier": 0,
  "lowVolume": false,
  "listedAt": 0,
}

const chartProps: LineChartProps = {
  coinHistory: {
    data: {
      history: [
        {
          price: '1',
          timestamp: 1
        },
      ]
    }
  },
  currentPrice: 'string',
  coinName: 'string'

}


const CryptoDetails: React.FC = () => {
  const { coinId } = useParams();
  const [state, setState] = useState(defaultState)
  const [coinHistory, setCoinHistory] = useState(chartProps.coinHistory)


  

  const stats = [
    { title: 'Price to USD', value: `$ ${state.price && millify(parseFloat(state.price))}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: state.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${state["24hVolume"] && millify(parseInt(state["24hVolume"]))}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${state.marketCap && millify(parseInt(state.marketCap))}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${ millify(parseFloat(state.allTimeHigh.price)
    ) }`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: state.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: state.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: state?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(
      isNaN(parseFloat(state?.supply?.total)) ? 0.0 : parseFloat(state?.supply?.total)
      )}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(parseFloat(state?.supply?.circulating))}`, icon: <ExclamationCircleOutlined /> },
  ];

  useEffect(() => {
    let mounted: boolean = true;
    
    getCoinDetails(coinId)
      .then(res => {
        if(mounted) {
          setState(res?.data?.coin)
          mounted = false
        }
      }
    )

    return;
  },[useParams])


  return (
    state.uuid ?
    <Col className='coin-detail-container'>
        <section>
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {state.name} ({state.symbol}) {'$'+state.price}
          </Title>
          <p>
            {state.name} live price in US dollars.
            View value statistics, market cap and supply.          
          </p>
        </Col>
        </section>
        <Divider></Divider>
        <section>
        <LineChart coinId={coinId}></LineChart>
        </section>
        <Divider></Divider>
        <Col className='stats-container'>
          <Col className='coin-value-statistics'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className="coint-details-heading">
                {state.name} Value Statistics
              </Title>
              <p>An overview showing the stats of {state.name}</p>
            </Col>
            {stats.map(({icon, title, value}) => (
              <Card>
              <Col className='coin-stats'>
                <Col className="coin-stats-name">
                  <Title level={4}>{icon} {title}</Title>
                </Col>
                <Text className='stats' strong>{value}</Text>
              </Col>
              </Card>
            ))}
            {genericStats.map(({icon, title, value}) => (
              <Card>
              <Col className='coin-stats'>
                <Col className="coin-stats-name">
                  <Title level={4}>{icon} {title}</Title>
                </Col>
                <Text className='stats' strong>{value}</Text>
              </Col>
              </Card>
            ))}
          </Col>
        </Col>
    </Col>
    : <><p>Loading...</p><Loading /></>
  )
}

export default CryptoDetails;