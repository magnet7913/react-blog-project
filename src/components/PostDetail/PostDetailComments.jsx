import './comments.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { fetchCommentList } from '../../store/commentSlice';
import Button from '../shared/Button';
import CommentContent from './CommentContent';

function PostDetailComments(
  { postID }
) {
  const dispatch = useDispatch()
  let currentPage = useSelector((state) => state.COMMENT.currentPage);
  let totalPages = useSelector((state) => state.COMMENT.totalPages);
  let avatar = useSelector((state)=> state.LOGIN.user.avatar)

  useEffect(() => {
    dispatch(fetchCommentList([postID, 1]))
  }, [])
  let comment = useSelector((state) => state.COMMENT.commentList)
  let totalComment = useSelector((state) => state.COMMENT.totalComments)

  return (
    <div className="post-detail__comments">
      <div className="comments__form">
        <div className="comments__form--control">
          <div className="comments__section--avatar">
            <a href="/">
              <img src={avatar} alt="" />
            </a>
          </div>
          <textarea />
        </div>
        <div className="text-right">
          <button className="btn btn-default">Gửi bình luận</button>
        </div>
      </div>
      <p>{totalComment} bình luận</p>
      <ul className="comments">
        {comment.map(item => (
          <li className="item" key={item.id}>
            <CommentContent item={item} postID={postID} avatar={avatar} />
          </li>
        ))}
      </ul>
      {currentPage < totalPages && <div className="text-center">
        <Button type="primary" size="large" loading={false} onClick={() => dispatch(fetchCommentList([postID, currentPage + 1]))}>
          Tải thêm bình luận
        </Button>
      </div>}

    </div>
  );
}

export default PostDetailComments;
