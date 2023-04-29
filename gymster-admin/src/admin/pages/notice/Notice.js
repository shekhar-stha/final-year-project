import { Link } from "react-router-dom";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import Tabbar from "../../components/tabbar/Tabbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotice } from "../../../store/slices/notice/noticeSlice";
import NoticeBox from "../../../universal/notice/NoticeBox";

export default function Notice() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNotice());
    }, []);
    const noticeData = useSelector(state => state?.notice?.notice);

    console.log(noticeData)
    return (
        <>
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar notice="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side notice-page overflow">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Notices</h3>
                                <Link to="/admin-add-notice" className="btn btn-secondary btn-lg fs-17"><i className="fa-solid fa-plus" /><span className="ms-2">New Notices</span></Link>
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Previous Notices</h5>

                                {/* <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search for Notices" aria-label="Search for Notices" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                                </div> */}
                            </div>

                            {/* Notices Section */}
                            <div className="notices mt-4">
                                {
                                    noticeData.map((data) => {
                                        return (
                                            <NoticeBox key={data.id} topic={data.topic} description={data.description} createdAt={data.createdAt} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}