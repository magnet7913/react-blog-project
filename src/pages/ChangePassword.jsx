import './LoginPage/login.css'
import { Link, useNavigate } from "react-router-dom"
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFetch } from '../store/loginAndRegisterSlice'

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [new_password, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOldPassChange = (e) => {
    setOldPassword(e.target.value)
  }

  const handleNewPassChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    let userCredentials = {
      username, password
    }
    dispatch(loginFetch(userCredentials)).then((result) => {
      if (result.payload) {
        navigate('/login')
      }
    })
  }

  const { error } = useSelector((state) => state.LOGIN)

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đổi mật khẩu</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleLogin}>
                <Input
                  type="password"
                  label="Mật khẩu cũ"
                  placeholder="Nhập mật khẩu cũ của bạn ..."
                  autoComplete="off"
                  onChange={handleOldPassChange}
                />
                <Input
                  type="password"
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới của bạn ..."
                  autoComplete="new-password"
                  onChange={handleNewPassChange}
                />
                <Input
                  type="password"
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu ..."
                  autoComplete="new-password"
                  onChange={handleConfirmPassword}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large">Đổi mật khẩu</Button>
                </div>
              </form>
            </div>

            {error && (<div className='alert' role='alert'>{error}</div>)}

          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default ChangePassword