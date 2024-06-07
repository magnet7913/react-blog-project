import '../LoginPage/login.css'
import { Link, useNavigate } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, logout } from '../../store/loginAndRegisterSlice'
import mediaService from '../../services/mediaService'
import PhotoUpload from '../../components/AntDesignProps/PhotoUpload'

function ChangeUserDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    mediaService.uploadImage(formData)
  }

  let defaultInfo = useSelector((state) => state.LOGIN.user)

  const [form, setForm] = useState({
    last_name: defaultInfo.lastName,
    first_name: defaultInfo.firstName,
    nickname: defaultInfo.nickname,
    description: defaultInfo.description,
    simple_local_avatar: defaultInfo.avatar
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const [uploadedFile, setUploadedFile] = useState(null)
  const handleFileUpload = (file) => {
    setUploadedFile(file)};
    console.log(uploadedFile)
    
    return (
      <main className="login" style={{ width: '-webkit-fill-available' }}>
        <div className="spacing" />
        <div className="tcl-container">
          <div className="tcl-row">
            <div className="tcl-col-12 tcl-col-sm-6 block-center">
              <h1 className="form-title text-center">Quản lý thông tin người dùng</h1>
              <div className="form-login-register">
                <form autoComplete="off" onSubmit={handleSubmit} >
                  <Input
                    name="last_name"
                    label="Họ"
                    placeholder="Họ của bạn"
                    value={form.last_name}
                    onChange={handleChange}
                  />
                  <Input
                    name="first_name"
                    label="Tên"
                    placeholder="Tên của bạn"
                    value={form.first_name}
                    onChange={handleChange}

                  />
                  <Input
                    name="nickname"
                    label="Biệt danh"
                    placeholder="Biệt hiệu của bạn"
                    value={form.nickname}
                    onChange={handleChange}
                  />
                  <Input
                    name="description"
                    label="Miêu tả cá nhân"
                    placeholder="Miêu tả về bạn"
                    value={form.description}
                    onChange={handleChange}
                  />

                  <PhotoUpload currentUrl={defaultInfo.avatar} onFileUpload={handleFileUpload}/>

                  <div className="d-flex tcl-jc-between tcl-ais-center">
                    <Button htmlType="submit" type="primary" size="large">Lưu thay đổi</Button>
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

  export default ChangeUserDetail