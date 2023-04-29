import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup"
import Header1 from "../../components/header/Header1";
import { getMembership } from "../../store/Slices/membershipSlice";
import { selectMembership } from "../../store/Slices/buyProductSlice";

export default function MemberJoinForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const storedLoginDetails = localStorage.getItem('loginDetails');
        const loginDetails = storedLoginDetails ? JSON.parse(storedLoginDetails) : null;
        if(loginDetails === null){
            navigate("/login")
            console.log("hello")
            toast.info("You need to login first")
            return;
        }
    },[])
    
    useEffect(() => {
        dispatch(getMembership());
    }, []);

    const membership = useSelector((state) => state.membership.membership)

    const currentDate = new Date().toISOString().slice(0, 10);
    const phoneRegExp = /^(\+977-?)?(\d{10})$/;

    const { id } = useParams()
    console.log(id)

    const schema = Yup.object().shape({
        full_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Please enter alphabetic characters only')
            .required('Please insert your full name'),

        gender: Yup.string()
            .required("Select one gender"),

        dob: Yup.date()
            .required('Date of birth is required')
            .test('age', 'You must be at least 14 years old to register', function (value) {
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const month = today.getMonth() - birthDate.getMonth();

                if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age >= 14;
            }),

        address: Yup.string()
            .required("fill the details"),

        phone_number: Yup.string()
            .required("fill the details")
            .matches(phoneRegExp, 'Phone number is not valid'),

        email: Yup.string().email('Invalid mail')
            .required("fill the details"),

        membership: Yup.number()
            .required("Select one membership"),

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
    })

    const formik = useFormik({
        initialValues: {
            full_name: '',
            gender: '',
            dob: '',
            address: '',
            phone_number: '',
            email: '',
            membership: id,
            status: 'inactive',
            username: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            const membershipId = parseInt(values.membership);
            formik.setValues({
                ...values,
                membership: membershipId
            });
            console.log(values)
            register()
        }
    })

    const register = async () => {
        let data = formik.values;
        console.log(data)
        try {
            const response = await axios.post(`/member/add-member/${formik.values.membership}`, data)
            console.log(response?.data?.userId)
            navigate(`/checkout-membership/${response?.data?.userId}`)

        } catch (error) {
            console.log(error)
            toast.error(error.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }
    console.log(formik.values)

    return (
        <>

            <Header1 />
            <section className="contact-section pb-5">
                <div className="container pt-3">
                    <div className="contact-section__img">
                        <img src="https://cdn.asparksys.com/medias/1675272524886.jpg" alt="About-section-img" className="img-fluid" />
                        <div className="contact-section__overlay2" />
                        <h3 className="contact-section__title">Join Now</h3>
                    </div>
                </div>
            </section>
            <div className="member-join-form-page container">
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="header mt-0">Personal Information</h3>
                    {/* 1st row */}
                    <div className="segment row justify-content-between">
                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="full_name" className="fw-normal mb-2">Full Name</label>
                                <input type="text"
                                    id="full_name"
                                    name="full_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.full_name}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your full name"
                                    className="form-control w-100 rounded-2 px-4 text-field"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.full_name && formik.touched.full_name ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.full_name}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                <label className="fw-normal mb-2" htmlFor="gender">Gender</label>
                                <select
                                    className="form-select"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="gender"
                                >
                                    <option >Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                                {formik.errors.gender && formik.touched.gender ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.gender}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>


                    {/* 2nd row */}
                    <div className="segment row justify-content-between">
                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="dob" className="fw-normal mb-2" id="inputGroup-sizing-default">Date of birth</label>
                                <input type="date"
                                    id="dob"
                                    name="dob"
                                    onChange={formik.handleChange}
                                    value={formik.values.dob}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your date of birth"
                                    className="form-control w-100 rounded-2 px-4 text-field"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.dob && formik.touched.dob ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.dob}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Another info */}
                    <h3 className="header">Contact Information</h3>
                    {/* 3rd row */}
                    <div className="segment row justify-content-between">
                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="phone_number" className="fw-normal mb-2">Phone Number</label>
                                <input type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone_number}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your Phone Number"
                                    className="form-control w-100 rounded-2 px-4 text-field" />

                                {formik.errors.phone_number && formik.touched.phone_number ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.phone_number}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="email" className="fw-normal mb-2">Email</label>
                                <input type="email"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your Email address"
                                    className="form-control w-100 rounded-2 px-4 text-field" />

                                {formik.errors.email && formik.touched.email ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.email}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* 4th row */}
                    <div className="segment row justify-content-between">
                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="address" className="fw-normal mb-2">Address</label>
                                <input type="text"
                                    id="address"
                                    name="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your Address"
                                    className="form-control w-100 rounded-2 px-4 text-field" />

                                {formik.errors.address && formik.touched.address ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.address}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* membership info */}
                    <h3 className="header">Membership Information</h3>
                    {/* 5th row */}
                    <div className="segment row justify-content-between">
                        <div className="col-12">
                            <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                <label className="fw-normal mb-2" htmlFor="membership">Membersip</label>
                                <select
                                    className="form-select"
                                    name="membership"
                                    value={formik.values.membership}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="membership"
                                >
                                    <option>Select Membersip</option>
                                    {
                                        membership.map((data) => {
                                            console.log(data?.id)
                                            return (
                                                < option key={data.id} value={(data.id)}>
                                                    <span>{data.name}</span> <span className="mx-2">{data.duration} Months</span> <span>(Nrs {data.total_price})</span>
                                                </option>
                                            )
                                        }
                                        )
                                    }
                                </select>
                                {formik.errors.membership && formik.touched.membership ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.membership}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {/* Another info */}
                    <h3 className="header">Login Information</h3>
                    {/* 5th row */}
                    <div className="segment row justify-content-between">
                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="username" className="fw-normal mb-2">Username</label>
                                <input type="text"
                                    id="username"
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your desired username"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.username && formik.touched.username ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.username}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="password" className="fw-normal mb-2">Password</label>
                                <input type="password"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your password"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.password && formik.touched.password ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.password}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="confirm_password" className="fw-normal mb-2">Confirm Password</label>
                                <input type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirm_password}
                                    onBlur={formik.handleBlur}
                                    placeholder="Confirm your password"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.confirm_password && formik.touched.confirm_password ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.confirm_password}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-secondary px-5 fs-19 mt-4">
                        Submit
                    </button>
                </form>
            </div >
        </>
    )
}