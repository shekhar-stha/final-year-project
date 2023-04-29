import React from 'react'
import ContentTopSection from '../../components/content-top/ContentTopSection';
import Tabbar from '../../components/tabbar/Tabbar';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import  { toast } from 'react-toastify';

export default function AddDiet() {

    const schema = Yup.object().shape({
        type: Yup.string()
            .required("Choose One"),

        meal1: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        meal2: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        meal3: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        meal4: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        meal5: Yup.string()
            .required("fill the details")
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),

        description: Yup.string()
            .min(5, 'Too Short!')
            .max(100, 'Too Long!')
            .required("fill the details"),
    })

    const data = {
        diet_type: '',
        meal: [],
        description: '',
    };


    const formik = useFormik({
        initialValues: {
            type: '',
            meal1: '',
            meal2: '',
            meal3: '',
            meal4: '',
            meal5: '',
            description: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            const meals = [
                values.meal1,
                values.meal2,
                values.meal3,
                values.meal4,
                values.meal5,
            ];
            const validMeals = meals.filter((m) => m);

            // Update the data object with the new values
            data.diet_type = values.type;
            data.meal = validMeals;
            data.description = values.description;

            console.log(data)
            publish()
        }
    })

    const publish = async () => {
        try {
            await axios.post('/diet/postDiet', data)
            toast.success("Submitted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            formik.resetForm()
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.errors[0].message
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            console.log(errorMessage)
        }
    }
    return (
        <>
             
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar diet="active" />
                    </div>

                    <div className="col-10 h-100 overflow pb-4">
                        <ContentTopSection />
                        <div className="content-side h-auto add-members-page">
                            <h3 className="mb-3 text-secondary">Add Diet</h3>

                            <form onSubmit={formik.handleSubmit}>
                                <h3 className="header mt-0">Diet Information</h3>
                                {/* 1st row */}

                                <div className="segment justify-content-between">
                                    <div>
                                        <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                            <label className="fw-normal mb-2" htmlFor="type">Diet Type</label>
                                            <select
                                                className="form-select"
                                                name="type"
                                                value={formik.values.type}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id="type"
                                            >
                                                <option selected>Select type</option>
                                                <option value="Bulking">Bulking</option>
                                                <option value="Cutting">Cutting</option>
                                                <option value="Maintenance diet">Maintenance Diet</option>
                                            </select>
                                            {formik.errors.type && formik.touched.type ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.type}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="meal1" className="fw-normal mb-2">Meal 1</label>
                                            <input type="text"
                                                id="meal1"
                                                name="meal1"
                                                onChange={formik.handleChange}
                                                value={formik.values.meal1}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Meal 1"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.meal1 && formik.touched.meal1 ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.meal1}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>


                                {/* 2nd row */}
                                <div className="segment row justify-content-between">
                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="meal2" className="fw-normal mb-2" id="inputGroup-sizing-default">Meal 2</label>
                                            <input type="text"
                                                id="meal2"
                                                name="meal2"
                                                onChange={formik.handleChange}
                                                value={formik.values.meal2}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Meal 2"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.meal2 && formik.touched.meal2 ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.meal2}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="meal3" className="fw-normal mb-2" id="inputGroup-sizing-default">Meal 3 </label>
                                            <input type="text"
                                                id="meal3"
                                                name="meal3"
                                                onChange={formik.handleChange}
                                                value={formik.values.meal3}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Meal 3"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.meal3 && formik.touched.meal3 ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.meal3}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                {/* 3rd row */}
                                <div className="segment row justify-content-between">
                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="meal4" className="fw-normal mb-2">Meal 4</label>
                                            <input type="text"
                                                id="meal4"
                                                name="meal4"
                                                onChange={formik.handleChange}
                                                value={formik.values.meal4}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Meal 4"
                                                className="form-control w-100 rounded-2 px-4  " />

                                            {formik.errors.meal4 && formik.touched.meal4 ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.meal4}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="meal5" className="fw-normal mb-2">Meal 5</label>
                                            <input type="text"
                                                id="meal5"
                                                name="meal5"
                                                onChange={formik.handleChange}
                                                value={formik.values.meal5}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Meal 4"
                                                className="form-control w-100 rounded-2 px-4  " />

                                            {formik.errors.meal5 && formik.touched.meal5 ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.meal5}</p>
                                            ) : null}
                                        </div>
                                    </div>


                                </div>

                                <div className="segment row justify-content-between">
                                    <div className='w-100'>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="description" className="fw-normal mb-2" id="inputGroup-sizing-default">Diet Description</label>
                                            <textarea
                                                rows="5"
                                                id="description"
                                                name="description"
                                                onChange={formik.handleChange}
                                                value={formik.values.description}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Diet Description"
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
