import './login.css'
import { Link, useNavigate } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFetch } from '../../store/loginAndRegisterSlice'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleFormChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value}
    )
  }


  const handleLogin = (e) => {
    e.preventDefault()


    dispatch(loginFetch(formData)).then((result)=>{
      if(result.payload){
        navigate('/')
      }
    })
  }

  const {error} = useSelector((state)=>state.LOGIN)

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng nhập</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleLogin}>
                <Input 
                  label="Tên đăng nhập" 
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  name='username'
                  onChange = {handleFormChange}
                />
                <Input 
                  type="password" 
                  label="Mật khẩu" 
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  name='password'
                  onChange = {handleFormChange}
                />

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large">Đăng nhập</Button>
                  <Link to="/register">Đăng ký</Link>
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

export default LoginPage