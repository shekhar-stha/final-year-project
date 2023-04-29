import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "../../../store/slices/members/memberSlice";
import axios from "axios";

export default function NewMemberTable(props) {
    const [members, setMembers] = useState()
    useEffect(()=> {
        fetchLatestMembers()
      },[])
    const fetchLatestMembers = async () => {
        try {
          const response = await axios.get("/member/latestMembers");
          setMembers(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      console.log(members)

    return (
        <>
            <div className={(props.class) + " table-div"}>
                <h4 className="fs-20 fw-600 text-secondary mb-3">New Members</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Joining Date</th>
                            <th scope="col">Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members?.map((data) => {
                                return (
                                    <tr key={data?.id}>
                                        <td>{data?.id}</td>
                                        <td>{data?.full_name}</td>
                                        <td>{data?.gym_member?.joined_date?.slice(0, 10)}</td>
                                        <td>{data?.gym_member?.membership?.name}</td>
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