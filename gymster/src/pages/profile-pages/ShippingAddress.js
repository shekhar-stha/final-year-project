import React from "react"
import Header1 from "../../components/header/Header1"
import TabBar from "../../components/tab-bar/tabBar"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteModal from "../../components/modals/DeleteModal";
import { getShippingDetails } from "../../store/Slices/shippingDetailsSlice";

export default function ShippingAddress() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state?.user?.user?.id)

    useEffect(() => {
        dispatch(getShippingDetails())
    }, [])

    const shippingDetails = useSelector(state => state?.shippingDetail?.shippingDetails)

    // const [shippingDetails, setShippingDetails] = useState([])

    // const fetchShippingDetails = async () => {
    //     try {
    //         const response = await axios.get(`/shippingdetails/getShippingDetailsUser/${userId}`)
    //         setShippingDetails(response?.data)
    //         console.log(shippingDetails, "shippingArray")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const [showModal, setShowModal] = useState(false);
    const [shippingToDelete, setShippingToDelete] = useState(null);

    const handleDelete = () => {
        try {
            axios.delete(`/shippingDetails/deleteShippingDetails/${shippingToDelete.id}`)
            setShowModal(false);
            dispatch(getShippingDetails())
            toast.success(`Successfully deleted  ${shippingToDelete?.city}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } catch (error) {

        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (shippingDetail) => {
        setShippingToDelete(shippingDetail);
        console.log(shippingDetail)
        setShowModal(true);
    };

    console.log(shippingDetails)
    return (
        <>
            <DeleteModal
                show={showModal}
                onHide={handleCloseModal}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete ${shippingToDelete?.city} from location ?`}
            />
            <Header1 />

            <section className="container pb-5">
                <div className="row gap-3">
                    <TabBar shipping="tab-active" />
                    <div className="col-xl col-lg-8 col-11 mx-lg-0 mx-auto tab-data gx-0">
                        <div className="px-lg-5 px-4 py-4">
                            <h2 className="mb-4">Shipping Address</h2>
                            <div className="row gap-3">

                                {
                                    shippingDetails?.map((data) => {
                                        return (

                                            <div key={data.id} className="col-xl col-12 address-box border p-3 rounded-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5>{data.full_name}</h5>
                                                    <div className="text-primary fw-500 fs-14">
                                                        <Link className="text-warning me-4" 
                                                        to={`/shipping-address/edit-shipping-address/${data.id}`}>
                                                            <i className="fa-regular fa-pen-to-square pe-1" />
                                                            Edit
                                                        </Link>
                                                        <Link className="text-warning" onClick={() => handleShowModal(data)} >
                                                            <i class="fa-regular fa-trash-can"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="fs-13 mb-1 number text-truncate">{data.phone_number}</p>
                                                <p className="fs-13 description">
                                                    {data.province}, {data.address}, {data.city}, {data.landmark}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <hr />
                        <h5 className="text-primary text-center py-3">
                            <Link to="/add-shipping-address" className="text-warning d-flex justify-content-center align-items-center"><img className="me-1" src="https://cdn.asparksys.com/medias/1669204282840.png" alt="" />
                                Add New Address</Link>
                        </h5>
                    </div>
                </div>
            </section>
            <Outlet />
        </>
    )
}