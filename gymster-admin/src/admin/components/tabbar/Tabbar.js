
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../store/slices/auth/userSlice";
export default function Tabbar(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user.role)

    const handleLogout = () => {
        localStorage.setItem('loginDetails', JSON.stringify(null));
        dispatch(logout());
        navigate("/")
    }
    return (
        <>
            <div className="tab w-100 px-2">
                <div className="w-100">
                    <img className="img-fluid brand ms-3" src="https://cdn.asparksys.com/medias/1672403852617.png" alt="logo" />
                </div>
                {
                    user === "admin" &&
                    <>
                        <Link to="/admin-dashboard" className={props.dashboard + " btn"}>
                            <i className="fi fa-solid fa-house"></i> Dashboard
                        </Link>

                        <Link to="/admin-trainer" className={props.trainer + " btn"}>
                            <i className="fi fa-solid fa-person-chalkboard"></i> Trainer
                        </Link>

                        <Link to="/admin-memberships" className={props.memberships + " btn"}>
                            <i className="fi fa-solid fa-dumbbell"></i> Memberships
                        </Link>

                        <Link to="/admin-orders" className={props.orders + " btn"}>
                            <i className="fi fa-solid fa-truck-fast"></i> Orders
                        </Link>

                        <Link to="/admin-products" className={props.products + " btn"}>
                            <i className="fi fa-solid fa-box"></i> Products
                        </Link>

                        <Link to="/admin-notice" className={props.notice + " btn"}>
                            <i className="fi fa-solid fa-bullhorn"></i> Notice
                        </Link>
                        <Link to="/admin-message" className={props.message + " btn"}>
                            <i class="fi fa-regular fa-message"></i> Message
                        </Link>
                    </>
                }


                {
                    user === "gym_trainer" &&
                    <Link to="/trainer-dashboard" className={props.dashboard + " btn"}>
                        <i className="fi fa-solid fa-house"></i> Dashboard
                    </Link>

                }

                {
                    ["gym_trainer", "admin"].find(role => role.includes(user)) &&
                    <>
                        <Link to="/admin-member" className={props.member + " btn"}>
                            <i className="fi fa-solid fa-users"></i> Member
                        </Link>

                        <Link to="/diet" className={props.diet + " btn"}>
                            <i className="fi fa-solid fa-utensils"></i> Diet
                        </Link>

                        <Link to="/schedule" className={props.schedule + " btn"}>
                            <i className="fi fa-solid fa-calendar-days"></i> Schedule
                        </Link>
                    </>
                }

                <Link onClick={handleLogout} className={props.logout + " btn"}>
                    <i className="fi fa-solid fa-right-from-bracket"></i>  Log Out
                </Link>
            </div>
        </>
    )
}