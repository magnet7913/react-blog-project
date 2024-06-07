import './comments.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { fetchCommentList } from '../../store/commentSlice';
import Button from '../shared/Button';
import CommentContent from './CommentContent';
import { fetchPostComment } from '../../store/commentSlice';

function PostDetailComments(
  { postID }
) {
  const dispatch = useDispatch()
  let currentPage = useSelector((state) => state.COMMENT.currentPage);
  let totalPages = useSelector((state) => state.COMMENT.totalPages);
  let avatar = useSelector((state) => {
    if (state.LOGIN.user && state.LOGIN.user.avatar) {
      return state.LOGIN.user.avatar;
    } else {
      "\src\assets\images\bg-author.png"
    }
  })

  let authorID = useSelector((state) => state.ARTICLE.bySlug.authorId)
  let token = localStorage.getItem('token')
  let hidden;

  if (token === null) {
    hidden = true;
  } else {
    hidden = false;
  }
  useEffect(() => {
    dispatch(fetchCommentList([postID, 1]))
  }, [postID])

  let comment = useSelector((state) => state.COMMENT.commentList)
  let totalComment = useSelector((state) => state.COMMENT.totalComments)

  const [commentText, setCommentText] = useState('');

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = () => {
    dispatch(fetchPostComment([token, { author: authorID, content: commentText, post: postID, parent: 0 }])).then((result) => {
    })
    setCommentText("")
  }

    return (
      <div className="post-detail__comments">
        <div className="comments__form" hidden={hidden}>
          <div className="comments__form--control">
            <div className="comments__section--avatar">
              <a href="/">
                <img src={avatar} alt="" />
              </a>
            </div>
            <textarea onChange={handleInputChange} value={commentText} />
          </div>
          <div className="text-right">
            <button className="btn btn-default" onClick={handleSubmitComment}>Gửi bình luận</button>
          </div>
        </div>
        <p>{totalComment} bình luận</p>
        <ul className="comments">
          {comment.map(item => (
            <li className="item" key={item.id}>
              <CommentContent item={item} postID={postID} avatar={avatar} hidden={hidden} authorID={authorID}/>
            </li>
          ))}
        </ul>
        {currentPage < totalPages && <div className="text-center">
          <Button type="primary" size="large" loading={false} onClick={() => {
            dispatch(fetchCommentList([postID, currentPage + 1]))
          }}>
            Tải thêm bình luận
          </Button>
        </div>}

      </div>
    );
  }

  export default PostDetailComments;
