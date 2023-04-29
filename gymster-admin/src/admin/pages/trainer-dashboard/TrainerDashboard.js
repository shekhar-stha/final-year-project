import Tabbar from "../../components/tabbar/Tabbar";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import InfoBox from "../../components/info-box/InfoBox";

import NewMemberTable from "../../components/new-members-table/NewMembersTable";
import DashbaordMember from "../../components/dashboard-membership/DashboardMembership";
import PieChart from "../../components/pie-chart/PieChart";
import TrainerScheduleTable from "../../components/trainer-schedule-table/TrainerScheduleTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMembers } from "../../../store/slices/members/memberSlice";
import { getTrainers } from "../../../store/slices/trainer/trainerSlice";
import { getNotice } from "../../../store/slices/notice/noticeSlice";
import NoticeBox from "../../../universal/notice/NoticeBox";

export default function TrainerDashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers());
        dispatch(getTrainers());
        dispatch(getNotice())
    }, []);
    const notice = useSelector(state => state?.notice?.notice)
    const members = useSelector(state => state.gymMember?.members);
    const userId = useSelector(state => state.user.user?.id)
    const trainers = useSelector(state => state.gymTrainer?.trainers);
    const currentTrainer = trainers.find(trainer => trainer.id === userId)
    console.log(userId)
    console.log(currentTrainer, "Trainer")
    return (
        <>
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar dashboard="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side h-100 overflow dashboard">

                            {/* 1st Row */}
                            <div className="row h-100">

                                <div className="col-lg-8 pe-2">
                                    <h3 className="mb-3 text-secondary">Dashboard</h3>
                                    <div className="info-boxes d-flex gap-4 mb-5">
                                        <InfoBox color="#7286D3" icon="fi fa-solid fa-users" name="Total Members" number={members.length} />

                                        {/* <InfoBox color="#D7E9B9" icon="fi fa-solid fa-user-plus" name="New Enrollment" number="4" /> */}
                                        <InfoBox color="#D7E9B9" icon="fi fa-solid fa-chalkboard-user" name="Total Trainers" number={trainers.length} />
                                    </div>
                                    <TrainerScheduleTable schedule={currentTrainer?.gym_trainer?.routine} />
                                    <NewMemberTable className="mt-4 mb-5" />



                                </div>
                                <div className="col-lg-4 ps-2 pe-1">
                                    <div className="mb-2">
                                        <h4 className="fs-20 fw-600 text-secondary mb-3">Members Status</h4>
                                        <PieChart />
                                    </div>
                                    <DashbaordMember className="mt-5" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="mb-3">Notices</h4>
                                <div className="notices">

                                    {
                                        notice.map((data) => {
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
            </div>
        </>
    )
}