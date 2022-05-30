import React from 'react'
import { Menu } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import icon from '../images/cryptocurrency.png'

const Navbar: React.FC = () => {

  return (
    <div className='nav-container'>
        <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home" icon={<HomeOutlined/>}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="Cryptocurrencies" icon={<FundOutlined/>}>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item key="Exchanges" icon={<MenuFoldOutlined/>}>
              <Link to="/Exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item key="News" icon={<BulbOutlined/>}>
              <Link to="News">News</Link><div></div>
            </Menu.Item>
        </Menu>
    </div>
  )
}


export default Navbar