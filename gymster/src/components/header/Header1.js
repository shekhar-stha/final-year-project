import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/Slices/userSlice";
import { useEffect, useState } from "react";
import  { toast } from "react-toastify";
import { setSearchTerm } from "../../store/Slices/searchProductSlice";
export default function Header1() {
    const user = useSelector((state) => state.user?.user)
    const searchedProduct = useSelector((state) => state?.searchedProducts?.searchedProduct)

    const [initials, setInitials] = useState("")
    const dispatch = useDispatch()

    console.log(searchedProduct)
    useEffect(() => {
        if (user !== undefined) {
            const name = user?.full_name;
            const words = name?.split(' ');
            // Extract the first character of each word
            if (words !== undefined) {
                const letters = words[0]?.charAt(0) + words[1]?.charAt(0);
                setInitials(letters?.toUpperCase())
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.setItem('loginDetails', JSON.stringify(null));
        dispatch(logout());
        toast.info("Succefully logged out!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    const handleInputChange = (event) => {
        dispatch(setSearchTerm(event.target.value))
    };


    console.log("searched product",searchedProduct)

    return (
        <>
             
            <div className="header-1 pb-5 bg-white">
                <nav className="navbar navbar-expand-xl navbar-light bg-lg-hard">
                    <div className="container">
                        <Link to="/" className="navbar-brand"><img className="logo" src="https://cdn.asparksys.com/medias/1672645500846.png" alt="logo" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse align-items-center" id="navbarSupportedContent">

                            <form className="d-flex ms-3" role="search">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control border-end-0 text-truncate fs-14 fw-400"
                                        value={searchedProduct}
                                        onChange={handleInputChange}
                                        placeholder="Search for products that you want"
                                        aria-describedby="basic-addon1" />
                                    <span className="input-group-text bg-white border-start-0 text-warning" id="basic-addon1"><Link to={`/list/${searchedProduct ? searchedProduct : ""}`}> <i className="fa-solid fa-magnifying-glass text-primary"></i></Link></span>
                                </div>
                            </form>

                            <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about-us" className="nav-link">About Us</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to="/store" className="nav-link">
                                        Store
                                    </Link>

                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link">Contact Us</Link>
                                </li>
                            </ul>

                            <div className="profile-navs d-flex ms-auto">

                                {
                                    user ?
                                        <>
                                            <Link to="/my-orders" className="d-flex align-items-center me-4">
                                                <i className="fa-solid fa-cart-shopping text-warning pe-2"></i>
                                                <p className="mb-0 fs-14">Orders</p>
                                            </Link>
                                            <div className="my-profile dropdown">
                                                <Link className="d-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <p className="initials">{initials}</p>
                                                    {/* <p className="mb-0 fs-15">Shekhar</p> */}
                                                </Link>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <Link to="/my-account" className="dropdown-item">My Account </Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/login' className="dropdown-item">Change Password </Link>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"></hr>
                                                    </li>
                                                    <li>
                                                        <Link onClick={handleLogout} className="dropdown-item">Log Out</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                        :
                                        <div className="login-signup position-relative">
                                            <Link to='/login' className="btn btn-outline-primary border-2 rounded-1 px-4">
                                                Log in
                                            </Link>

                                            <Link to='/register' className="ms-2 btn btn-primary rounded-1 px-3">
                                                Sign Up
                                            </Link>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}