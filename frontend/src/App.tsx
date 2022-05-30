import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Layout, Typography, Divider, Space, Menu } from 'antd';
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components' 
import './App.css'
const { Title, Paragraph, Text, Link } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <>
    <Layout>
    <Header>
      <Navbar></Navbar>
    </Header>
      <Content className='content'>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/crypto/:coinId" element={<CryptoDetails price={"1"} name={"name"}/>} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Content>
      <Footer>©disher.io 2022</Footer>
    </Layout>
  </>
  )
}

export default App