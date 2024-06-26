import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = 'in', category = 'general', apiKey, pageSize = 8, setProgress, searchKeyword }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        if (searchKeyword) {
            url = `https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        }
        setLoading(true);
        let data = await fetch(url);
        setProgress(30);
        let parsedData = await data.json();
        setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsKwik - ${capitalizeFirstLetter(category)}`;
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword]);

    useEffect(() => {
        document.title = `NewsKwik - ${capitalizeFirstLetter(category)}`;
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country]);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
        if (searchKeyword) {
            url = `https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
        }
        setPage(nextPage);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles([...articles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults);
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsKwik - Top {capitalizeFirstLetter(category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    setProgress: PropTypes.func.isRequired,
    searchKeyword: PropTypes.string,
}

export default News;
