import './post-detail.css';
import PostDetailComments from './PostDetailComments';
import PostDetailRichText from './PostDetailRichText';
import PostDetailTags from './PostDetailTags';

function PostDetailContent(
  {content,cate,postID,thumb}
) {  
  return (
    <div className="post-detail__content">
      <div className="thumbnail">
        <img src={thumb} alt="blog-title" />
      </div>
      <div className="content-padding">
        <PostDetailRichText content={content}/>

        <PostDetailTags cate={cate}/>

        <PostDetailComments postID={postID}/>
      </div>
    </div>
  );
}

export default PostDetailContent;
