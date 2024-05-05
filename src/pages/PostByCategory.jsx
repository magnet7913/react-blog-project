import Button from "../components/shared/Button";
import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { useParams } from "react-router-dom"
import { fetchArticleByCategory, clearCate } from "../store/articleSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"

function PostByCategoryPage() {
  const dispatch = useDispatch()
  const { slug } = useParams()

  let cateList = useSelector((state) => state.CATEGORY.categoryList)
  let cateID = Object.keys(cateList).find(key => cateList[key].name === slug)
  let currentPage = useSelector((state) => state.ARTICLE.byCategory.currentPage);
  let totalPage = useSelector((state) => state.ARTICLE.byCategory.totalPage);

  console.log('currentPage', currentPage);
  console.log('totalPage', totalPage);

  // window.addEventListener('beforeunload', dispatch(clearCate()))

  useEffect(() => {
    dispatch(fetchArticleByCategory([slug, 1]))
  }, [slug])

  let articleList = useSelector((state) => state.ARTICLE.byCategory.list)

  return (
    <div className="articles-list section">
      <div className="tcl-container">

        <MainTitle type="search">Các bài viết thuộc danh mục "{slug}"</MainTitle>

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
        {currentPage < totalPage && <div className="text-center">
          <Button type="primary" size="large" loading={false} onClick={() => dispatch(fetchArticleByCategory([slug, currentPage + 1]))}>
            Tải thêm
          </Button>
        </div>}
      </div>
    </div>

  )
}

export default PostByCategoryPage