import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getMembership } from '../../../../store/slices/membership/membershipSlice';

export default function EditMembership() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState();

    const { id } = useParams()
    console.log(id)


    // fetching diet
    const fetchMembership = async () => {
        try {
            const response = await axios.get(`/membership/getMembership/${id}`);
            setCurrentData(response.data)
        } catch (error) {
            return error.response.data;
        }
    };
    useEffect(() => {
        fetchMembership()
    }, [])

    console.log(currentData)

    const schema = Yup.object().shape({
        name: Yup.string()
            .required("fill the details"),

        price: Yup.number()
            .required("Choose Price"),

        admission_fee: Yup.number()
            .required("Enter admission fee"),

        duration: Yup.number()
            .required("Choose Duration"),

        description1: Yup.string()
            .required("Write Description1"),

        description2: Yup.string()
            .required("Write Description1"),

        description3: Yup.string()
            .required("Write Description1"),

        description4: Yup.string()
            .required("Write Description1"),

    })

    const data = {
        name: '',
        price: '',
        admission_fee: '',
        duration: '',
        description: [],
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: currentData?.name,
            price: currentData?.price,
            admission_fee: currentData?.admission_fee,
            duration: currentData?.duration,
            description1: currentData?.description[0],
            description2: currentData?.description[1],
            description3: currentData?.description[2],
            description4: currentData?.description[3],
        },
        validationSchema: schema,

        onSubmit: values => {
            const descriptions = [
                values.description1,
                values.description2,
                values.description3,
                values.description4,
            ];
            const validDescriptions = descriptions.filter((d) => d);

            // Update the data object with the new values
            data.name = values.name;
            data.price = values.price;
            data.duration = values.duration;
            data.description = validDescriptions;
            data.admission_fee = values.admission_fee;
            console.log(data)
            publish()
        }
    })

    const publish = async () => {
        try {
            await axios.put(`/membership/updateMembership/${id}`, data)
            dispatch(getMembership());
            toast.success("Submitted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate("/admin-memberships")
        } catch (error) {
            toast.error(error.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            console.log(error)
        }
    }

    const handleCloseEdit = () => {
        navigate("/admin-memberships")
    };
    return (
        //  
        <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Membership</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    {/* <h3 className="header mt-0">Membership Information</h3> */}
                    {/* 1st row */}
                    <div className="segment justify-content-between">
                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="name" className="fw-normal mb-2">Membership Name</label>
                                <input type="text"
                                    id="name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter Membership Name"
                                    className="form-control w-100 rounded-2 px-4  "
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.name && formik.touched.name ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.name}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="price" className="fw-normal mb-2" id="inputGroup-sizing-default">Membership Price</label>
                                <input type="number"
                                    id="price"
                                    name="price"
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter price of membership"
                                    className="form-control w-100 rounded-2 px-4  "
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.price && formik.touched.price ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.price}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="segment row justify-content-between">
                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="admission_fee" className="fw-normal mb-2" id="inputGroup-sizing-default">Admission Fee</label>
                                <input type="number"
                                    id="admission_fee"
                                    name="admission_fee"
                                    onChange={formik.handleChange}
                                    value={formik.values.admission_fee}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter admission fee"
                                    className="form-control w-100 rounded-2 px-4  "
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" />

                                {formik.errors.admission_fee && formik.touched.admission_fee ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.admission_fee}</p>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="duration" className="fw-normal mb-2">Membership Duration (Months)</label>
                                <input type="number"
                                    id="duration"
                                    name="duration"
                                    onChange={formik.handleChange}
                                    value={formik.values.duration}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your Membership Duration in months"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.duration && formik.touched.duration ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.duration}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="description1" className="fw-normal mb-2">Membership Description 1</label>
                                <input type="text"
                                    id="description1"
                                    name="description1"
                                    onChange={formik.handleChange}
                                    value={formik.values.description1}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter membership description"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.description1 && formik.touched.description1 ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.description1}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="description2" className="fw-normal mb-2">Membership Description 2</label>
                                <input type="text"
                                    id="description2"
                                    name="description2"
                                    onChange={formik.handleChange}
                                    value={formik.values.description2}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your membership description"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.description2 && formik.touched.description2 ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.description2}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="description3" className="fw-normal mb-2">Membership Description 3</label>
                                <input type="text"
                                    id="description3"
                                    name="description3"
                                    onChange={formik.handleChange}
                                    value={formik.values.description3}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your membership description"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.description3 && formik.touched.description3 ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.description3}</p>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                <label htmlFor="description4" className="fw-normal mb-2">Membership Description 4</label>
                                <input type="text"
                                    id="description4"
                                    name="description4"
                                    onChange={formik.handleChange}
                                    value={formik.values.description4}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your membership description"
                                    className="form-control w-100 rounded-2 px-4  " />

                                {formik.errors.description4 && formik.touched.description4 ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.description4}</p>
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
