import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
export default function PieChart() {
    const [series, setSeries] = useState([0, 0]);
    useEffect(() => {
        fetchMembersCount()
    }, [])

    const fetchMembersCount = async () => {
        try {
            const response = await axios.get("/member/getMemberCount")
            setSeries([response?.data.maleCount, response?.data.femaleCount]);

        } catch (error) {
            console.log(error)
        }
    }



    const [options, setOptions] = useState({
        chart: {
            width: 200,
            type: 'pie',
        },
        labels: ['Male', 'Female',],
        // responsive: [{
        //     breakpoint: 480,
        //     options: {
        //         chart: {
        //             width: 200
        //         },
        //         legend: {
        //             position: 'bottom'
        //         }
        //     }
        // }]
    });

    return (
        <>
            <div id="chart">
                <Chart options={options} series={series} type="pie" width={320} />
            </div>
        </>
    )
}