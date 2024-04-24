import ArticleItem from '../ArticleItem';
import './popular-news-list.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchPopularArticleList } from "../../store/articleSlice"
import { fetchCategoryList } from "../../store/categorySlice"

function ArticlePopular() {
  const dispatch = useDispatch()
  let articleList = useSelector((state) => state.ARTICLE.popularList)
  let halfLeft = articleList.slice(0, 2)
  let halfRIght = articleList.slice(-1)


  useEffect(() => {
    dispatch(fetchPopularArticleList())
  }, [])
  

  return (
    <div className="popular-news section bg-white-blue">
      <div className="tcl-container">
        {/* Main Title */}
        <div className="main-title spacing d-flex tcl-jc-between tcl-ais-center">
          <h2>Popular Articles</h2>
          <a href="/" className="btn btn-default">
            View More
          </a>
        </div>
        {/* End Main Title */}
        <div className="popular-news__list spacing">
          <div className="popular-news__list--left">
            <div className="popular-news__list--row">
              {halfLeft.map((item) => {
                return <div className="popular-news__list--card" key={item.id}>
                  <ArticleItem isStyleCard isShowCategories isShowDesc item={item} />
                </div>
              })}
            </div>
          </div>
          <div className="popular-news__list--right">
            <div className="popular-news__list--row">
              {halfRIght.map((item) => {
                return <div className="popular-news__list--card" key={item.id}>
                  <ArticleItem isStyleCard isStyleRow isShowDes item={item} />
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePopular;
