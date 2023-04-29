import { Link, useNavigate } from "react-router-dom";
import Header1 from "../../components/header/Header1";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginError } from '../../store/Slices/userSlice'
import axios from "axios";
import  { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    console.log(user)
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required('Please insert username'),
        password: Yup.string()
            .required('Please insert password'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            dispatch(loginStart())
            try {
                const res = await axios.post('/user/loginUser', values)

                localStorage.setItem('loginDetails', JSON.stringify(res?.data));

                const storedLoginDetails = localStorage.getItem('loginDetails');
                const loginDetails = storedLoginDetails ? JSON.parse(storedLoginDetails) : null;

                dispatch(loginSuccess(loginDetails))
                navigate("/")
                toast.success(`Successfully loggen in as ${values?.username}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                formik.resetForm()
            } catch (error) {
                dispatch(loginError(error?.response?.data))
                formik.resetForm()
                toast.error(error?.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            }
        }
    });


    useEffect(() => {
      if(user.user != null) {
        navigate("/")
      }
    });


    return (
        <>
            
            <Header1 />
            <div className="container">
                <div className="login-box mx-auto m-5">
                    <div className="row">
                        <div className="col-lg col-12 py-4 px-sm-5 px-5 pb-five">
                            <h2 className="fw-semibold p-0 mt-4"><span className="text-warning">Hi,</span> Welcome Back!</h2>
                            <p className="text-info mb-5 fs-14">
                                Sign in and continue your journey
                            </p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="username" className="fw-normal mb-2" id="inputGroup-sizing-default">Username</label>
                                    <input type="text"
                                        id="username"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Username"
                                        className="form-control w-100 rounded-pill px-4 text-field"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

                                    {formik.errors.username && formik.touched.username ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.username}</p>
                                    ) : null}
                                </div>


                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="password" className="fw-normal mb-2" id="inputGroup-sizing-default">Password</label>
                                    <input type="password"
                                        id="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Password"
                                        className="form-control w-100 rounded-pill px-4 text-field"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

                                    {formik.errors.password && formik.touched.password ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3" >{formik.errors.password}</p>
                                    ) : null}
                                </div>

                              

                                {user.error ? (
                                    <p className="fs-14 fw-500 text-primary pt-2" >{user.error}</p>
                                ) : null}

                                <button className="btn btn-lg btn-warning w-100 py-2 fw-normal fs-5 text-white mt-4" type="submit">
                                    Sign in
                                </button>

                            </form>
                            <p className="text-info text-center mt-3">
                                <small>Not registered yet?</small>
                                <span className="text-secondary ms-1"><Link to="/register" className="fw-500 text-warning"> Create an Account</ Link></span>
                            </p>
                        </div>
                        <div className="col-lg col-0">
                            <img className="bg-img img-fluid h-100 w-100 d-lg-block d-none modal-img-radius" src="https://cdn.asparksys.com/medias/1681316873841.png" alt="" />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}