import ArticleRelated from '../ArticleItem/ArticleRelated';

function PostDetailRelatedPosts(
  {relatedPost}
) {
  return (
    <div className="related-post">
      <h2 className="related-post__head">Related Posts</h2>
      
      {relatedPost.map((item)=>{
        console.log
            return <ArticleRelated key={item.id} item={item}/>
          })}
    </div>
  );
}

export default PostDetailRelatedPosts;
