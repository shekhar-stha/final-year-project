import React, { useState } from 'react'
import ContentTopSection from '../../components/content-top/ContentTopSection';
import Tabbar from '../../components/tabbar/Tabbar';
import * as Yup from "yup"
import { useFormik } from "formik";

import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function AddNotice() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const schema = Yup.object().shape({
        topic: Yup.string()
            .required("fill the details"),

        description: Yup.string()
            .required("fill the details"),
    })

    const formik = useFormik({
        initialValues: {
            topic: '',
            description: '',
        },
        validationSchema: schema,
        onSubmit: () => {
            publish()
        }
    })

    const publish = async () => {
        const data = formik.values;
        setLoading(true)
        try {
            const response = await axios.post('/notice/addNotice', data)
            if (response.status === 200) {
                setLoading(false)
                navigate("/admin-notice")
                toast.success("Submitted Successfully", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            }


        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }
    return (
        <>
            {
                loading && <div className="backdrop">
                    <div className="text-center loading">
                        <div class="spinner-grow" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            }
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar notice="active" />
                    </div>

                    <div className="col-10 h-100 overflow pb-4">
                        <ContentTopSection />
                        <div className="content-side h-auto add-members-page">
                            <h3 className="mb-3 text-secondary">Add Notice</h3>

                            <form onSubmit={formik.handleSubmit}>
                                <h3 className="header mt-0">Notice Information</h3>
                                {/* 1st row */}
                                <div className="segment justify-content-between">
                                    <div className='w-100'>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="topic" className="fw-normal mb-2">Notice Title</label>
                                            <input type="text"
                                                id="topic"
                                                name="topic"
                                                onChange={formik.handleChange}
                                                value={formik.values.topic}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter your notice title"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.topic && formik.touched.topic ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.topic}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>


                                {/* 2nd row */}
                                <div className="segment row justify-content-between">
                                    <div className='w-100'>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="description" className="fw-normal mb-2" id="inputGroup-sizing-default">Notice Description</label>
                                            <textarea
                                                rows="5"
                                                id="description"
                                                name="description"
                                                onChange={formik.handleChange}
                                                value={formik.values.description}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter  Notice description"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.description && formik.touched.description ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.description}</p>
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
