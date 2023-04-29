import React from "react"
import Header1 from "../../components/header/Header1"
import TabBar from "../../components/tab-bar/tabBar"

export default function ChangePassword() {
    return (
        <>
        <Header1/>
            <section className="container pb-5">
                <div className="row gap-3">
                    <TabBar password="tab-active"/>
                    <div className="col-xl col-lg-8 col-11 mx-lg-0 mx-auto tab-data gx-0">
                        <div className="px-md-5 px-4 py-4">
                            <h2 className="mb-4">Change Password</h2>
                            <form>
                                <div className="row gap-2 mb-md-3 mb-2">
                                    <div className="col-md mb-md-0 mb-2 col-12">
                                        <div className="position-relative mb-3">
                                            <input type="password" name="old-pw" placeholder="Enter old password" className="form-control" required />
                                            <i className="fa-regular fa-eye position-absolute eye" />
                                            <div className="eye-block" />
                                        </div>
                                        <div className="position-relative mb-3">
                                            <input type="password" name="new-pw" placeholder="Enter new password" className="form-control" required />
                                            {/* <i className="fa-regular fa-eye-slash position-absolute eye"></i> */}
                                            <i className="fa-regular fa-eye position-absolute eye" />
                                            <div className="eye-block" />
                                        </div>
                                        <div className="position-relative mb-3">
                                            <input type="password" name="re-new-pw" placeholder="Re-enter new password" className="form-control" required />
                                            {/* <i className="fa-regular fa-eye-slash position-absolute eye"></i> */}
                                            <i className="fa-regular fa-eye position-absolute eye" />
                                            <div className="eye-block" />
                                        </div>
                                        <div className="mt-3 text-end">
                                            <button className="btn btn-lg btn-warning fw-500 fs-6">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-lg mb-md-0 mb-2 col-0">
                                        <img className="img-fluid h-100 pw-img d-lg-block d-none" src="https://cdn.asparksys.com/medias/1669350674354.png" alt="" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}