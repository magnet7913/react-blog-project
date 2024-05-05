import '../LoginPage/login.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutPage() {
  const navigate = useNavigate()

  useEffect(()=>{
    setTimeout(() => {
      navigate('/')
    }, 2000);
  },[])

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng xuất thành công!</h1>

          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default LogoutPage