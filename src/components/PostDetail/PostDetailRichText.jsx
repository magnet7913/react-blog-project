function PostDetailRichText(
  { content }
) {
  return (
    <div className="rte" dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export default PostDetailRichText;
