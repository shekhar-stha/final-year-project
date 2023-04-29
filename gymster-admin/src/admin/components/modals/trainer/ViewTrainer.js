import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';
import { getTrainers } from '../../../../store/slices/trainer/trainerSlice';

export default function ViewTrainer() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentData, setCurrentData] = useState();

    const trainerId = location.pathname.slice(28)
    console.log(trainerId)
    useEffect(() => {
        fetchTrainer()
    }, []);

    // fetching diet
    const fetchTrainer = async () => {
        try {
            const response = await axios.get(`/trainer/getTrainer/${trainerId}`);
            setCurrentData(response.data)
        } catch (error) {
            return error;
        }
    };

    console.log(currentData)
    const date = currentData?.gym_trainer?.dob?.slice(0, 10)
    console.log(date)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: currentData?.username,
            full_name: currentData?.full_name,
            gender: currentData?.gym_trainer?.gender,
            dob: date,
            address: currentData?.gym_trainer?.address,
            phone_number: currentData?.phone_number,
            email: currentData?.email,
            routine: currentData?.gym_trainer?.routine,
        }
    })

    const handleCloseEdit = () => {
        navigate("/admin-trainer")
    };
    return (
        <>
            <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100'>
                        <div className='d-flex justify-content-between align-items-center'>
                            View Trainer
                            <div className='d-flex flex-col'>
                                <p className='fs-16 me-3'>User ID : {currentData?.id}</p>
                                <p className='fs-16'>Trainer ID : {currentData?.gym_trainer?.id}</p>
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
                                        className="form-select"
                                        name="gender"
                                        value={formik.values.gender}
                                        disabled

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
                        <h3 className="header">Routine Information</h3>
                        {/* 5th row */}
                        <div className="segment row justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="routine" className="fw-normal mb-2">Routine</label>
                                    <input disabled type="text"
                                        id="routine"
                                        name="routine"

                                        value={formik.values.routine}

                                        placeholder="Enter your Routine"
                                        className="form-control w-100 rounded-2 px-4  " />


                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button onClick={handleCloseEdit} className="btn btn-primary fs-16 mt-4 me-3">
                                Close
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    )
}
