import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="pt-4">
                <hr />
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg pe-lg-5 me-lg-5 col-12 mb-lg-0 mb-5 text-lg-left">
                            <img src="https://cdn.asparksys.com/medias/1670344084376.png" alt="logo" width={50} height={50} className="d-inline-block my-auto mb-3" />
                            <p className="" style={{color:"#808080", fontSize:"15px"}}>
                                Gymster is a webapp that helps gym manage their gym and its members.
                            </p>
                        
                        </div>
                        <div className="col-lg col-md-4 col-12 mb-lg-0 mb-4 footer-col text-left">
                            <p><strong className="text-secondary fw-600 mb-4 h5"> More Info</strong></p>
                            <div className="text-info">
                                <p><Link to="/">Book Membership</Link></p>
                                <p><Link to="/contact">Contact Us</Link></p>
                                <p><Link to="/store">Store</Link></p>
                            </div>
                        </div>
                        <div className="col-lg col-md-4 col-12 mb-lg-0 mb-4 footer-col text-left">
                            <p><strong className="text-secondary fw-600 mb-4 h5"> Quick Links</strong></p>
                            <div className="text-info">
                                <p><Link to="/login">Login</Link></p>
                                <p><Link to="/register">Register</Link></p>
                                <p><Link to="/about-us">About Us</Link></p>
                            </div>
                        </div>
                        <div className="col-lg col-md-4 col-12 mb-lg-0 mb-4 footer-col text-left">
                            <p><strong className="text-secondary fw-600 mb-4 h5"> Contact us</strong></p>
                            <div className="text-info">
                                <p className="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-envelope me-3" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                    </svg>
                                    gymster@gmail.com
                                </p>
                                <p className="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-telephone me-3" viewBox="0 0 16 16">
                                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                    <span> +977-9811015121</span>
                                </p>
                                <p className="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-geo-alt me-3" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                    <span>RCT Market Itahari</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="d-flex justify-content-sm-between flex-sm-row flex-column align-items-center text-info">
                        <p>Ⓒ Gymster 2022. All rights reserved.</p>
                        <p>
                            Developed by
                            <Link to="/" className="text-secondary fw-600 mb-4 text-decoration-none ms-1">Shekhar Shrestha</Link>
                        </p>
                    </div>
                </div>
            </footer>
            {/* End of Footer Section */}
        </>
    )
}