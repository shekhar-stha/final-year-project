import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';
import { getTrainers } from '../../../../store/slices/trainer/trainerSlice';

export default function EditTrainer() {
    const dispatch = useDispatch()
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


    const phoneRegExp = /^(\+977-?)?(\d{10})$/;

    const schema = Yup.object().shape({
        full_name: Yup.string()
            .required("fill the details"),

        gender: Yup.string()
            .required("Select one gender"),

        dob: Yup.date()
            .required("Choose your birthdate"),

        address: Yup.string()
            .required("fill the details"),

        phone_number: Yup.string()
            .required("fill the details")
            .matches(phoneRegExp, 'Phone number is not valid'),


        email: Yup.string().email('Invalid mail')
            .required("fill the details"),

        routine: Yup.string()
            .required("fill the details"),
    })

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
            await axios.put(`/trainer/updateTrainer/${trainerId}`, data)
            dispatch(getTrainers())
            toast.success(`Successfully Updated ${data?.full_name}s Data`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate("/admin-trainer")
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.errors[0]?.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    const handleCloseEdit = () => {
        navigate("/admin-trainer")
    };
    return (
        <>
            <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100'>
                        <div className='d-flex justify-content-between align-items-center'>
                            Edit Trainer
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

                        {/* Another info */}
                        <h3 className="header">Routine Information</h3>
                        {/* 5th row */}
                        <div className="segment row justify-content-between">
                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="routine" className="fw-normal mb-2">Routine</label>
                                    <input type="text"
                                        id="routine"
                                        name="routine"
                                        onChange={formik.handleChange}
                                        value={formik.values.routine}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Routine"
                                        className="form-control w-100 rounded-2 px-4  " />

                                    {formik.errors.routine && formik.touched.routine ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.routine}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
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
