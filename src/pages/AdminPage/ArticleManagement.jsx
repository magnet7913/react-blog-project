import '../LoginPage/login.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import mediaService from '../../services/mediaService'
import PhotoUpload from '../../components/AntDesignProps/PhotoUpload'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

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

  const quillRef = useRef()

  useEffect(() => {
    if (quillRef.current) {
      new Quill(quillRef.current, {
        theme: 'snow'
      });
    }
  }, [])

  return (
    <main className="login" style={{ width: '-webkit-fill-available' }}>
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-12 block-center">
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
                        <Button type="primary" size="small" id={item.id}>Chỉnh sửa</Button>
                        <Button type="primary" size="small" id={item.id}>Xóa</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tcl-col-12 tcl-col-sm-12 block-center" style={{ marginTop: "4rem" }}>
            <h1 className="form-title text-center">Thêm / chỉnh sửa bài viết</h1>
            <div className="form-login-register">
              <form autoComplete="off">

                <Input
                  name="title"
                  label="Tiêu đề bài viết"
                  placeholder="Tiêu đề bài viết"
                />

                <Input
                  name="description"
                  label="Miêu tả bài viết"
                  placeholder="Miêu tả bài viết"
                />

                <PhotoUpload />

                <div className="ArticleManagement">
                  <div ref={quillRef} style={{ minHeight: '10rem' }} />
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
                  }}>
                    {categoryList.map((category) => (
                      <div key={category.ID}>
                        <input type="checkbox" id={`category-${category.ID}`} name={category.name} value={category.name} style={{ marginRight: "0.5rem" }} />
                        <label htmlFor={`category-${category.ID}`}>{category.name}</label>
                      </div>
                    ))
                    }
                  </div>
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