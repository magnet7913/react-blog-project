export default function ArticleItemAvatar(
  {authorData}
) {
  return (
    <div className="article-item__author-image">
      <a aria-label={authorData.nickname} href="/">
        <img src={authorData.avatar} alt={authorData.nickname} />
      </a>
    </div>
  );
}
