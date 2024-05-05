import './LoginPage/login.css'
import { Link, useNavigate } from "react-router-dom"
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { registerFetch } from '../store/loginAndRegisterSlice'

function RegisterPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [display_name, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')

  const {error} = useSelector((state)=>state.LOGIN)


  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }


  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let userCredentials = {display_name, email, username, password}
    dispatch(registerFetch(userCredentials)).then((result)=>{if (result.type === "user/register/fulfilled") {navigate('/registerComplete')}}, 
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
                  onChange={handleDisplayNameChange}
                />
                <Input
                  label="Email"
                  placeholder="Nhập Email"
                  autoComplete="off"
                  onChange={handleEmailChange}
                />
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  onChange={handleUsernameChange}
                />
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
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
              {password && confirmPassword && password !== confirmPassword && (
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