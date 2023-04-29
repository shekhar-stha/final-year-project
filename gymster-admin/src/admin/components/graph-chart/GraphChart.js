import Chart from "react-apexcharts";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getOrder, fetchOrderByDates } from "../../../store/slices/order/orderSlice";
import _ from "lodash"
import moment from "moment"
import axios from 'axios'
export default function GraphChart() {
    const orders = useSelector(state => state.order)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrder({id : ""}))
    }, [])

    const orderDays = []
    const orderDaysAmount = []

    const series = [
        {
            name: "series1",
            data: orderDaysAmount,
        }
    ];

    const options = {
        chart: {
            height: 350,
            type: "area",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "date",
            categories: orderDays,
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
    };
    const withOutCancelledOrder = orders?.order.filter(order => order.status !== 'Cancelled')
    const daysOrder = _.groupBy(withOutCancelledOrder, (item) => (moment.utc(item.ordered_date).format('YYYY-MM-DD')))


    Object.keys(daysOrder).map(item => {
        orderDays.unshift(item)
        orderDaysAmount.unshift(_.sum(daysOrder[item].map(data => data.amount)))
    })

    console.log(orderDays, orderDaysAmount)
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    

    useEffect(() => {
        axios.post(`/order/getOrderByDates`, {fromDate, toDate}).then((res)=> dispatch(fetchOrderByDates(res.data))).catch(err=> console.log(err))
    }, [fromDate, toDate]);

    return (
        <>
            <div className="ms-md-auto d-flex flex-md-row flex-column">
                <div className="me-4">
                    <h6>From</h6>
                    <input className="form-control" type="date" onChange={e => setFromDate(e.target.value)} />
                </div>

                <div>
                    <h6>To</h6>
                    <input className="form-control" type="date" onChange={e => setToDate(e.target.value)} />
                </div>
            </div>
            <Chart
                options={options} series={series} type="area" height={350}
            />
        </>
    )
}