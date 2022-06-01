const options = {
	method: 'GET',
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
		'X-RapidAPI-Key': '8ad8b8a259msh5c5ac41afd81453p1560cejsn2674f8d3c175'
	}
};

const getNews = async (newsCategory ,count) => {
  const res = await fetch(
    `https://bing-news-search1.p.rapidapi.com/news/search?q=crypto&safeSearch=Off&textFormat=Raw&count=${count}`, 
    options,
  );
  if (!res.ok) {
    throw new Error(res.status);
  }
  return res.json();
}

export { getNews }