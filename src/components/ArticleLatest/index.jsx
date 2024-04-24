import ArticleItem from '../ArticleItem';
import MainTitle from '../shared/MainTitle';
import './latest-news-list.css';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {fetchLatestArticleList} from "../../store/articleSlice"

function ArticleLatest() {
  const dispatch = useDispatch()
  let articleList = useSelector((state)=> state.ARTICLE.latestList)
  
  useEffect(()=>{
    dispatch(fetchLatestArticleList())
  },[])

  return (
    <div className="latest-news section">
      <div className="tcl-container">
        <MainTitle />

        <div className="latest-news__list spacing">
          {articleList.map((item)=>{
            return <div className="latest-news__card" key={item.id}>
            <ArticleItem item={item} />
          </div>
          })}

        </div>
      </div>
    </div>
  );
}

export default ArticleLatest;
