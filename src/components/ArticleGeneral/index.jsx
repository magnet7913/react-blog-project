import ArticleItem from '../ArticleItem';
import Button from '../shared/Button';
import MainTitle from '../shared/MainTitle';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState } from 'react';
import { fetchRandomArticleList } from "../../store/articleSlice"

function ArticleGeneral() {
  const dispatch = useDispatch()
  let articleList = useSelector((state) => state.ARTICLE.randomList.list)
  let currentPage = useSelector((state) => state.ARTICLE.randomList.currentPage);
  let totalPages = useSelector((state) => state.ARTICLE.randomList.totalPages);
  
  useEffect(() => {
    dispatch(fetchRandomArticleList(1))
  }, [1])

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        {/* Main Title */}
        <MainTitle btnLabel="Xem them">Bai Viet Tong Hop</MainTitle>
        {/* End Main Title */}
        {/* End Row News List */}
        <div className="tcl-row">

          {articleList.map((item) => {
            return <div className="tcl-col-12 tcl-col-md-6" key={item.id}>
              <ArticleItem isStyleCard isShowAvatar={false} item={item} />
            </div>
          })}


        </div>
        {/* End Row News List */}
        {currentPage < totalPages && <div className="text-center">
          <Button type="primary" size="large" loading={false} onClick={() => dispatch(fetchRandomArticleList(currentPage + 1))}>
            Tải thêm
          </Button>
        </div>}

      </div>
    </div>
  );
}

export default ArticleGeneral;
