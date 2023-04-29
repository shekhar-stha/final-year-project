import { useFormik } from "formik";
import Header1 from "../../components/header/Header1";
import TabBar from "../../components/tab-bar/tabBar";
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from '../../store/Slices/userSlice'
import  { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyAccount() {
    const user = useSelector((state) => state.user?.user)
    const dispatch = useDispatch()
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

        phone_number: Yup.string()
            .required("fill the details")
            .matches(phoneRegExp, 'Phone number is not valid'),

        email: Yup.string().email('Invalid mail')
            .required("fill the details"),
    });

    const formik = useFormik({
        initialValues: {
            full_name: user?.full_name,
            username: user?.username,
            phone_number: user?.phone_number,
            email: user?.email
        },
        validationSchema: loginSchema,
        onSubmit: () => {
            updateUser()
        }
    });

    const updateUser = async () => {
        let data = formik.values;
        // data = JSON.stringify(data)

        try {
            const res = await axios.put(`/user/updateUser`, data)
            localStorage.setItem('loginDetails', JSON.stringify(res?.data));
            dispatch(loginSuccess(res.data))
            toast.success("Successfully updated!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
        catch (error) {
            console.log(error)
            toast.error(error?.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }
    return (
        <>
             
            <Header1 />
            <section>
                <div className="container pb-5">
                    <div className="row gap-3">
                        <TabBar account="tab-active" />
                        <div className="col-xl col-lg-8 col-11 mx-lg-0 mx-auto tab-data gx-0">
                            <div className="px-md-5 px-4 py-4">
                                <h2 className="mb-4">My Account</h2>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row gap-2 mb-md-3 mb-2">
                                        <div className="input-group col-md mb-md-0 mb-2 col-12 d-flex flex-column text-info">
                                            <input type="text"
                                                id="full_name"
                                                name="full_name"
                                                onChange={formik.handleChange}
                                                value={formik.values.full_name}
                                                onBlur={formik.handleBlur}
                                                placeholder="Full name"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.full_name && formik.touched.full_name ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.full_name}</p>
                                            ) : null}
                                        </div>
                                        <div className="input-group col-md mb-md-0 mb-2 col-12 d-flex flex-column w-100 text-info">
                                            <input type="text"
                                                id="username"
                                                name="username"
                                                onChange={formik.handleChange}
                                                value={formik.values.username}
                                                onBlur={formik.handleBlur}
                                                placeholder="Username"
                                                className="form-control w-100 rounded-2 px-4 text-field" />

                                            {formik.errors.username && formik.touched.username ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.username}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row gap-2 mb-md-3 mb-2">
                                        <div className="input-group col-md mb-md-0 mb-2 col-12 d-flex flex-column w-100 text-info">
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
                                        <div className="input-group col-md mb-md-0 mb-2 col-12 d-flex flex-column w-100 text-info">
                                            <input type="text"
                                                id="email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                onBlur={formik.handleBlur}
                                                placeholder="Email"
                                                className="form-control w-100 rounded-2 px-4 text-field" />

                                            {formik.errors.email && formik.touched.email ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3" >{formik.errors.email}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="mt-5 text-end">
                                        <button type="submit" className="btn btn-lg btn-warning text-white fw-500 fs-6">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}