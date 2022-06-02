import React, { useEffect, useState } from 'react'
import { Col, Row, Typography,  Select, Spin } from 'antd'

import { getCoinHistory } from '../services/getCoins'

import LineChartProps from '../interfaces/props/LineChartProps'
import { Line } from 'react-chartjs-2';
import { CategoryScale, Utils } from "chart.js";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const LineChart = ({coinId}) => {
  const [timeperiod, setTimePeriod] = useState('7d')
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const [coinHistory, setCoinHistory] = useState([
    {
      "price": "1.0031865200509371",
      "timestamp": 1654048200
  }
  ])

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price in USD',
        data: [],
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  })

  const [options, setOptions] = useState({
    scales: {
      y: {
          ticks: {
              beginAtZero:true
          }
      }
  }
  })

  useEffect(()=>{
    getCoinHistory(coinId, timeperiod)
    .then(res=>{
      let data = res.data.history;
      setData({
        labels: data.map((item)=> item.timestamp),
    datasets: [
      {
        label: 'Price in USD',
        data: data.map(item=> item.price),
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
      })
    }
    )
  },[timeperiod])

  return (
    data.labels.length ?
    <>
      <Row className='chart-header'>
        <Typography.Title level={2} className="chart-title">Price Chart</Typography.Title>
        <Col className='price-container'>
          <Typography.Title level={5} className="price-change"></Typography.Title>
          <Typography.Title level={5} className="current-price"></Typography.Title>
        </Col>
      </Row>
      <Select 
          defaultValue="7d" 
          className='select-timeperiod' 
          onChange={(value)=> { setTimePeriod(value) } }
        >
          {time.map((date) => <option key={date}>{date}</option>)}
        </Select>
      <Line data={data} options={options} />
    </>
    : <><p>Loading Chart Data</p><Spin /></>
  )
}

export default LineChart