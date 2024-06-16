import '../LoginPage/login.css'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { registerFetch } from '../../store/loginAndRegisterSlice'


const mustFill = "Cần nhập mục này"
const schema = yup
    .object({
        username: yup.string().required(mustFill),
        email: yup.string().required(mustFill).email('Email không hợp lệ'),
        password: yup.string().required(mustFill).min(4, "Tối thiểu 4 ký tự").max(12, 'Tối đa 12 ký tự'),
    })
    .required()
function TestForm() {
    const dispatch = useDispatch()
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

    // console.log(watch('password'));

    const onSubmit = (data) => {
        dispatch(registerFetch(data)).then((result) => {
            setError(result.payload.key, { type: 'server', message: result.payload.message })
        })
    }
    // display_name: "",
    // email: "",
    // username: "",
    // password: "",

    return (
        <div className="form-login-register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="DisplayName">Display Name</label>
                    <input type="text" className="DisplayName" defaultValue="Tên hiển thị" {...register("display_name")} />
                    {errors.display_name && <span>This field is required</span>}
                </div>
                <div>
                    <label htmlFor="UserName">User Name</label>
                    <input type="text" className="UserName" defaultValue="Tên đăng nhập" {...register("username")} />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="Email">Email</label>
                    <input type="text" className="Email" defaultValue="Email đăng ký" {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="Password" {...register("password")} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>

                </div>
                <div>
                    <button>Submit</button>
                    <button>Cancel</button>
                </div>
            </form>


        </div>
    )

}

export default TestForm