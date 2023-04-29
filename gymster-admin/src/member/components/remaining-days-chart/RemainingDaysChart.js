import React, { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";
import { getMembers } from "../../../store/slices/members/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Chart from "react-apexcharts";

export default function RemainingDaysChart() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMembers({ search: "" }));
    }, []);

    const userId = useSelector(state => state?.user?.user?.id)
    console.log(userId)

    const membersData = useSelector(state => state?.gymMember?.members)

    const memberData = membersData.find(data => data.id === userId)
    console.log("member data",membersData)

    const joined_Date = moment(memberData?.gym_member?.joined_date).toDate();
    const end_date = moment(memberData?.gym_member?.end_date).toDate();
    const today = moment();

    console.log("joined date",joined_Date, end_date)
    const totalDays = moment(end_date).diff(moment(joined_Date), "days");
    console.log(`Total days: ${totalDays}`);

    const completedDays = moment(today).diff(joined_Date, 'days');
    console.log("Completed Days:", completedDays)

    const remainingDays = moment(end_date).diff(today, 'days');
    console.log("Remaining Days:", remainingDays)

    // const options = {
    //     legend: "none",
    //     pieHole: 0.8,
    //     is3D: false,
    // };

    // const data = [
    //     ["Days", "Remaining"],
    //     ["Remaining Days", remainingDays],
    //     ["Completed days", completedDays],
    // ];

    const chartData = ({
        series: [remainingDays,completedDays],
        options: {
            labels: ["Remaining Days", "Completed Days"],
            colors:['#08276d', '#FF0303'],
            chart: {
                width: 380,
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                formatter: function (val, opts) {
                    return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });

    return (
        <>
            <div className="position-relative remaining-days-chart">
                <h4 className="small-header">Remaining Days</h4>
                {/* <Chart
                    chartType="PieChart"
                    width="100%"
                    data={data}
                    options={options}
                /> */}
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    width={400}
                />
                <p className="position-absolute text-report">{remainingDays} Days</p>
            </div>
        </>
    );
}
