import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOrder } from '../../../../store/slices/order/orderSlice';

export default function ViewOrders() {
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState()
  const [status, setStatus] = useState()
  const dispatch = useDispatch()

  const handleClose = () => {
    navigate("/admin-orders")
  }

  const { id } = useParams()

  useEffect(() => {
    fetchSingleOrder()
  }, [])

  const fetchSingleOrder = async () => {
    try {
      const response = await axios.get(`/order/getOneOrder/${id}`)
      setOrderData(response?.data)
      setStatus(response?.data?.status)
      console.log(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log("status", status)
  console.log("order data", orderData)

  const sendingData = {
    status : status
  }


  const changeStatus = async () => {
    try {
      await axios.patch(`/order/updateOrder/${id}`, sendingData)
      dispatch(getOrder({ id: "" }))
      navigate("/admin-orders")
      toast.success(`Successfully Updated order`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal dialogClassName='my-modal order-modal mx-auto' show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row gap-0'>
          <div className='col-md'>
            <h5>Product Name: <span>{orderData?.product?.name}</span></h5>
            <h5>Quantity: <span>{orderData?.quantity}</span></h5>
            <h5>Ordered Date: <span>{orderData?.ordered_date.slice(0, 10)}</span></h5>
            <h5>Payment Type: <span>{orderData?.payment_type}</span></h5>
            <h5>Delivered Date: <span>{orderData?.delivered_date}</span></h5>
            <h5>Total Amount: <span>Nrs {orderData?.amount}</span></h5>
          </div>
          <div className='col-md'>
            <h5>Customer Name: <span>{orderData?.shipping_detail?.full_name}</span></h5>
            <h5>Province: <span>{orderData?.shipping_detail?.province}</span></h5>
            <h5>City: <span>{orderData?.shipping_detail?.city}</span></h5>
            <h5>Address: <span>{orderData?.shipping_detail?.address}</span></h5>
            <h5>Landmark: <span>{orderData?.shipping_detail?.landmark}</span></h5>
            <h5>Phone: <span>{orderData?.shipping_detail?.phone_number}</span></h5>
          </div>
        </div>
        <hr />
        <div className="home-delivery mt-3">
          <p className="fw-500 fs-14 text-info mb-2 text-center">
            Order Status
          </p>
          <div className="d-inline-flex w-100 justify-content-between px-5">
            <div className="mb-3">
              <label
                className={`d-flex align-items-center ${status === "Pending" ? "red-border" : null}`}
                htmlFor="pending"
              >
                <input
                  className="form-check-input me-3 mt-0"
                  type="radio"
                  name="delivery"
                  id="pending"
                  value="Pending"
                  checked={status === "Pending"}
                  onChange={() => setStatus("Pending")}
                />
                Pending
              </label>
            </div>

            <div className="mb-3">
              <label
                className={`d-flex align-items-center ${status === "Shipping" ? "red-border" : null}`}
                htmlFor="shipping"
              >
                <input
                  className="form-check-input me-3 mt-0"
                  type="radio"
                  name="delivery"
                  id="shipping"
                  value="Shipping"
                  checked={status === "Shipping"}
                  onChange={() => setStatus("Shipping")}
                />
                Shipping
              </label>
            </div>

            <div className="mb-3">
              <label
                className={`d-flex align-items-center ${status === "Delivered" ? "red-border" : null}`}
                htmlFor="delivered"
              >
                <input
                  className="form-check-input me-3 mt-0"
                  type="radio"
                  name="delivery"
                  id="delivered"
                  value="Delivered"
                  checked={status === "Delivered"}
                  onChange={() => setStatus("Delivered")}
                />
                Delivered
              </label>
            </div>

            <div>
              <label
                className={`d-flex align-items-center ${status === "Cancelled" ? "red-border" : null}`}
                htmlFor="cancelled"
              >
                <input
                  className="form-check-input me-3 mt-0"
                  type="radio"
                  name="delivery"
                  id="cancelled"
                  value="Cancelled"
                  checked={status === "Cancelled"}
                  onChange={() => setStatus("Cancelled")}
                />
                Cancelled
              </label>
            </div>
          </div>
        </div>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={changeStatus}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
