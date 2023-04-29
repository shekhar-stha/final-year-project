import { Link } from "react-router-dom";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import Tabbar from "../../components/tabbar/Tabbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNotice } from "../../../store/slices/notice/noticeSlice";
import NoticeBox from "../../../universal/notice/NoticeBox";
import MessageBox from "../../components/message-box/MessageBox";
import axios from "axios";

export default function Message() {
    const dispatch = useDispatch();

    const [messagesData, setMessageData] = useState()
    useEffect(() => {
        fetchMessages()
    }, []);

     const fetchMessages = async () => {
        try {
            const response = await axios.get('/message/getMessages');
            setMessageData(response.data)
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    console.log(messagesData)
    return (
        <>
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar message="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side notice-page overflow">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Messages</h3>
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Previous messages</h5>   
                            </div>

                            {/* Notices Section */}
                            <div className="notices mt-4">
                                {
                                    messagesData?.map((data) => {
                                        return (
                                            <MessageBox key={data.id} 
                                            name={data.full_name} 
                                            number= {data?.number}
                                            message={data.message} 
                                            createdAt={data.createdAt} />
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