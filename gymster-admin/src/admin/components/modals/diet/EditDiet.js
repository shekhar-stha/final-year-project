import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getDiet } from '../../../../store/slices/diet/dietSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditDiet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentData, setCurrentData] = useState();

    const dietId = location.pathname.slice(11)


    // fetching diet
    const fetchDiet = async () => {
        try {
            const response = await axios.get(`/diet/getDiet/${dietId}`);
            setCurrentData(response.data)
        } catch (error) {
            return error.response.data;
        }
    };
    useEffect(() => {
        fetchDiet()
    }, [])

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
        enableReinitialize: true,
        initialValues: {
            type: currentData?.diet_type,
            meal1: currentData?.meal[0],
            meal2: currentData?.meal[1],
            meal3: currentData?.meal[2],
            meal4: currentData?.meal[3],
            meal5: currentData?.meal[4],
            description: currentData?.description,
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
            const res = await axios.patch(`/diet/updateDiet/${dietId}`, data)
            console.log(res);
            dispatch(getDiet());
            toast.success(`Successfully updated ${res.data?.diet_type}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate("/diet")
        } catch (error) {
            console.log(error)
            // const errorMessage = error.response.data.errors[0].message
            // console.log(errorMessage)
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
        navigate("/diet")
    };

    return (
        //  
        <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Diet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
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
                                    <option defaultValue={formik.values.type}>Select type</option>
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
