import { fetchArticleByAuthor } from '../../store/articleSlice';
import PostDetailAuthor from './PostDetailAuthor';
import PostDetailRelatedPosts from './PostDetailRelatedPosts';
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react"

function PostDetailSidebar(
  {author,authorID}
) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchArticleByAuthor(authorID))
  }, [])

  const data = useSelector((state) => {
    const articleData = state.ARTICLE.relatedPost.data;
    return articleData && articleData.length > 0 ? articleData : null;
  });

  if (!data) {
    return null;
  }

  return (
    <div className="post-detail__side">
      <PostDetailAuthor author={author}/>
      <div className="spacing" />
      <PostDetailRelatedPosts relatedPost={data}/>
    </div>
  );
}

export default PostDetailSidebar;
