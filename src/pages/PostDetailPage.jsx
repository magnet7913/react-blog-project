
import { useParams } from "react-router-dom"
import PostDetailContent from "../components/PostDetail/PostDetailContent"
import PostDetailHead from "../components/PostDetail/PostDetailHead"
import PostDetailSidebar from "../components/PostDetail/PostDetailSidebar"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { clearRelated, clearSlug, fetchArticleBySlug } from "../store/articleSlice"
import { fetchCommentList } from "../store/commentSlice"

function PostDetailPage() {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(fetchArticleBySlug(params['slug']))
  }, [params['slug']])

  const data = useSelector((state) => state.ARTICLE.bySlug);

  if (!data) {
    return null;
  }

  return (
    <main className="post-detail">
      <div className="spacing" />

      <PostDetailHead title={data.title} author={data.author} postDate={data.postDate} view={data.view} />

      <div className="spacing" />

      <div className="post-detail__fluid">
        <div className="tcl-container">
          <div className="post-detail__wrapper">
            <PostDetailContent content={data.content} cate={data.category} postID={data.id} thumb={data.thumb} />

            <PostDetailSidebar author={data.author} authorID={data.authorId} postID={data.id} />
          </div>
        </div>
      </div>
    </main>

  )
}

export default PostDetailPage