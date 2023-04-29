import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMembership } from '../../../../store/slices/membership/membershipSlice';
import { getMembers } from '../../../../store/slices/members/memberSlice';

export default function EditMember() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [currentData, setCurrentData] = useState();

    const memberId = location.pathname.slice(26)

    useEffect(() => {
        dispatch(getMembership());
        fetchMember()
    }, []);

    const fetchMember = async () => {
        try {
            const response = await axios.get(`/member/getMember/${memberId}`);
            setCurrentData(response.data)
        } catch (error) {
            return error.response.data;
        }
    };

    console.log(currentData)
    // const membership = useSelector((state) => state.membership.membership)
    const date = currentData?.gym_member?.dob?.slice(0, 10)
    console.log(date)


    const phoneRegExp = /^(\+977-?)?(\d{10})$/;

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

        username: Yup.string()
            .required('Please enter your username')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters')
            .matches(/^[a-zA-Z0-9_-]+$/, "Invalid Characters"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: currentData?.username,
            full_name: currentData?.full_name,
            gender: currentData?.gym_member?.gender,
            dob: date,
            address: currentData?.gym_member?.address,
            phone_number: currentData?.phone_number,
            email: currentData?.email,
            // status: 'active',
            // membership: currentData?.gym_member?.membershipId,
        },
        validationSchema: schema,
        onSubmit: values => {
            console.log(values)
            register()
        }
    })

    const register = async () => {
        let data = formik.values;
        try {
            await axios.patch(`/member/updateMember/${memberId}`, data)
                dispatch(getMembers({ search: "" }));
            toast.success(`Successfully Updated ${data?.full_name}s Data`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate("/admin-member")
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.errors[0]?.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    const handleCloseEdit = () => {
        navigate("/admin-member")
    };
    return (
        <>
            <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100'>
                        <div className='d-flex justify-content-between align-items-center'>
                            Edit Member
                            <div className='d-flex flex-col'>
                                <p className='fs-16 me-3'>User ID : {currentData?.id}</p>
                                <p className='fs-16'>Member ID : {currentData?.gym_member?.id}</p>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <h3 className="header mt-0">Personal Information</h3>
                        {/* 1st row */}
                        <div className="segment justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="full_name" className="fw-normal mb-2">Full Name</label>
                                    <input type="text"
                                        id="full_name"
                                        name="full_name"
                                        onChange={formik.handleChange}
                                        value={formik.values.full_name}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your full name"
                                        className="form-control w-100 rounded-2 px-4  "
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

                                    {formik.errors.full_name && formik.touched.full_name ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.full_name}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
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
                                        <option selected>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>

                                </div>
                            </div>
                        </div>


                        {/* 2nd row */}
                        <div className="segment row justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="dob" className="fw-normal mb-2" id="inputGroup-sizing-default">Date of birth</label>
                                    <input type="date"
                                        id="dob"
                                        name="dob"
                                        onChange={formik.handleChange}
                                        value={formik.values.dob}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your date of birth"
                                        className="form-control w-100 rounded-2 px-4  "
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

                                    {formik.errors.dob && formik.touched.dob ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.dob}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="username" className="fw-normal mb-2">Username</label>
                                    <input type="text"
                                        id="username"
                                        name="username"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Username"
                                        className="form-control w-100 rounded-2 px-4  "
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

                                    {formik.errors.username && formik.touched.username ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.username}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Another info */}
                        <h3 className="header">Contact Information</h3>
                        {/* 3rd row */}
                        <div className="segment row justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="phone_number" className="fw-normal mb-2">Phone Number</label>
                                    <input type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone_number}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Phone Number"
                                        className="form-control w-100 rounded-2 px-4  " />

                                    {formik.errors.phone_number && formik.touched.phone_number ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.phone_number}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="email" className="fw-normal mb-2">Email</label>
                                    <input type="email"
                                        id="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Email address"
                                        className="form-control w-100 rounded-2 px-4  " />

                                    {formik.errors.email && formik.touched.email ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.email}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* 4th row */}
                        <div className="segment row justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="address" className="fw-normal mb-2">Address</label>
                                    <input type="text"
                                        id="address"
                                        name="address"
                                        onChange={formik.handleChange}
                                        value={formik.values.address}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Address"
                                        className="form-control w-100 rounded-2 px-4  " />

                                    {formik.errors.address && formik.touched.address ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.address}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>


                        {/* <div className="segment row justify-content-between">
                        <div>
                            <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                <label className="fw-normal mb-2" htmlFor="gender">Status</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="gender"
                                >
                                    <option selected>Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="grace">Grace</option>
                                </select>

                            </div>
                        </div>
                    </div> */}
                        {/* membership info */}
                        {/* <h3 className="header">Membership Information</h3>
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
                                    <option selected>Select Membersip</option>
                                    {
                                        membership.map((data) => {
                                            return (
                                                < option key={data.id} value={(data.id)} >
                                                    <span>{data.name}</span> <span className="mx-2">{data.duration} Days</span> <span>(Nrs {data.price})</span>
                                                </option>
                                            )
                                        }
                                        )
                                    }
                                </select>

                            </div>
                        </div>
                    </div> */}
                        <div className='d-flex justify-content-end'>
                            <button onClick={handleCloseEdit} className="btn btn-outline-primary fs-16 mt-4 me-3">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary fs-16 mt-4">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    )
}
