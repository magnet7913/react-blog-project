export default function ArticleItemDesc(
  {desc}
) {
  function MyComponent() {
    const htmlString = desc

    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
  return (
    <div className="article-item__desc">
      <MyComponent/>
    </div>
  );
}
