import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom';

function PostDetailTags(
  { cate }
) {
  let category = useSelector((state) => state.CATEGORY.categoryList)
  let elmItem = []

  cate.forEach(function (item) {
    let foundObj = category[item]
    if (foundObj) {
      console.log(foundObj)
      elmItem.push(<li className="item" key={uuidv4()}>
        <Link to={`/cate/${foundObj.name}`} className="btn btn-default">
          {foundObj.name}
        </Link>

      </li>)
    }
  })

  return (
    <div className="post-detail__tags">
      <h2>Tags</h2>
      <ul>
        {elmItem}
      </ul>
    </div>
  );
}

export default PostDetailTags;
