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

export default function ViewProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentData, setCurrentData] = useState();


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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: currentData?.name,
            genre: currentData?.genre,
            price: currentData?.price,
            discount: currentData?.discount,
            description: currentData?.description,
        },
        onSubmit: async (values) => {
            console.log(values)
        }
    })


    const handleCloseEdit = () => {
        navigate("/admin-products")
    };
    return (
        <>
            <Modal dialogClassName="my-modal" show={true} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>View Product</Modal.Title>
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
                                        value={formik.values.name}
                                        placeholder="Enter your full name"
                                        className="form-control w-100 rounded-2 px-4  "
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        disabled
                                    />


                                </div>
                            </div>

                            <div>
                                <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                    <label className="fw-normal mb-2" htmlFor="genre">Genre</label>
                                    <select
                                        className="form-select"
                                        name="genre"
                                        value={formik.values.genre}
                                        id="genre"
                                        disabled
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
                                        value={formik.values.price}
                                        placeholder="Enter Product Price"
                                        className="form-control w-100 rounded-2 px-4  "
                                        disabled
                                    />


                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="discount" className="fw-normal mb-2" id="inputGroup-sizing-default">Product Discount</label>
                                    <input type="number"
                                        id="discount"
                                        name="discount"
                                        value={formik.values.discount}
                                        placeholder="Enter Discount on product"
                                        className="form-control w-100 rounded-2 px-4  "
                                        disabled />


                                </div>
                            </div>
                        </div>

                        {/* 3rd row */}
                        <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                            <label htmlFor="description" className="fw-normal mb-2">Product Description</label>
                            <textarea type="text"
                                id="description"
                                name="description"
                                value={formik.values.description}
                                placeholder="Enter your Product Description"
                                className="form-control w-100 rounded-2 px-4  "
                                disabled
                            />
                        </div>

                        <div className='images'>
                            <img src={`http://localhost:5000/images/${currentData?.img1}`} alt='images' />
                            <img className='mx-4' src={`http://localhost:5000/images/${currentData?.img2}`} alt='images' />
                            <img src={`http://localhost:5000/images/${currentData?.img3}`} alt='images' />
                        </div>


                        <div className='d-flex justify-content-end'>
                            <button onClick={handleCloseEdit} className="btn btn-primary btn-lg fs-16 mt-4">
                                Close
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    )
}
