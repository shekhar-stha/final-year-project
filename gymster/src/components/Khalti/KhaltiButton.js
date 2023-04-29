import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from './khaltiConfig';

export default function KhaltiProduct(props) {
    let checkout = new KhaltiCheckout(config);

    const product = JSON.parse(localStorage.getItem("product"))
    const quantity = JSON.parse(localStorage.getItem("quantity"))
    const payingAmount = product?.price - product?.discount
    console.log(payingAmount)

    const amount = () =>{
        checkout.show({ amount: ((payingAmount * quantity) * 100) + 10000 })
        // props.onClick()
    }

    // const handleButtonClick = () =>{
    //     amount();
    // }
    return (
        <div>
            <button
                onClick={amount}
                className={props.class}>
                Pay via Khalti
            </button>
        </div>
    )
}
