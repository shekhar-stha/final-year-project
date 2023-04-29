import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSchedule } from '../../../../store/slices/schedule/scheduleSlice';

export default function EditSchedule() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [currentData, setCurrentData] = useState();

    const scheduleId = location.pathname.slice(24,25)


    // fetching diet
    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`/schedule/getSchedule/${scheduleId}`);
            setCurrentData(response.data)
        } catch (error) {
            return error.response.data;
        }
    };
    useEffect(() => {
        fetchSchedule()
    }, [])

    console.log(currentData)

    const schema = Yup.object().shape({
        sunday: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        monday: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        tuesday: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        wednesday: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        thursday: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        friday: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required("fill the details"),
    })

    let data = {
        "days": [

        ]
    }
    console.log(currentData)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            sunday: currentData?.days[0],
            monday: currentData?.days[1],
            tuesday: currentData?.days[2],
            wednesday: currentData?.days[3],
            thursday: currentData?.days[4],
            friday: currentData?.days[5],
        },
        validationSchema: schema,
        onSubmit: values => {
            data = {
                days: [
                    values.sunday,
                    values.monday,
                    values.tuesday,
                    values.wednesday,
                    values.thursday,
                    values.friday,
                ],
            };
            console.log(data)
            publish()
        }
    })

    const publish = async () => {
        try {
            const res = await axios.put(`/schedule/updateSchedule/${scheduleId}`, data)
            console.log(res);
            dispatch(getSchedule());
            toast.success("Submitted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate("/schedule")
        } catch (error) {
            const errorMessage = error
            console.log(errorMessage)
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    // Edit modal

    // const handleEdit = () => {
    //     dispatch(updateDiet(dietToUpdate));
    //     toast.success(`Successfully updated ${dietToUpdate?.diet_type}`, {
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //     })
    // };

    const handleCloseEdit = () => {
        navigate("/schedule")
    };
    return (
        //  
        <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="segment justify-content-between">
                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="sunday" className="fw-normal mb-2">Sunday</label>
                                <input type="text"
                                    id="sunday"
                                    name="sunday"
                                    onChange={formik.handleChange}
                                    value={formik.values.sunday}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter the day Schedule"
                                    className="form-control w-100 rounded-2 px-4  "
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.sunday && formik.touched.sunday ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.sunday}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="monday" className="fw-normal mb-2">Monday</label>
                                <input type="text"
                                    id="monday"
                                    name="monday"
                                    onChange={formik.handleChange}
                                    value={formik.values.monday}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter the day Schedule"
                                    className="form-control w-100 rounded-2 px-4  "
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.monday && formik.touched.monday ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.monday}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>


                    {/* 2nd row */}
                    <div className="segment row justify-content-between">
                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="tuesday" className="fw-normal mb-2" id="inputGroup-sizing-default">Tuesday</label>
                                <input type="text"
                                    id="tuesday"
                                    name="tuesday"
                                    onChange={formik.handleChange}
                                    value={formik.values.tuesday}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter the day Schedule"
                                    className="form-control w-100 rounded-2 px-4  "
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.tuesday && formik.touched.tuesday ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.tuesday}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="wednesday" className="fw-normal mb-2" id="inputGroup-sizing-default">Wednesday</label>
                                <input type="text"
                                    id="wednesday"
                                    name="wednesday"
                                    onChange={formik.handleChange}
                                    value={formik.values.wednesday}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter the day Schedule"
                                    className="form-control w-100 rounded-2 px-4  "
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.wednesday && formik.touched.wednesday ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.wednesday}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className="segment row justify-content-between">
                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="thursday" className="fw-normal mb-2">Thursday</label>
                                <input type="text"
                                    id="thursday"
                                    name="thursday"
                                    onChange={formik.handleChange}
                                    value={formik.values.thursday}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter the day Schedule"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.thursday && formik.touched.thursday ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.thursday}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="friday" className="fw-normal mb-2">Friday</label>
                                <input type="text"
                                    id="friday"
                                    name="friday"
                                    onChange={formik.handleChange}
                                    value={formik.values.friday}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter the day Schedule"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.friday && formik.touched.friday ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.friday}</p>
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
        </Modal>
    )
}
