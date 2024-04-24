import Button from "../components/shared/Button";
import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { useParams } from "react-router-dom"
import { fetchArticleByCategory, clearCate } from "../store/articleSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"

function PostByCategoryPage() {
  const dispatch = useDispatch()
  const params = useParams()
  
  let cateList = useSelector((state) => state.CATEGORY.categoryList)
  let cateID = Object.keys(cateList).find(key => cateList[key].name === params['*'])
  let currentPage = useSelector((state) => state.ARTICLE.byCategory.currentPage);
  let totalPage = useSelector((state) => state.ARTICLE.byCategory.totalPage);

  // window.addEventListener('beforeunload', dispatch(clearCate()))

  useEffect(() => {
    dispatch(clearCate),
    dispatch(fetchArticleByCategory([cateID, 1]))
  }, [cateID])

  let articleList = useSelector((state) => state.ARTICLE.byCategory.list)

  return (
    <div className="articles-list section">
      <div className="tcl-container">

        <MainTitle type="search">Các bài viết thuộc danh mục "{params["*"]}"</MainTitle>

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
          <Button type="primary" size="large" loading={false} onClick={() => dispatch(fetchArticleByCategory([cateID, currentPage + 1]))}>
            Tải thêm
          </Button>
        </div>
      </div>
    </div>

  )
}

export default PostByCategoryPage