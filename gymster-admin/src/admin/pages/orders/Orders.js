
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getOrder } from "../../../store/slices/order/orderSlice";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import Tabbar from "../../components/tabbar/Tabbar";

export default function Orders() {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        dispatch(getOrder({ id: searchQuery }))
    }, [])

    const orders = useSelector(state => state?.order?.order)
    console.log(orders)

    const handleSearchChange = (event) =>{
        console.log(event.target.value)
        setSearchQuery(event.target.value)
        dispatch(getOrder({ id: event.target.value }));
    }
    return (
        <>
            <Outlet />
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar orders="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side orders-page">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary">Orders</h3>

                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Showing {orders.length} Entries</h5>

                                <div className="input-group mb-3">
                                    <input onChange={handleSearchChange} type="number" className="form-control" placeholder="Search for order by ID" aria-label="Search for orders" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="table-div overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Product Name</th>
                                            <th>Img</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Ordered Date</th>
                                            <th scope="col">Total</th>

                                            <th scope="col">Address</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        {
                                            orders.map((data) => {
                                                return (
                                                    <tr>
                                                        <td>{data?.id}</td>
                                                        <td><p style={{width: "120px"}} className="text-truncate">{data?.shipping_detail?.full_name}</p></td>
                                                        <td><p style={{width: "140px"}} className="text-truncate">{data?.product?.name}</p></td>
                                                        <td><img className="img-thumbnail" src={`http://localhost:5000/images/${data?.product?.img1}`} alt="product" /></td>
                                                        <td>{data?.quantity}</td>
                                                        <td>{(data?.ordered_date).slice(0, 10)}</td>
                                                        <td>Nrs {data?.amount}</td>
                                                        <td><p  style={{width: "135px"}} className="text-truncate">{data?.shipping_detail?.city}</p></td>

                                                        <td className="fw-semibold" >
                                                            <p className="d-flex justify-content-center rounded-4 fs-14 fw-500 p-2 py-1" style={{
                                                                backgroundColor: data?.status === "Shipping" ? "#FFA500" :
                                                                    data?.status === "Cancelled" ? "#FF0000" :
                                                                        data?.status === "Delivered" ? "#008000" :
                                                                            data?.status === "Pending" ? "#FFFF00" :
                                                                                "transparent",
                                                                color: data?.status === "Cancelled" ? "#FFFFFF" :
                                                                    data?.status === "Shipping" || data?.status === "Pending" ? "#000000" :
                                                                        "#FFFFFF",
                                                            }} >
                                                                {data?.status}
                                                            </p>

                                                        </td>
                                                        <td><Link to={`view-order/${data?.id}`} ><i className="fa-solid fa-gear view" /></Link></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}