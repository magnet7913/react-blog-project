
import { useParams } from "react-router-dom"
import PostDetailContent from "../components/PostDetail/PostDetailContent"
import PostDetailHead from "../components/PostDetail/PostDetailHead"
import PostDetailSidebar from "../components/PostDetail/PostDetailSidebar"
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react"
import { clearRelated, clearSlug, fetchArticleBySlug } from "../store/articleSlice"
import { fetchCommentList } from "../store/commentSlice"

function PostDetailPage() {
  const dispatch = useDispatch()
  const params = useParams()
  
  useEffect(() => {
    dispatch(clearSlug())
    dispatch(clearRelated())
    dispatch(fetchArticleBySlug(params['*']))
  }, [params['*']])
  
  const data = useSelector((state) => {
    const articleData = state.ARTICLE.bySlug.data;
    return articleData && articleData.length > 0 ? articleData[0] : null;
  });

  if (!data) {
    return null;
  }
  
  return (
    <main className="post-detail">
      <div className="spacing" />
      
      <PostDetailHead title={data.title} author={data.author} postDate={data.postDate} view={data.view}/>
      
      <div className="spacing" />

      <div className="post-detail__fluid">
        <div className="tcl-container">
          <div className="post-detail__wrapper">
            <PostDetailContent content={data.desc} cate={data.category} postID={data.id} thumb={data.thumb}/>

            <PostDetailSidebar author={data.author} authorID={data.authorId}/>
          </div>
        </div>
      </div>
    </main>

  )
}

export default PostDetailPage