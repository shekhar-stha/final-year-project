import Tabbar from "../../components/tabbar/Tabbar";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import InfoBox from "../../components/info-box/InfoBox";

import NewMemberTable from "../../components/new-members-table/NewMembersTable";
import RecentOrdersTable from "../../components/recent-orders-table/RecentOrdersTable";
import DashbaordMember from "../../components/dashboard-membership/DashboardMembership";
import PieChart from "../../components/pie-chart/PieChart";
import GraphChart from "../../components/graph-chart/GraphChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMembers } from "../../../store/slices/members/memberSlice";
import { getTrainers } from "../../../store/slices/trainer/trainerSlice";
import axios from "axios";

export default function Dashboard() {
    const dispatch = useDispatch();
    const [membersCount, setMembersCount] = useState()
    const [ordersCount, setOrdersCount] = useState()
    const [ordersRevenue, setOrdersRevenue] = useState()
    useEffect(() => {
        fetchMembersCount()
        fetchOrdersCount()
        fetchOrdersRevenue()
        dispatch(getTrainers());
    }, [])

    const fetchMembersCount = async () => {
        try {
            const response = await axios.get("/member/getMemberCount")
            setMembersCount(response?.data?.totalCount)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("member count", membersCount)

    const fetchOrdersCount = async () => {
        try {
            const response = await axios.get("/order/getOrderCount")
            setOrdersCount(response?.data?.count)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchOrdersRevenue = async () => {
        try {
            const response = await axios.get("/order/getTotalAmount")
            setOrdersRevenue(response?.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("order count", ordersCount)
    const trainers = useSelector(state => state.gymTrainer?.trainers);


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

                                <div className="col-lg-8 pe-2">
                                    <h3 className="mb-3 text-secondary">Dashboard</h3>
                                    <div className="info-boxes d-flex gap-4 mb-5">
                                        <InfoBox color="#7286D3" icon="fi fa-solid fa-users" name="Total Members" number={membersCount} />

                                        <InfoBox color="#D7E9B9" icon="fi fa-solid fa-chalkboard-user" name="Total Trainers" number={trainers.length} />

                                        <InfoBox color="#BFEAF5" icon="fi fa-solid fa-cart-shopping" name="Orders" number={ordersCount} />

                                        <InfoBox color="#03C988" icon="fi fa-solid fa-sack-dollar" name="Total Revenue" number={ordersRevenue} />
                                    </div>

                                    <div>
                                        <h4 className="fs-20 fw-600 text-secondary mb-3">Total Orders</h4>
                                        <GraphChart />
                                    </div>

                                    <NewMemberTable className="mt-4 mb-5" />


                                </div>
                                <div className="col-lg-4 ps-2 pe-1">
                                    <div className="mb-2">
                                        <h4 className="fs-20 fw-600 text-secondary mb-3">Members Status</h4>
                                        <PieChart />
                                    </div>
                                    <RecentOrdersTable />
                                    <DashbaordMember className="mt-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}