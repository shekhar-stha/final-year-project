import TabBar from "../../../components/tab-bar/tabBar";
import Header1 from "../../../components/header/Header1";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders } from "../../../store/Slices/orderSlice";
import OrderBox from "../../../components/order-box/OrderBox";
import OrderNav from "../../../components/order-box/OrderNav";

export default function MyOrdersPending() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const orders = useSelector(state => state?.order?.order)
    console.log(orders)

    const pendingOrder = orders.filter((data) => {
        return (
            data?.status === "Pending"
        )
    })
    console.log("pendingOrder", pendingOrder)
    return (
        <>
            <Header1 />
            <section className="container pb-5">
                <div className="row gap-3">
                    <TabBar orders="tab-active" />
                    <div className="col-xl col-lg-8 col-11 mx-lg-0 mx-auto tab-data gx-0">
                        <div className="px-xl-5 px-sm-4 px-1 py-4">
                            <div className="d-flex flex-md-row flex-column justify-content-between align-content-center">
                                <h2 className="mb-4">My Orders</h2>
                                <OrderNav pending="active" />
                            </div>
                            <div className="orders-container">
                                {/* Order */}
                                {
                                    pendingOrder?.map((data) => {
                                        return (
                                            <OrderBox
                                                img={`http://localhost:5000/images/${data?.product?.img1}`}
                                                name={data?.product?.name}
                                                address={data?.shipping_detail?.city}
                                                amount={data?.amount}
                                                quantity={data?.quantity}
                                                shippingStatus={`Order status : ${data?.status}`}
                                                color={data?.status === "Delivered" ? "green" : data?.status === "Cancelled" ? "red" :
                                                    data?.status === "Shipping" ? "#2B3467" : data?.status === "Pending" ? "#EBB02D" : "white"
                                                }
                                                shippingContext={`Your order is ${data?.status}`}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}