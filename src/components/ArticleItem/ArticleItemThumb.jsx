import { Link } from 'react-router-dom';

export default function ArticleItemThumb(
  { thumb, slug }
) {
  let link = "assets/images/blog-1.jpg"
  if (thumb != false) {
    link = thumb
  }
  return (
    <div className="article-item__thumbnail">
      <Link to={`/post/${slug}`} className="btn btn-default">
        <img src={link} alt="assets/images/blog-1.jpg" />
      </Link>
    </div>
  );
}
