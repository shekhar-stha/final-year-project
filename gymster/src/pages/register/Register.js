import { Link, useNavigate } from "react-router-dom";
import Header1 from "../../components/header/Header1";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export default function Register() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const phoneRegExp = /^(\+977-?)?(\d{10})$/;
    const loginSchema = Yup.object().shape({
        full_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Please enter alphabetic characters only')
            .required('Please insert your full name'),
        username: Yup.string()
            .required('Please enter your username')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters')
            .matches(/^[a-zA-Z0-9_-]+$/, "Invalid Characters"),
        password: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please insert password'),
        confirm_password: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please insert password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phone_number: Yup.string()
            .min(9, 'Incomplete')
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Please insert number'),

        email: Yup.string().email('Invalid email').required('Please enter email'),
    });

    const formik = useFormik({
        initialValues: {
            full_name: '',
            username: '',
            password: '',
            confirm_password: '',
            phone_number: '',
            email: ''
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            console.log(values)
            register()
        }
    });


    const register = async () => {
        let data = formik.values;

        try {
            await axios.post('/user/addUser', data)
            navigate('/login')
            toast.success(`Successfully created user ${data?.full_name}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } catch (error) {
            console.log(error?.response?.data?.errors[0])
            toast.error(error?.response?.data?.errors[0]?.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }


    useEffect(() => {
        if (user.user != null) {
            navigate("/")
        }
    });

    return (
        <>
            <Header1 />
            <div className="container">
                <div className="register-box mx-auto">
                    <div className="row">
                        <div className="col-lg col-12 py-4 px-sm-5 px-4 pe-5">

                            <h2 className="fw-semibold p-0">Create an account</h2>
                            <p className="text-info mb-3">
                                Register and use our services.
                            </p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row">
                                    <div className="col-md col-12">
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="full_name" className="fw-normal mb-2" id="inputGroup-sizing-default">Full Name <span className="text-danger">*</span></label>
                                            <input type="text"
                                                id="full_name"
                                                name="full_name"
                                                onChange={formik.handleChange}
                                                value={formik.values.full_name}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter full name"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.full_name && formik.touched.full_name ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.full_name}</p>
                                            ) : null}
                                        </div>

                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="username" className="fw-normal mb-2" id="inputGroup-sizing-default">Username</label>
                                            <input type="text"
                                                id="username"
                                                name="username"
                                                onChange={formik.handleChange}
                                                value={formik.values.username}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Username"
                                                className="form-control w-100 rounded-2 px-4 text-field" />

                                            {formik.errors.username && formik.touched.username ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.username}</p>
                                            ) : null}
                                        </div>

                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="email" className="fw-normal mb-2" id="inputGroup-sizing-default">Email</label>
                                            <input type="text"
                                                id="email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Email"
                                                className="form-control w-100 rounded-2 px-4 text-field" />

                                            {formik.errors.email && formik.touched.email ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3" >{formik.errors.email}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="col-md col-12">
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="phone_number" className="fw-normal mb-2" id="inputGroup-sizing-default">Phone Number <span className="text-danger">*</span></label>
                                            <input type="text"
                                                id="phone_number"
                                                name="phone_number"
                                                onChange={formik.handleChange}
                                                value={formik.values.phone_number}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter phone number"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.phone_number && formik.touched.phone_number ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.phone_number}</p>
                                            ) : null}
                                        </div>

                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="password" className="fw-normal mb-2" id="inputGroup-sizing-default">Password</label>
                                            <input type="password"
                                                id="password"
                                                name="password"
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Password"
                                                className="form-control w-100 rounded-2 px-4 text-field" />

                                            {formik.errors.password && formik.touched.password ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3" >{formik.errors.password}</p>
                                            ) : null}
                                        </div>

                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="confirm_password" className="fw-normal mb-2" id="inputGroup-sizing-default">Confirm Password</label>
                                            <input type="password"
                                                id="confirm_password"
                                                name="confirm_password"
                                                onChange={formik.handleChange}
                                                value={formik.values.confirm_password}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Password"
                                                className="form-control w-100 rounded-2 px-4 text-field" />

                                            {formik.errors.confirm_password && formik.touched.confirm_password ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3" >{formik.errors.confirm_password}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-lg btn-warning w-100 py-2 fw-normal mt-2 fs-5 rounded text-white mt-4">
                                    Sign up
                                </button>
                            </form>

                            <p className="text-info text-center mt-3">
                                <small>Already have an account</small>
                                <span className="text-secondary ms-1 cursor-pointer"><Link className="text-warning fw-500 fs-15" to="/login">Sign In</Link></span>
                            </p>
                        </div>
                        {/* <div className="col-lg col-0">
                            <img className="img-fluid h-100 w-100 d-lg-block d-none modal-img-radius" src="https://cdn.asparksys.com/medias/1667451547125.png" alt="employee-register" />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}