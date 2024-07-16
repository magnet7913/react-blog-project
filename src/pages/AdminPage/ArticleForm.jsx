import '../LoginPage/login.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import PhotoUpload from '../../components/AntDesignProps/PhotoUpload'
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

function ArticleForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let token = localStorage.getItem('token')
  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [token]);

  let categoryList = Object.values(useSelector((state) => state.CATEGORY.categoryList));
  let currentUser = useSelector((state) => state.LOGIN.user.userID)

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
  const [mode, setMode] = useState('new')

  let local = JSON.parse(localStorage.getItem('currentArticle'))
  useEffect(() => {
    if (local) {
      defaultForm = {
        ...defaultForm,
        ...local
      }
      setMode("edit")
      console.log(defaultForm)
    }
    console.log(local)
  },local)

  

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

  const onSubmit = (data) => {
    console.log(data);

  }

  function formReset() {
    setForm(defaultForm)
  }

  return (
    <main className="login" style={{ width: '-webkit-fill-available' }}>
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">

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
                  {mode === 'edit' && <Button htmlType="submit" type="primary" size="large">Chỉnh sửa bài viết</Button>}
                  {mode === 'new' && <Button htmlType="submit" type="primary" size="large">Thêm bài viết</Button>}
                  <Button htmlType="submit" type="primary" size="large">Reset Form</Button>

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

export default ArticleForm