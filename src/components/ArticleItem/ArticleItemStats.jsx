export default function ArticleItemStats(
  {view}
) {
  return (
    <ul className="article-item__stats">
      <li>
        <i className="icons ion-ios-eye"></i>
        <span className="text">{view}</span>
      </li>
    </ul>
  );
}
