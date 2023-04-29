import React from 'react'
import ContentTopSection from '../../components/content-top/ContentTopSection';
import Tabbar from '../../components/tabbar/Tabbar';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';

import  { toast } from 'react-toastify';

export default function AddSchedule() {

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
    const formik = useFormik({
        initialValues: {
            sunday: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
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
            await axios.post('/schedule/postSchedule', data)
            toast.success("Submitted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            formik.resetForm()
        } catch (error) {
            const errorMessage = error.response.data.errors[0].message
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }
    return (
        <>
             
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar schedule="active" />
                    </div>

                    <div className="col-10 h-100 overflow pb-4">
                        <ContentTopSection />
                        <div className="content-side h-auto add-members-page">
                            <h3 className="mb-3 text-secondary">Add Schedule</h3>

                            <form onSubmit={formik.handleSubmit}>
                                <h3 className="header mt-0">Schedule Information</h3>
                                {/* 1st row */}

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

                                <button type="submit" className="btn btn-secondary px-5 fs-19 mt-4">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
