import React, { EffectCallback, useEffect, useState } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Button  } from 'antd'
import { Link } from 'react-router-dom'
import { getStats } from '../services/getStats'
const { Title } = Typography;

const Homepage: React.FC = () => {
        const [state, setState] = useState({
                "total": 0,
                "totalCoins": 0,
                "totalMarkets": 0,
                "totalExchanges": 0,
                "totalMarketCap": "0",
                "total24hVolume": "0",           
        })

        useEffect(() => {
                let mounted: boolean = true;
                getStats()
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
                        <Title level={2} className="heading">Global Crypto Stats</Title>
                        <Row>
                        <Col span={12}><Statistic title="Total Cryptocurrencies listed" value={state.totalCoins} /></Col>     
                        <Col span={12}><Statistic title="Total Exchanges" value={state.totalExchanges} /></Col>
                        <Col span={12}><Statistic title="Total Market Cap" value={state.totalMarketCap} /></Col>
                        <Col span={12}><Statistic title="Total 24h Volume" value={state.total24hVolume} /></Col>
                        <Col span={12}><Statistic title="Total Markets" value={state.totalMarkets} /></Col>
                        </Row>
                        <Button onClick={() => {getStats().then(res => { setState(res.data) })} }>Update</Button>
                </>
        )
      }
      
export default Homepage