import { fetchArticleByAuthor } from '../../store/articleSlice';
import PostDetailAuthor from './PostDetailAuthor';
import PostDetailRelatedPosts from './PostDetailRelatedPosts';
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react"

function PostDetailSidebar(
  {author,authorID,postID}
) {
  const dispatch = useDispatch()
  
  // useEffect(() => {
  //   dispatch(fetchArticleByAuthor([authorID,postID]))
  // }, [])

  const data = useSelector((state) => state.ARTICLE.relatedPost);


  return (
    <div className="post-detail__side">
      <PostDetailAuthor author={author}/>
      <div className="spacing" />
      <PostDetailRelatedPosts relatedPost={data}/>
    </div>
  );
}

export default PostDetailSidebar;
