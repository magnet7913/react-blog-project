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

function ArticleManagement() {
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

  const quillRef = useRef()
  let defaultForm = {
    title: "",
    content: "",
    author: currentUser,
    excerpt: "",
    featured_media: "",
    categories: [],
    lang: "vi",
    status: "publish"
  }

  const [form, setForm] = useState(defaultForm)
  const [content, setContent] = useState('');

  const [mode, setMode] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   console.log(form)
  //   if (mode === "") {
  //     dispatch(fetchAddNewPost(
  //       {
  //         token: token,
  //         content: form
  //       }
  //     )).then((result) => {
  //       if (result.payload) {
  //         dispatch(fetchPostList())
  //       }
  //     })
  //   } else {

  //   }
  //   formReset()
  // }

  const onSubmit = (data) => {
    console.log(data);
    
  }

  function handleContentChange(event, editor) {
    setContent(editor.getData());
    
  }
  function handleCheckboxChange(e) {
    if (e.target.checked) {
      setForm(prevState => ({
        ...prevState,
        categories: [...prevState.categories, e.target.value]
      }));
    } else {
      setForm(prevState => ({
        ...prevState,
        categories: prevState.categories.filter(categories => categories !== e.target.value)
      }));
    }
  }

  function handleEdit(slug) {
    dispatch(fetchArticleBySlug(slug)).then((result) => {
      if (result.payload) {
        let i = result.payload.data
        console.log('1. handleEdit data', i);
        setMode(i.id)
        setForm({
          title: i.title,
          content: i.content,
          author: i.authorId,
          excerpt: i.desc,
          featured_media: "",
          categories: i.category,
          lang: "vi",
          status: "publish"
        })
        setContent(i.content);
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

  function formReset() {
    setForm(defaultForm)
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

          <div className="tcl-col-12 tcl-col-sm-12 block-center" style={{ marginTop: "4rem" }}> {/* Form chỉnh sửa */}
            <h1 className="form-title text-center">Thêm / chỉnh sửa bài viết</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                <Input
                  name="title"
                  label="Tiêu đề bài viết"
                  placeholder="Tiêu đề bài viết"
                  // value={form.title}
                  {...register("title")}
                />
                {errors.title && <span>{errors.title.message}</span>}

                <Input
                  name="excerpt"
                  label="Miêu tả bài viết"
                  placeholder="Miêu tả bài viết"
                  // value={form.excerpt}
                  {...register("excerpt")}
                />
                {errors.excerpt && <span>{errors.excerpt.message}</span>}

                <PhotoUpload />

                {/* <div className="ArticleManagement">
                  <ReactQuill theme="snow" onChange={handleContentChange} style={{ minHeight: '10rem' }} value={form.content} />
                </div> */}

                <div className="App">
                  <h2>Using CKEditor&nbsp;5 build in React</h2>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    // onChange={(event, editor) => handleContentChange(event, editor)}
                    {...register("content")}
                    />
                    {errors.content && <span>{errors.content.message}</span>}
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <label>Danh mục</label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    maxHeight: "10rem",
                    overflow: "scroll",
                    marginTop: "1rem"
                  }} >
                    {categoryList.map((category) => (
                      <div key={category.ID}>
                        <input type="checkbox"
                          id={`category-${category.ID}`}
                          // name={category.name}
                          value={category.ID}
                          style={{ marginRight: "0.5rem" }}
                          {...register("categories")}
                          />
                        <label htmlFor={`category-${category.ID}`}>{category.name}</label>
                      </div>
                    ))
                    }
                  </div>
                  {errors.categories && <span>{errors.categories.message}</span>}
                </div>

                <div className="d-flex tcl-jc-between tcl-ais-center" style={{ marginTop: "2rem" }}>
                  <Button htmlType="submit" type="primary" size="large">Thêm/chỉnh sửa bài viết</Button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default ArticleManagement