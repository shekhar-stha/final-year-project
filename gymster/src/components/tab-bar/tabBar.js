import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../store/Slices/userSlice";
import { useDispatch } from "react-redux";

export default function TabBar(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        loginDetails()
    }, [])

    const loginDetails = ()=>{
        const storedLoginDetails = localStorage.getItem('loginDetails');
        const loginDetails = storedLoginDetails ? JSON.parse(storedLoginDetails) : null;
        if (loginDetails === null) {
            navigate("/login")
            toast.info("You need to login first")
            return;
        }
    }
    const handleLogout = () => {
        localStorage.setItem('loginDetails', JSON.stringify(null));
        dispatch(logout());
        window.location.reload();
    }
    return (
        <>
            {/* Tabbar */}
            < div className="col-xl-3 col-lg col-12 mb-lg-0 mb-4" >
                <div className="tabbar">
                    <div className={props.account + " tab"}>
                        <Link to="/my-account"> <i className="fa-solid fa-user-gear" /> My Account</Link>
                    </div>
                    <div className={props.orders + " tab"}>
                        <Link to="/my-orders"><i className="fa-solid fa-bag-shopping" /> My Orders</Link>
                    </div>
                    <div className={props.shipping + " tab"}>
                        <Link to="/shipping-address"><i className="fa-solid fa-truck" /> Shipping Address</Link>
                    </div>
                    <div className={props.logout + " tab"}>
                        <Link onClick={handleLogout}><i className="fa-solid fa-user-gear" /> Logout</Link>
                    </div>
                </div>
            </div >
        </>
    )
}