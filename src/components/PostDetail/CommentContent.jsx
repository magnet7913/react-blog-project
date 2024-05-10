import './comments.css';
import { timeAgo } from '../../helpers';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChildComment } from '../../store/commentSlice';

function CommentContent(
    { item, postID, avatar }
) {
    const [showForm, setShowForm] = useState(true);
    const dispatch = useDispatch()
    let currentPage = item.currentPage;
    let totalPage = item.childTotalPages
    let isShowButton = true
    if (currentPage === totalPage) {
        isShowButton = false
    }
    return (
        <>
            <div className="comments__section">
                <div className="comments__section--avatar">
                    <a href="/">
                        <img src={item.authorAvatar[96]} alt="" />
                    </a>
                </div>

                <div className="comments__section--content">
                    <a href="/" className="comments__section--user">
                        {item.author}
                    </a>
                    <p className="comments__section--time">{timeAgo(item.date)}</p>
                    {(item.replyCount > 0) && (item.parent === 0) &&
                        <div className="comments__section--time" > có {item.replyCount} trả lời</div>}
                    <p className="comments__section--text" dangerouslySetInnerHTML={{ __html: item.content }} />
                    {isShowButton && (item.replyCount > 0) && (item.parent === 0) && <button className="btn btn-default"
                        style={{ marginTop: 0.5 + "rem" }}
                        onClick={() => dispatch(fetchChildComment([postID, currentPage + 1, item.id]))}>
                        Tải trả lời
                    </button>}
                </div>

                {/* Answer button */}
                <div>
                    <div className="text-right">
                        <button className="btn btn-default" onClick={() => setShowForm(!showForm)}>Trả lời</button>
                    </div>
                </div>
            </div>

            {/* Comment reply */}
            <div>
                <ul className="comments">
                    {item.childComment.map(child => (<li className="item" key={child.id}>
                        <div className="comments__section">
                            <div className="comments__section--avatar">
                                <a href="/">
                                    <img src={child.authorAvatar[96]} alt="" />
                                </a>
                            </div>
                            <div className="comments__section--content">
                                <a href="/" className="comments__section--user">
                                    {child.author}
                                </a>
                                <p className="comments__section--time">{timeAgo(child.date)}</p>
                                <p className="comments__section--text" dangerouslySetInnerHTML={{ __html: child.content }} />
                            </div>
                        </div>
                    </li>))}
                </ul>
            </div>

            {/* Reply form */}
            <div className="comments__form" hidden={showForm}>
                <div className="comments__form--control">
                    <div className="comments__section--avatar">
                        <a href="/">
                            <img src={avatar} alt="" />
                        </a>
                    </div>
                    <textarea />
                </div>

                <div className="text-right">
                    <button className="btn btn-default">Submit</button>
                </div>
            </div>
        </>

    )
}

export default CommentContent;


