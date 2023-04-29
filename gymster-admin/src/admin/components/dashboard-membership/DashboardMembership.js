import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembership } from "../../../store/slices/membership/membershipSlice";

export default function DashbaordMember(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembership());
    }, []);
    const membership = useSelector(state => state.membership);
    const membershipData = membership?.membership.slice(0,5)
    return (
        <>
            <div className={(props.class) + " table-div"}>
                <h4 className="fs-20 fw-600 text-secondary mb-3">Memberships Types</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Memberships</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        membershipData.map((data)=>{
                            return(
                                <tr key={data.id}>
                                <td>{data.name}</td>
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