import './post-author.css';

function PostDetailAuthor(
  {author}
) {
  return (
    <div className="post-author">
      <div className="post-author__bg-avatar">
        <a href="/" className="post-author__avatar">
          <img src={author.avatar} alt="" />
        </a>
      </div>
      <div className="post-author__nickname">
        <a href="/">{author.nickname}</a>
      </div>
      <p className="post-author__desc" style={{textAlign: 'center'}}>
        {author.description}
      </p>
    </div>
  );
}

export default PostDetailAuthor;
