import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../../store/slices/auth/userSlice";
import  { toast } from 'react-toastify';
export default function Tabbar(props) {
    const user = useSelector((state) => state.user.user.role)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.setItem('loginDetails', JSON.stringify(null));
        navigate("/login")
        dispatch(logout());
        toast.info("Successfuly logged out!")
    }
    return (
        <>
            <div className="tab w-100 px-2">
                <div className="w-100">
                    <img className="img-fluid brand ms-3" src="https://cdn.asparksys.com/medias/1672403852617.png" alt="logo" />
                </div>
                {/* {
                    user === "gym_member" && */}
                    <>
                        <Link to="/member-dashboard" className={props.dashboard + " btn"}>
                            <i className="fi fa-solid fa-house"></i> Dashboard
                        </Link>

                        <Link to="/member-schedule" className={props.schedule + " btn"}>
                            <i className="fi fa-solid fa-calendar-days"></i> Schedule
                        </Link>

                        <Link to="/member-diet" className={props.diet + " btn"}>
                            <i className="fi fa-solid fa-utensils"></i> Diet
                        </Link>

                        <Link to="/member-status" className={props.status + " btn"}>
                            <i className="fi fa-solid fa-circle-info"></i> Check Status
                        </Link>

                        <Link onClick={handleLogout} to="/" className={props.logout + " btn"}>
                        <i class="fa-solid fa-arrow-right-from-bracket "></i>  Log Out
                        </Link>
                    </>
                {/* } */}
            </div>
        </>
    )
}