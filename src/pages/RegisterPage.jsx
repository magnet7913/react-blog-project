import './LoginPage/login.css'
import { Link, useNavigate } from "react-router-dom"
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerFetch } from '../store/loginAndRegisterSlice'

function RegisterPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmPassword, setConfirmPassword] = useState('')

  const [formData, setFormData] = useState({
    display_name: "",
    email: "",
    username: "",
    password: "",
  })


  const { error } = useSelector((state) => state.LOGIN)

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }
    )
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerFetch(formData)).then((result) => { if (result.type === "user/register/fulfilled") { navigate('/registerComplete') } },
    )
  }
  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng ký</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Input
                  label="Tên hiển thị"
                  placeholder="Nhập tên hiển thị"
                  autoComplete="off"
                  name="display_name"
                  onChange={handleFormChange}
                />
                <Input
                  label="Email"
                  placeholder="Nhập Email"
                  autoComplete="off"
                  name="email"
                  onChange={handleFormChange}
                />
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  name="username"
                  onChange={handleFormChange}
                />
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  name="password"
                  onChange={handleFormChange}
                />
                <Input
                  type="password"
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu ..."
                  autoComplete="new-password"
                  onChange={handleConfirmPassword}
                />
                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large" >Đăng ký</Button>
                  <Link to="/login">Bạn đã có tài khoản?</Link>
                </div>
              </form>
              {formData.password && confirmPassword && formData.password !== confirmPassword && (
                <div className='alert' role='alert'>Mật khẩu không trùng khớp!</div>
              )}
              {error && (<div className='alert' role='alert'>{error}</div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default RegisterPage