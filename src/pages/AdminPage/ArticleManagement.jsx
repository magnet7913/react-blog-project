import '../LoginPage/login.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import mediaService from '../../services/mediaService'
import PhotoUpload from '../../components/AntDesignProps/PhotoUpload'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchAddNewPost, fetchPostList, fetchArticleBySlug, fetchDeletePost } from '../../store/articleSlice'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const mustFill = "Cần nhập mục này"
const schema = yup
  .object({
    title: yup.string().required(mustFill),
    content: yup.string().required(mustFill),
    excerpt: yup.string().required(mustFill),
    // categories: yup.oneOf([true], 'Phải lựa chọn ít nhất một danh mục'),

  })
  .required()

function ArticleManagement(
  {setActiveComponent}
) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let token = localStorage.getItem('token')
  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [token]);

  let postList = Object.values(useSelector((state) => state.ARTICLE.postList))
  let categoryList = Object.values(useSelector((state) => state.CATEGORY.categoryList));
  let currentUser = useSelector((state) => state.LOGIN.user.userID)

  function handleEdit(slug) {
    dispatch(fetchArticleBySlug(slug)).then((result) => {
      if (result.payload) {
        let i = result.payload.data;
        localStorage.setItem('currentArticle', JSON.stringify(i));
        setActiveComponent(3)
      }
    })
  }

  function handleDelete(e) {
    e.preventDefault()
    dispatch(fetchDeletePost({
      token: token,
      id: e.target.id
    })).then((result) => {
      if (result.payload) {
        dispatch(fetchPostList())
      }
    })
  }

  return (
    <main className="login" style={{ width: '-webkit-fill-available' }}>
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-12 block-center"> {/* Danh sách bài viết */}
            <h1 className="form-title text-center">Quản lý bài viết</h1>
            <div style={{
              maxHeight: "20rem",
              overflow: "scroll",
              marginTop: "2rem"
            }}>
              <table style={{ width: '100%' }}>
                <thead style={{
                  position: "sticky",
                  top: "0",
                  background: "white"
                }}>
                  <tr>
                    <th><input type="checkbox" name="" id="" /></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Postdate</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody >
                  {postList.map(item => (
                    <tr key={item.id}>
                      <td><input type="checkbox" name="" id="" /></td>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.author.nickname}</td>
                      <td>{item.postDate}</td>
                      <td>
                        <Button type="primary" size="small" onClick={() => handleEdit(item.slug)}>Chỉnh sửa</Button>
                        <Button type="primary" size="small" id={item.id} onClick={handleDelete}>Xóa</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default ArticleManagement