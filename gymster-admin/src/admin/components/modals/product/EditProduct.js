import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMembership } from '../../../../store/slices/membership/membershipSlice';
import { getMembers } from '../../../../store/slices/members/memberSlice';
import { getProducts } from '../../../../store/slices/product/productSlice';

export default function EditProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [currentData, setCurrentData] = useState();

    const [img1, setImg1] = useState([]);
    const [img2, setImg2] = useState([]);
    const [img3, setImg3] = useState([]);

    const productId = location.pathname.slice(29)
    console.log(productId)
    useEffect(() => {
        fetchProduct()
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/product/getProduct/${productId}`);
            setCurrentData(response.data)
        } catch (error) {
            return error.response.data;
        }
    };

    console.log("currentData", currentData)

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
            name: currentData?.name,
            genre: currentData?.genre,
            price: currentData?.price,
            discount: currentData?.discount,
            description: currentData?.description,
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log(values)
            editProduct()
        }
    })
    const editProduct = async () => {
        let data = { ...formik.values, img1, img2, img3 }
        console.log(data)
        try {
            await axios.patch(`/product/updateProduct/${productId}`, data, { headers: { "Content-Type": "multipart/form-data" } })
            dispatch(getProducts())
            toast.success(`Successfully Updated ${data?.name}s Data`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate("/admin-products")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    console.log("img1", img1)

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


    const handleCloseEdit = () => {
        navigate("/admin-products")
    };
    return (
        <>
            <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={formik.handleSubmit}>
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
                                    <label htmlFor="img1" className="fw-normal mb-2">Product Images 1</label>
                                    <input type="file"
                                        id="img1"
                                        name="img1"
                                        onChange={handleFileChange}
                                        // value={currentData?.img1}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Product Images"
                                        className="form-control form-control-lg fs-18 text-info  w-100 rounded-2 px-4" />

                                    {formik.errors?.img1 && formik.touched?.img1 ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors?.img1}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="img2" className="fw-normal mb-2">Product Images 2</label>
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
                                    <label htmlFor="img3" className="fw-normal mb-2">Product Images 3</label>
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

            
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="description" className="fw-normal mb-2">Product Description</label>
                                    <textarea id="description"
                                        name="description"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Product Description"
                                        className="form-control w-100 rounded-2 px-4  "></textarea>

                                    {formik.errors.description && formik.touched.description ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.description}</p>
                                    ) : null}
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
