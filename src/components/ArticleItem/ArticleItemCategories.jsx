import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { clearCate } from '../../store/articleSlice'
export default function ArticleItemCategories({ cate }) {
  let category = useSelector((state) => state.CATEGORY.categoryList)

  let elmItem = []
  cate.forEach(function (item) {
    let foundObj = category[item] // 100
    if (foundObj) {
      elmItem.push(<li key={uuidv4()}>
        <Link to={`/cate/${foundObj.name}`} className="btn btn-default" onClick={useDispatch(clearCate())}>
          {foundObj.name}
        </Link>
      </li>)
    }
  })

  return (
    <ul className="article-item__categories" >
      {elmItem}
    </ul>
  );
}


