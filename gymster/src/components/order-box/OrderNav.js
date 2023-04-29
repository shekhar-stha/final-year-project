import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderNav(props) {
    return (
        <ul className="d-flex align-items-center delivery-tab">
            <li>
                <Link className={"me-3 " + props.all} to="/my-orders">All </Link>
            </li>
            <li>
                <Link className={"me-3 " + props.pending} to="/my-orders-pending">Pending </Link>
            </li>

            <li>
                <Link className={"me-3 " + props.delivered} to="/my-orders-delivered">Delivered</Link>
            </li>
            <li>
                <Link className={"me-3 " + props.shipping} to="/my-orders-shipped">Shipping</Link>
            </li>
            <li>
                <Link className={"me-3 " + props.cancelled} to="/my-orders-cancelled">Cancelled</Link>
            </li>
        </ul>
    )
}
