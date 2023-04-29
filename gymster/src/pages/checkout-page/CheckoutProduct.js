import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header1 from '../../components/header/Header1'
import { getShippingDetails } from '../../store/Slices/shippingDetailsSlice'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getProducts } from '../../store/Slices/productSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import KhaltiCheckout from "khalti-checkout-web";
import myKey from '../../components/Khalti/khaltiKey';

export default function CheckoutProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const shippingDetails = useSelector(state => state?.shippingDetail?.shippingDetails)
    const products = useSelector(state => state?.product?.products)

    const [checkoutInfo, setCheckoutInfo] = useState()

    useEffect(() => {

        const storedLoginDetails = localStorage.getItem('loginDetails');
        const loginDetails = storedLoginDetails ? JSON.parse(storedLoginDetails) : null;
        if (loginDetails === null) {
            navigate("/login")
            console.log("hello")
            toast.error("You need to login first")
            return;
        }

        dispatch(getShippingDetails())
        dispatch(getProducts())
        checkoutData()
    }, [])

    const checkoutData = async () => {
        const data = await axios.get("/checkout/checkoutUser")
        console.log("checkout data", data?.data)
        setCheckoutInfo(data?.data)
    }

    // Product and quantity data from checkout table
    const product = products.find((data) => data?.id === checkoutInfo?.productId)
    const quantity = checkoutInfo?.quantity

    const discountedPrice = (product?.price - product?.discount)
    const totalPrice = discountedPrice * quantity
    const afterDeliveryTotal = totalPrice + 100

    const currentDate = new Date().toISOString().slice(0, 10);

    const validation = Yup.object().shape({
        shipping_detail: Yup.object()
            .required("Choose One Shipping Detail"),
        payment_type: Yup.string()
            .required("Choose One Payment type")
    })
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            shipping_detail: '',
            payment_type: '',
            quantity: quantity,
            status: "Pending",
            amount: afterDeliveryTotal,
            ordered_date: currentDate,
            product: product

        },
        validationSchema: validation,
        onSubmit: values => {
            console.log(values)
            checkout(formik.values)
        }
    })

    const checkout = async (data) => {
        try {
            const response = await axios.post("/order/createOrder", data)
            console.log(response?.data)
            console.log("submitted")
            navigate("/")
            toast.success("Order Successfully placed.")
        } catch (error) {
            console.log(error)
        }
    }

    // Khalti Content
    let config = {
        "publicKey": myKey?.publicTestKey,
        "productIdentity": product?.id,
        "productName": product?.name,
        "productUrl": "http://localhost:3000/checkout-product",
        "eventHandler": {
            onSuccess(payload) {
                console.log(payload);
                checkout({ ...formik.values, token: payload.token })
                navigate("/")
            },
            onError(error) {
                console.log(error);
                toast.error(error)
            },
            onClose() {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI"],
    };

    let khaltiPanel = new KhaltiCheckout(config);

    const payNow = () => {
        khaltiPanel.show({ amount: (afterDeliveryTotal * 100) })
    }

    return (
        <>
            <Header1 />
            <div className='container'>
                <div className='checkout gap-3'>
                    <div className='data-insertion bg-white rounded-3 px-4 py-4'>
                        {/* 1st Segment */}
                        <form onSubmit={formik.handleSubmit}>
                            <div className='shipping-choose'>
                                <h3 className='fs-24 mb-4 text-secondary'>Shipping Details</h3>
                                {
                                    shippingDetails?.length > 0 ?
                                        shippingDetails.map((data) => {
                                            return (
                                                <>
                                                    <div key={data?.id} className="form-check d-flex align-items-center mb-3">
                                                        <input
                                                            className="form-check-input me-3"
                                                            id={data.id}
                                                            type="radio"
                                                            name="shipping_detail"
                                                            value={data.id}
                                                            checked={formik.values.shipping_detail === data}
                                                            onChange={() => formik.setFieldValue("shipping_detail", data)}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        <label className="form-check-label" htmlFor={data.id}>
                                                            <div key={data.id} className="address-box border p-3 rounded-4">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <h5 className='text-secondary'>{data.full_name}</h5>
                                                                </div>
                                                                <p className="fs-13 mb-1 number text-truncate">{data.phone_number}</p>
                                                                <p style={{ width: "100%" }} className="fs-13 description text-truncate">
                                                                    {data.province}, {data.address}, {data.city}, {data.landmark}
                                                                </p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </>

                                            )
                                        }) : <Link className='btn btn-primary' to="/add-shipping-address" state={{ from: location }}  >Add Shipping Details </Link>
                                }
                                {formik.errors.shipping_detail && formik.touched.shipping_detail ? (
                                    <p className="fs-14 fw-500 text-primary pt-1 ps-3 bottom-0">{formik.errors.shipping_detail}</p>
                                ) : null}
                            </div>
                            <hr></hr>
                            {/* Order Summary */}
                            <div className="orders-container">
                                <h3 className='fs-24 my-4 text-secondary'>Order Summary</h3>
                                {/* Order */}
                                <div className="order border mb-3 p-3 rounded-3 d-flex justify-content-between align-items-md-center">
                                    <div className="d-flex align-items-center ordered-product-info">
                                        {/* Img Div */}
                                        <div className="img-div">
                                            <img className="img-fluid w-100 h-100" src={`http://localhost:5000/images/${product?.img1}`} alt="" />
                                        </div>
                                        {/* Product Info */}
                                        <div className="h-100 w-md-0 w-75 ps-3">
                                            <h5 className="pb-md-2">{product?.name}</h5>
                                            {/* <p className="text-info pb-md-3">Weight: 3 Pounds</p> */}
                                            <p className="text-info fw-500 d-md-block d-none">Nrs. {product?.price - product?.discount} <span className='fs-14 text-decoration-line-through'>Nrs. {product?.price}</span></p>
                                            <p className="text-info fw-500 d-md-none d-block">Nrs. {product?.price}</p>
                                        </div>
                                    </div>
                                    {/* Price */}
                                    <p className="text-info mt-md-0 mt-3">Quantity: <span className='text-warning fw-600'>{quantity}</span></p>


                                    <div className="delivery-info h-100 mt-xl-0 mt-0">
                                        <p className="fs-20 text-info end fw-500">
                                            Total :
                                            <span className="ms-2 text-warning fw-600 fs-16">
                                                Nrs {totalPrice}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <hr></hr>
                            <div className='payment'>
                                <h3 className='fs-24 my-4 text-secondary'>Payment Options</h3>
                                <div>
                                    <div class="form-check mb-3 d-flex align-items-center">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="payment_type"
                                            value="Khalti"
                                            id='khalti'
                                            checked={formik.values.payment_type === "Khalti"}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} />
                                        <label class="form-check-label ms-3" htmlFor="khalti">
                                            <img className='img-fluid khalti' src='https://cdn.asparksys.com/medias/1679317194683.png' alt='khalti' />
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="payment_type"
                                            value="COD"
                                            id='cod'
                                            checked={formik.values.payment_type === "COD"}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} />
                                        <label class="form-check-label fw-500 ms-3" htmlFor="cod">
                                            Cash on delivery
                                        </label>
                                    </div>
                                    {formik.errors.payment_type && formik.touched.payment_type ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3 bottom-0">{formik.errors.payment_type}</p>
                                    ) : null}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='billing-info'>
                        <div className='billing-box'>
                            <div className='first-col'>
                                <h4 className='text-secondary'>Price Details</h4>
                            </div>
                            <hr></hr>
                            <div className='mid-col'>
                                <div className='flex mb-2'>
                                    <p >Price ({quantity} Items)</p>
                                    <p>Nrs {totalPrice}</p>
                                </div>
                                <div className='flex'>
                                    <p >Delivery Charges</p>
                                    <p>Nrs 100</p>
                                </div>
                                <hr></hr>
                                <div className='flex'>
                                    <h5>Amount Payable</h5>
                                    <h5>Npr {afterDeliveryTotal}</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='last-col pb-3'>
                                <span className='text-warning fs-14 fw-500'>Your total savings on this order is Npr {(product?.discount) * quantity}</span>
                            </div>
                            {
                                formik?.values?.shipping_detail !== ""
                                    ?
                                    (
                                        formik?.values?.payment_type === "COD"
                                            ? <button onClick={formik.handleSubmit} className='btn btn-primary w-100 py-2 rounded-top-0'>Proceed</button>
                                            : formik?.values?.payment_type === "Khalti"
                                                ? <button onClick={payNow} class='btn btn-primary w-100 py-2 rounded-top-0' >Pay via khalti</button> : null
                                    )
                                    : null
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
