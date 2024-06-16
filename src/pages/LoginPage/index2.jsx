import './login.css'
import { Link, useNavigate } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFetch } from '../../store/loginAndRegisterSlice'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const mustFill = "Cần nhập mục này"
const schema = yup
  .object({
    username: yup.string().required(mustFill),
    password: yup.string().required(mustFill).min(4, "Tối thiểu 4 ký tự").max(12, 'Tối đa 12 ký tự'),
  })
  .required()


function LoginPage2() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

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
  }
  )
  
  const onSubmit = (data) => {
    console.log(data);
    
  }
  const { error } = useSelector((state) => state.LOGIN)

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng nhập 2</h1>
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  name='username'
                  {...register("username")}
                />
                {errors.username && <span>{errors.username.message}</span>}
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  name='password'
                  {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large">Đăng nhập</Button>
                  <Link to="/register">Đăng ký</Link>
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

export default LoginPage2