import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
    return (
        <div className={("product position-relative home-product ") + (props.class)}>

            <img src={props.img} alt="product" />
            <div className="products-info px-sm-3 px-2">
                <span className="store fs-14">{props.category}</span>
                <h5 className="product-name fw-500">{props.name}</h5>
                <h6 className="price text-warning fw-semibold">
                    Rs. {props.price} <span className="fw-normal crossed-price">{props.crossedPrice}</span>
                </h6>
            </div>
            <span className="discount-percent position-absolute fw-500">
                {props.discountPercent}% Off
            </span>

        </div>
    )
}