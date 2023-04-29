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

export default function ViewMember() {
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
        },
        onSubmit: values => {
            console.log(values)
            register()
        }
    })

    const register = async () => {
        let data = formik.values;
        try {
            await axios.patch(`/member/updateMember/${memberId}`, data)
            dispatch(getMembers())
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
                            View Member
                            <div className='d-flex flex-col'>
                                <p className='fs-16 me-3'>User ID : {currentData?.id}</p>
                                <p className='fs-16'>Member ID : {currentData?.gym_member?.id}</p>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <h3 className="header mt-0">Personal Information</h3>
                        {/* 1st row */}
                        <div className="segment justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="full_name" className="fw-normal mb-2">Full Name</label>
                                    <input disabled type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formik.values.full_name}
                                        placeholder="Enter your full name"
                                        className="form-control w-100 rounded-2 px-4  "
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />
                                </div>
                            </div>

                            <div>
                                <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                    <label className="fw-normal mb-2" htmlFor="gender">Gender</label>
                                    <select
                                        disabled
                                        className="form-select"
                                        name="gender"
                                        onChange={formik.handleChange}
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
                                    <input disabled type="date"
                                        id="dob"
                                        name="dob"
                                        value={formik.values.dob}
                                        placeholder="Enter your date of birth"
                                        className="form-control w-100 rounded-2 px-4  "
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />
                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="username" className="fw-normal mb-2">Username</label>
                                    <input disabled type="text"
                                        id="username"
                                        name="username"
                                        value={formik.values.username}
                                        placeholder="Enter your Username"
                                        className="form-control w-100 rounded-2 px-4  "
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

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
                                    <input disabled type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={formik.values.phone_number}
                                        placeholder="Enter your Phone Number"
                                        className="form-control w-100 rounded-2 px-4  " />


                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="email" className="fw-normal mb-2">Email</label>
                                    <input disabled type="email"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        placeholder="Enter your Email address"
                                        className="form-control w-100 rounded-2 px-4  " />
                                </div>
                            </div>
                        </div>

                        {/* 4th row */}
                        <div className="segment row justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="address" className="fw-normal mb-2">Address</label>
                                    <input disabled type="text"
                                        id="address"
                                        name="address"
                                        value={formik.values.address}
                                        placeholder="Enter your Address"
                                        className="form-control w-100 rounded-2 px-4  " />
                                </div>
                            </div>
                        </div>


                        {/* Another info */}
                        <h3 className="header">More Information</h3>
                        {/* 5th row */}
                        <div className="segment row justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="phone_number" className="fw-normal mb-2">Membership</label>
                                    <input disabled type="text"
                                        id="membership"
                                        name="membership"
                                        value={currentData?.gym_member?.membership?.name}
                                        placeholder="Enter your Phone Number"
                                        className="form-control w-100 rounded-2 px-4  " />

                                </div>
                            </div>
                            {currentData?.gym_member?.renew_date &&
                                <div>
                                    <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                        <label htmlFor="renewDate" className="fw-normal mb-2">Renewed date</label>
                                        <input disabled type="text"
                                            id="enddate"
                                            name="enddate"
                                            value={currentData?.gym_member?.renew_date?.slice(0, 10)}
                                            className="form-control w-100 rounded-2 px-4  " />
                                    </div>
                                </div>
                            }
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="enddate" className="fw-normal mb-2">End date</label>
                                    <input disabled type="text"
                                        id="enddate"
                                        name="enddate"
                                        value={currentData?.gym_member?.end_date}
                                        className="form-control w-100 rounded-2 px-4  " />
                                </div>
                            </div>

                        </div>

                        <div className='d-flex justify-content-end'>
                            <button onClick={handleCloseEdit} className="btn btn-primary fs-16 mt-4 me-3">
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    )
}
