import Tabbar from "../../components/tabbar/Tabbar";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import RemainingDaysChart from "../../components/remaining-days-chart/RemainingDaysChart";
import SelectSchedule from "../../components/modals/SelectSchedule";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Schedule() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [schedule, setSchedule] = useState()

    const userId = useSelector(state => state?.user?.user?.id)

    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`/member/get-member-with-schedule/${userId}`)
            setSchedule(response?.data?.gym_member?.member_schedule?.days)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSchedule()
    }, [show])
    console.log(schedule)
    return (
        <>
             
            <SelectSchedule show={show} handleClose={handleClose} />
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar schedule="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side h-100 dashboard">

                            {/* 1st Row */}
                            <div className="row h-100">

                                <div className="col-lg-12 pe-2 member-dashboard">
                                    <h3 className="mb-3 text-secondary">Schedule</h3>
                                    <hr />
                                    <button onClick={handleShow} className="btn ms-auto d-flex btn-secondary">Change Schedule</button>
                                    {/* Data Table */}
                                    <div className="table-div overflow mt-4">
                                        <table className="table table-striped ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sunday</th>
                                                    <th scope="col">Monday</th>
                                                    <th scope="col">Tuesday</th>
                                                    <th scope="col">Wednesday</th>
                                                    <th scope="col">Thursday</th>
                                                    <th scope="col">Friday</th>

                                                </tr>
                                            </thead>
                                            <tbody className="overflow">
                                                <tr>
                                                    {
                                                        schedule?.map((data) => {
                                                            return (
                                                                <td>{data}</td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            </tbody>
                                        </table>
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