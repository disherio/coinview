import React, {useState, useEffect} from 'react'
import { Typography, Table, Spin, Avatar } from 'antd';
import { getExchanges, getExchange } from '../services/getExchanges';
import { ColumnsType } from 'antd/lib/table';
import HTMLReactParser from 'html-react-parser';
const { Text, Title } = Typography;

interface TableData {
  key: React.Key
  uuid: string,
  rank: number,
  name: string,
  iconUrl: string,
  verified: boolean,
  recommended: boolean,
  numberOfMarkets: number,
  numberOfCoins: number,
  marketShare: string,
  coinrankingUrl: string,
  '24hVolume': string,
  description: string
}

// const columns: ColumnsType<TableData> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name'
//   },
//   {
//     title: 'Rank',
//     dataIndex: 'rank',
//     key: 'rank'
//   },
//   {
//     title: 'Market Share',
//     dataIndex: 'marketShare',
//     key: 'marketShare'
//   },
// ]

const Exchanges: React.FC = () => {
  const [hasRendered, setHasRendered] = useState(false) 
  const [exchanges, setExchanges] = useState([
    {
      key: 0,
      "uuid": "",
      "rank": 0,
      "name": "",
      "iconUrl": "/",
      "verified": false,
      "recommended": false,
      "numberOfMarkets": 0,
      "numberOfCoins": 0,
      "marketShare": "0",
      "coinrankingUrl": "/",
      "24hVolume": "0",
      "description": ""
  },
  ])

  useEffect(()=>{
    console.log("get exchanges")
    let mounted = true;
    getExchanges()
      .then((res)=>{
        let data = res?.data?.exchanges
        data.map((item: TableData, key: number)=>{
          item.key = key;
          item.marketShare = item.marketShare
        })
        setExchanges(data)
      })
    mounted = false;
  },[])

  useEffect(()=>{
    console.log("get exchange")
    let mounted = true;
    let exchangesCopy = exchanges;

    exchanges.map((item, index)=>{

      getExchange(item.uuid)
      .then((res)=>{
        let description = res?.data?.exchange?.description ? res?.data?.exchange?.description : ""
        let websiteUrl = res?.data?.exchange?.websiteUrl ? res?.data?.exchange?.websiteUrl : "/"
        exchangesCopy[index].description =  description;
        
        setExchanges(exchangesCopy)
      })
    })
    mounted = false;
  },[exchanges])


  return (
    <>
      <Title>Exchanges</Title>
      {(exchanges[0].uuid) ? 
      <>
        <Table 
          // columns={columns} 
          expandable={{
                expandedRowRender: record => 
                  <p style={{ margin: 0 }}>
                    { 
                    <> { record.description ? HTMLReactParser(record.description) : <Spin></Spin>} </>
                    } 
                  </p>,
                rowExpandable: record => record.name !== 'Not Expandable',
                onExpand: ()=>{}
          }}
          
          dataSource={exchanges}
        >
                    <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="" dataIndex="iconUrl" key="iconUrl" 
            render= { iconUrl => ( <Avatar src={iconUrl} /> ) }
          />

          <Table.Column title="Rank" dataIndex="rank" key="rank" />
          <Table.Column title="Market Share" dataIndex="marketShare" key="marketShare" />
        </Table>
      </> : <><p>Loading Data...</p><Spin /></> 
      }
    </>

  )
}

export default Exchanges