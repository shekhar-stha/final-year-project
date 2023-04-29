import React, { useState } from 'react'
import ContentTopSection from '../../components/content-top/ContentTopSection';
import Tabbar from '../../components/tabbar/Tabbar';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import  { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddProducts() {
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();

    const navigate = useNavigate()

    const [imgError, setImgError] = useState()
    console.log(img1, img2, img3)
    const schema = Yup.object().shape({
        name: Yup.string()
            .required("fill the details"),

        genre: Yup.string()
            .required("Select one genre"),

        price: Yup.number()
            .required("Choose price"),

        discount: Yup.number()
            .required("Choose the discount for product"),


        description: Yup.string()
            .required("fill the details"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            genre: '',
            price: '',
            discount: '',
            description: '',
            // img: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (!img1 || !img2 || !img3) {
                setImgError('Please select all images before submitting the form');
                return;
            } else {
                setImgError('');
                console.log("submitted", values)
                upload()
            }
        }
    })
    const upload = async () => {
        let data = { ...formik.values, img1, img2, img3 }
        console.log(data)
        try {
            await axios.post(`/product/addProduct`, data, { headers: { "Content-Type": "multipart/form-data" } })
            toast.success("Submitted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate("/admin-products")
            // formik.resetForm()
        } catch (error) {
            console.log(error)
            toast.error(error.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }
    const handleFileChange = (event) => {
        formik.handleChange(event)
        setImg1(event.target.files[0]);
        console.log(event.target.files[0])
    };

    const handleFileChange2 = (event) => {
        formik.handleChange(event)
        setImg2(event.target.files[0]);
    };

    const handleFileChange3 = (event) => {
        formik.handleChange(event)
        setImg3(event.target.files[0]);
    };

    return (
        <>
             
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar products="active" />
                    </div>

                    <div className="col-10 h-100 overflow pb-4">
                        <ContentTopSection />
                        <div className="content-side h-auto add-members-page">
                            <h3 className="mb-3 text-secondary">Add Products</h3>

                            <form onSubmit={formik.handleSubmit}>
                                <h3 className="header mt-0">Product Information</h3>
                                {/* 1st row */}
                                <div className="segment justify-content-between">
                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="name" className="fw-normal mb-2">Product Name</label>
                                            <input type="text"
                                                id="name"
                                                name="name"
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter your full name"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.name && formik.touched.name ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.name}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                            <label className="fw-normal mb-2" htmlFor="genre">Genre</label>
                                            <select
                                                className="form-select"
                                                name="genre"
                                                value={formik.values.genre}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                id="genre"
                                            >
                                                <option selected>Select genre</option>
                                                <option value="supplements">Supplements</option>
                                                <option value="clothes">Clothes</option>
                                                <option value="accessories">Accessories</option>
                                                <option value="gadgets">Gadgets</option>
                                                <option value="others">Others</option>
                                            </select>
                                            {formik.errors.genre && formik.touched.genre ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.genre}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>


                                {/* 2nd row */}
                                <div className="segment row justify-content-between">
                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="price" className="fw-normal mb-2" id="inputGroup-sizing-default">Product Price</label>
                                            <input type="number"
                                                id="price"
                                                name="price"
                                                onChange={formik.handleChange}
                                                value={formik.values.price}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Product Price"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.price && formik.touched.price ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.price}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="discount" className="fw-normal mb-2" id="inputGroup-sizing-default">Product Discount</label>
                                            <input type="number"
                                                id="discount"
                                                name="discount"
                                                onChange={formik.handleChange}
                                                value={formik.values.discount}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter Discount on product"
                                                className="form-control w-100 rounded-2 px-4  "
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />

                                            {formik.errors.discount && formik.touched.discount ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.discount}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                {/* 3rd row */}
                                <div className="segment row justify-content-between">

                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="img1" className="fw-normal mb-2">Product Images</label>
                                            <input type="file"
                                                id="img1"
                                                name="img1"
                                                onChange={handleFileChange}
                                                // value={formik.values.img1}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter your Product Images"
                                                className="form-control form-control-lg fs-18 text-info  w-100 rounded-2 px-4" />

                                            {formik.errors?.img1 && formik.touched?.img1 ? (`
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors?.img1}</p>`
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="img2" className="fw-normal mb-2">Product Images</label>
                                            <input type="file"
                                                id="img2"
                                                name="img2"
                                                onChange={handleFileChange2}
                                                // value={formik.values.img2}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter your Product Images"
                                                className="form-control form-control-lg fs-18 text-info  w-100 rounded-2 px-4" />

                                            {formik.errors?.img2 && formik.touched?.img2 ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors?.img2}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="img3" className="fw-normal mb-2">Product Images</label>
                                            <input type="file"
                                                id="img3"
                                                name="img3"
                                                onChange={handleFileChange3}
                                                // value={formik.values.img3}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter your Product Images"
                                                className="form-control form-control-lg fs-18 text-info  w-100 rounded-2 px-4" />

                                            {formik.errors?.img3 && formik.touched?.img3 ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors?.img3}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                            <label htmlFor="description" className="fw-normal mb-2">Product Description</label>
                                            <textarea type="text"
                                                id="description"
                                                name="description"
                                                onChange={formik.handleChange}
                                                value={formik.values.description}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter your Product Description"
                                                className="form-control w-100 rounded-2 px-4  " />

                                            {formik.errors.description && formik.touched.description ? (
                                                <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.description}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                {imgError ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3">{imgError}</p>
                                ) : null}

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
