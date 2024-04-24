import Button from "../components/shared/Button";
import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { fetchArticleByKeyword, clearCate } from "../store/articleSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"

function SearchPage() {
  const dispatch = useDispatch()

  const params = new URLSearchParams(location.search).get('keyword')
  let cateList = useSelector((state) => state.CATEGORY.categoryList)
  let currentPage = useSelector((state) => state.ARTICLE.byCategory.currentPage);
  let totalPage = useSelector((state) => state.ARTICLE.byCategory.totalPage);

  useEffect(() => {
    dispatch(clearCate),
      dispatch(fetchArticleByKeyword([params, 1]))
  }, [params])

  let articleList = useSelector((state) => state.ARTICLE.byCategory.list)
  console.log(params)
  return (
    <div className="articles-list section">
      <div className="tcl-container">

        <MainTitle type="search">{totalPage} kết quả tìm kiếm với từ khóa "{params}"</MainTitle>

        <div className="tcl-row tcl-jc-center">
          {articleList.map((item) => {
            return <div className="tcl-col-12 tcl-col-md-8" key={item.id}>
              <ArticleItem
                isStyleCard
                isShowCategories
                isShowAvatar={false}
                isShowDesc={false}
                item={item}
              />
            </div>
          })}

        </div>

        <div className="text-center">
          <Button type="primary" size="large">Tải thêm</Button>
        </div>
      </div>
    </div>

  )
}

export default SearchPage