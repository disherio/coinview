import React, {useState, useEffect} from 'react'
import { Typography, Row, Col, Card, Input, Divider, Spin } from 'antd';
import moment from 'moment'
import { getNews } from '../services/getNews'
import { default as NewsArticle } from '../interfaces/NewsArticle';

const { Text, Title } = Typography;



interface NewsProps {
  simplified: boolean,
}

function checkImage(url: any) {
  if (url != undefined) {
    return "extra={<img src={article.image.thumbnail.contentUrl}></img>}"
  }
  console.log("image failed to load")
  return ""
}

const News: React.FC<NewsProps> = ({simplified}: NewsProps) => {
  const count = simplified ? 2 : 10;
  const NEWS_CATEGORY = 'Cryptocurrency';
  const [searchTerm, setSearchTerm] = useState('')
  const [state, setState] = useState([
    {
      _type: "",
      name: "",
      id: "",
      url: "/",
      image: {
        thumbnail: {
          contentUrl: ""
        }
      },
      description: "",
      about: [],
      provider: [],
      datePublished: "",
      category: "",
    }
  ])

  useEffect(() => {
    let mounted: boolean = true;
    getNews(NEWS_CATEGORY ,count).then(res =>{ if(mounted) {
      const filteredData = res.value.filter((article: NewsArticle) => article.name.toLowerCase().includes(searchTerm.toLowerCase()));
      // handle undefined images that would otherwise crash the renderer
      filteredData.map((article: any)=> {
        if (article.image === undefined) {
          article.image = {thumbnail: {contentUrl: ""}}
        }
      })
      setState(filteredData); mounted = false;
      console.log(res.value)
    }})  
    return;
  },[searchTerm])

  return (

    <>
      {/* { simplified ? <></> : 
        <div className='search-cryto'>
          <Title>Crypto News</Title>
          <Input placeholder='Search News' onChange={(e) => setSearchTerm(e.target.value)} />
          <Divider dashed></Divider>
        </div>
      } */}
      {(state.length>1) ? 
      <>
        <Row gutter={[ 24, 24]}>
          {state.map((article, i)=> (
            <Col xs={24} sm={12} lg={8} key={i}>
              <a href={article.url} target="_blank" rel="noreferrer">
              <Card 
                hoverable 
                className='news-card' 
                title={article.name}
                extra={<img src={article.image.thumbnail.contentUrl}></img>}
                headStyle={{whiteSpace: "break-spaces"}}
                bodyStyle={{whiteSpace: "break-spaces"}}
              >
                  <div style={{color: '#3366BB'}} className='news-descripton-container'>
                    {article.description}
                  </div>

              </Card>
              </a>
            </Col>
          ))}
        </Row>
      </> : <><p>Loading News...</p><Spin /></>}
    </> 
  )
}

export default News