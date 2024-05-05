import '../LoginPage/login.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { loginFetch } from '../../store/loginAndRegisterSlice'
import { useState } from 'react'

function RegisterCompletePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  let user = useSelector(state=>state.LOGIN.user)
  console.log(user)
  useEffect(()=>{  
    setUsername(user.username)
    setPassword(user.password)
    let userCredentials = {
      username,password
    }
    console.log(userCredentials)

  },[user])

  // dispatch(loginFetch(userCredentials)).then((result)=>{
  //   if(result.payload){
  //     setUsername("")
  //     setPassword("")
  //     navigate('/')
  //   }
  // })

  // useEffect(()=>{
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000);
  // },[])

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng ký thành công!</h1>

          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default RegisterCompletePage