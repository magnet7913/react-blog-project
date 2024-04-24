import { Link } from 'react-router-dom';
import PostDetailPage from "../../pages/PostDetailPage";

export default function ArticleItemTitle(
  { title, slug }
) {
  return (
    <h2 className="article-item__title">
      {/* <a href={slug}>{title}</a> */}
        <Link to={`/post/${slug}`}>
          {title}
        </Link>
        {/* <Routes>
        <Route path={slug} element={<PostDetailPage></PostDetailPage>}></Route>
      </Routes> */}
    </h2>
  );
}
