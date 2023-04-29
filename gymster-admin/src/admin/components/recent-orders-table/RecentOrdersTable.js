import axios from "axios";
import { useEffect, useState } from "react";

export default function RecentOrdersTable(props) {

    const [orders, setOrders] = useState()
    useEffect(() => {
        fetchLatestOrders()
    }, [])
    const fetchLatestOrders = async () => {
        try {
            const response = await axios.get("/order/latestOrders");
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(orders)
    return (
        <>
            <div className={(props.class) + " table-div"}>
                <h4 className="fs-20 fw-600 text-secondary mb-3">Recent Orders</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Product Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((data) => {
                                return (
                                    <tr key={data?.id}>
                                        <td><p style={{ width: "130px" }} className="text-truncate">{data?.shipping_detail?.full_name}</p></td>
                                        <td><p style={{ width: "180px" }} className="text-truncate">{data?.product?.name}</p></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}