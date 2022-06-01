import React, { EffectCallback, useEffect, useState } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Button, Divider  } from 'antd'
import { Link } from 'react-router-dom'
import { getStats } from '../services/getStats'
import { Cryptocurrencies, News } from '../components'
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
                <section>
                        <Title level={1} className="">Coinview.online</Title>
                        <Divider></Divider>
                </section>
                <section>
                        <Title level={2} className="heading">Global Crypto Stats</Title>
                        <Row>
                        <Col span={12}><Statistic title="Total Cryptocurrencies listed" value={state.totalCoins} /></Col>     
                        <Col span={12}><Statistic title="Total Exchanges" value={state.totalExchanges} /></Col>
                        <Col span={12}><Statistic title="Total Market Cap" value={state.totalMarketCap} /></Col>
                        <Col span={12}><Statistic title="Total 24h Volume" value={state.total24hVolume} /></Col>
                        <Col span={12}><Statistic title="Total Markets" value={state.totalMarkets} /></Col>
                        <Col span={12}><Button onClick={() => {getStats().then(res => { setState(res.data) })} }>Update</Button></Col>
                        </Row>
                        <Divider></Divider>
                </section>
                <section>
                        <div className="home-heading-container">
                                <Title level={2} className="home-title">Top Crypocurrencies</Title>
                                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
                        </div>
                        <Cryptocurrencies simplified={true}/>
                        <Divider></Divider>
                </section>
                <section>
                <div className="home-heading-container">
                                <Title level={2} className="home-title">Latest Crypto News</Title>
                                <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
                        </div>
                        <News simplified={true}/>
                </section>
                </>
        )
      }
      
export default Homepage