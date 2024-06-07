import '../LoginPage/login.css'
import { Link, useNavigate } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, logout } from '../../store/loginAndRegisterSlice'

function ChangePassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let token = localStorage.getItem('token')
  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [token]);

  const [password, setOldPassword] = useState("")
  const [new_password, setNewPassword] = useState("")
  const [confirm_new_password, setConfirmPassword] = useState('')



  const handleOldPassChange = (e) => {
    setOldPassword(e.target.value)
  }

  const handleNewPassChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }


  const handleChangePassword = (e) => {
    e.preventDefault()
    let userCredentials = {
      password, new_password, confirm_new_password
    }

    dispatch(changePassword([token,userCredentials])).then((result) => {
      if (result.payload) {
        dispatch(logout())
        navigate('/login')
      }
    })
  }

  const { error } = useSelector((state) => state.LOGIN)

  return (
    <main className="login" style={{ width: '-webkit-fill-available' }}>
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đổi mật khẩu</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleChangePassword}>
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