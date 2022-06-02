import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import icon from '../images/cryptocurrency.png'

const Navbar: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(()=> {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  },[]);

  useEffect(()=>{
    if(screenSize < 768) {
      setMobileMenu(true)
    } else {
      setMobileMenu(false)
    }
  },[screenSize])

  return (
    <div className='nav-container'>
          <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['home']} triggerSubMenuAction={'click'}> 
            { (mobileMenu) ? 
            
            <Menu.SubMenu title="Menu" key="submenu" popupOffset={[0, 0]} icon={<MenuOutlined/>}>
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
            </Menu.SubMenu> 
            :
              <>
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
              </>        
            }
          </Menu> 
    </div>
  )
}

export default Navbar