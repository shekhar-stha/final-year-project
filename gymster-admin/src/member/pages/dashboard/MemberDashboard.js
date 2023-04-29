import Tabbar from "../../components/tabbar/Tabbar";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import RemainingDaysChart from "../../components/remaining-days-chart/RemainingDaysChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import NoticeBox from "../../../universal/notice/NoticeBox";
import { getNotice } from "../../../store/slices/notice/noticeSlice";
export default function MemberDashboard() {
    const userId = useSelector(state => state?.user?.user?.id)
    const [schedule, setSchedule] = useState()
    useEffect(() => {
        fetchSchedule()
        dispatch(getNotice())
    }, [])
    const dispatch = useDispatch()

    const notice = useSelector(state => state?.notice?.notice)

    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`/member/get-member-with-schedule/${userId}`)
            setSchedule(response?.data?.gym_member?.member_schedule?.days)
        } catch (error) {
            console.log(error)
        }
    }

    const todayWord = moment().format('dddd')
    const todayNum = moment().day()
    console.log("today", todayWord, todayNum)
    console.log(schedule)
    return (
        <>
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar dashboard="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side h-100 dashboard">

                            {/* 1st Row */}
                            <div className="row h-100">

                                <div className="col-lg-12 pe-2 member-dashboard">
                                    <h3 className="mb-3 text-secondary">Dashboard</h3>
                                    <hr />
                                    <div className="d-flex">
                                        <RemainingDaysChart />
                                        <div>
                                            <h4 className="small-header mb-4">Todays Schedule</h4>
                                            <table className="table schedule-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Day</th>
                                                        <th className="text-end" scope="col">Muscle Group</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{todayWord}</td>
                                                        <td className="text-end">{
                                                            schedule ? (schedule[todayNum] !== 6 ? schedule[todayNum] : "Holiday") : "...."}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="mb-3">Notices</h4>
                                        <div className="notices">

                                            {
                                                notice.map((data) => {
                                                    return (
                                                        <NoticeBox
                                                            key={data.id}
                                                            topic={data.topic}
                                                            description={data.description}
                                                            createdAt={data.createdAt} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}