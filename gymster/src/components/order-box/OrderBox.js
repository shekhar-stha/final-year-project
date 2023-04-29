import React from 'react'

export default function OrderBox(props) {
    return (
        <div className="order mb-3 p-3 rounded-3 d-flex justify-content-between flex-wrap align-items-center">
            <div className="d-flex">
                {/* Img Div */}
                <div className="img-div">
                    <img className="img-fluid w-100 h-100" src={props.img} alt="" />
                </div>
                {/* Product Info */}
                <div className="h-100 ps-3 ordered-product-info">
                    <h5 className="pb-md-2">{props.name}</h5>
                    <p className="text-info pb-md-3">{props.address}</p>
                    <p className="text-info">Quantity: {props?.quantity}</p>
                    <p className="text-info fw-500 d-md-none d-block">Rs. {props.amount}</p>
                </div>
            </div>
            {/* Price */}
            <p className="text-info fw-500 d-md-block d-none">Rs. {props.amount}</p>
            <div className="delivery-info mt-xl-0 mt-3">
                <p className="fs-14 fw-500">
                    <i className="fa-solid fa-circle pe-2" style={{ color: props.color }} /> 
                    {/* Delivered on Mar 09, 2022 */}
                    {props.shippingStatus}
                </p>
                <p className="text-info fs-14 fw-normal ms-4">
                    {/* Your order has been delivered */}
                    {props.shippingContext}
                </p>
            </div>
        </div>
    )
}
