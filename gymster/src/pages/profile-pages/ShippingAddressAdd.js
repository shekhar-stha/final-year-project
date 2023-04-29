import React from "react";
import Header1 from "../../components/header/Header1";
import TabBar from "../../components/tab-bar/tabBar";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../../store/Slices/userSlice";
import  { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
export default function ShippingAddressAdd() {
    const user = useSelector((state) => state.user?.user)
    const navigate = useNavigate()
    const location = useLocation()
    
    const phoneRegExp = /^(\+977-?)?(\d{10})$/;

    const from = location.state?.from?.pathname 
    console.log(from)
    const loginSchema = Yup.object().shape({
        full_name: Yup.string()
            .required('Please insert your full name'),
        phone_number: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Please insert number'),
        province: Yup.string()
            .required("Please choose province"),
        city: Yup.string()
            .required("Please choose city"),
        landmark: Yup.string()
            .required("Please choose landmark"),
        address: Yup.string()
            .required("Please choose address")
    });

    const formik = useFormik({
        initialValues: {
            full_name: user?.full_name,
            phone_number: user?.phone_number,
            province: "",
            city: "",
            address: "",
            landmark: ""
        },
        validationSchema: loginSchema,
        onSubmit: (values, errors) => {
            console.log("Formik Values", values)
            addShipping()
        }
    });

    const addShipping = async () => {
        let data = formik.values;
        try {
            await axios.post(`shippingDetails/addShippingDetails`, data)
            toast.success("Successfully updated!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            from 
            ? navigate(from) 
            : navigate("/shipping-address")
        }
        catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.errors[0].message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }
    return (
        <>
             
            <Header1 />
            <section className="container pb-5">
                <div className="row gap-2 mb-md-3 mb-2">
                    <TabBar shipping="tab-active" />
                    <div className="col-xl col-lg-8 col-11 mx-lg-0 mx-auto tab-data gx-0">
                        <div className="px-sm-5 px-4 py-4">
                            <h2 className="mb-4">Add Shipping Address</h2>
                            <div className="shipping-details">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row gap-2 mb-md-3 mb-2">
                                        <div className="col-md mb-md-0 mb-2 col-12">
                                            <input type="text"
                                                id="full_name"
                                                name="full_name"
                                                onChange={formik.handleChange}
                                                value={formik.values.full_name}
                                                onBlur={formik.handleBlur}
                                                placeholder="Full name"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.full_name && formik.touched.full_name ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.full_name}</p>
                                            ) : null}
                                        </div>
                                        <div className="col-md mb-md-0 mb-2 col-12">
                                            <input type="text"
                                                id="phone_number"
                                                name="phone_number"
                                                onChange={formik.handleChange}
                                                value={formik.values.phone_number}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter phone number"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.phone_number && formik.touched.phone_number ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.phone_number}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row gap-2 mb-md-3 mb-2">
                                        <div className="col-md mb-md-0 mb-2 col-12">
                                            <select
                                                className="form-select"
                                                aria-label="Select province"
                                                value={formik.values.province}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id="province"
                                                name="province"
                                                required>
                                                <option selected>Select Province</option>
                                                <option value="province 1">Province 1</option>
                                                <option value="province 2">Province 2</option>
                                                <option value="province 3">Province 3</option>
                                                <option value="province 4">Province 4</option>
                                                <option value="province 5">Province 5</option>
                                                <option value="province 6">Province 6</option>
                                                <option value="province 7">Province 7</option>
                                            </select>
                                            {formik.errors.province && formik.touched.province ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.province}</p>
                                            ) : null}
                                        </div>
                                        <div className="col-md mb-md-0 mb-2 col-12">
                                            <input type="text"
                                                id="city"
                                                name="city"
                                                onChange={formik.handleChange}
                                                value={formik.values.city}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter City Name"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.city && formik.touched.city ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.city}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row gap-2 mb-md-3 mb-2">
                                        <div className="col-md mb-md-0 mb-2 col-12">
                                            <input type="text"
                                                id="address"
                                                name="address"
                                                onChange={formik.handleChange}
                                                value={formik.values.address}
                                                onBlur={formik.handleBlur}
                                                placeholder="Address (Area , Street)"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.address && formik.touched.address ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.address}</p>
                                            ) : null}
                                        </div>
                                        <div className="col-md mb-md-0 mb-2 col-12">
                                            <input type="text"
                                                id="landmark"
                                                name="landmark"
                                                onChange={formik.handleChange}
                                                value={formik.values.landmark}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Landmark (something nearby)"
                                                className="form-control w-100 rounded-2 px-4 text-field"
                                            />
                                            {formik.errors.landmark && formik.touched.landmark ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.landmark}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                                        <div className="form-check mb-3">
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-lg btn-warning">Save Changes</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}