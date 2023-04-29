import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import  { toast } from "react-toastify";
import { deleteMember, getMembers } from "../../../store/slices/members/memberSlice";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import DeleteModal from "../../components/modals/DeleteModal";
// import AddMember from "../../components/modals/member/AddMember";
import Tabbar from "../../components/tabbar/Tabbar";

export default function Member() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers({ search: searchQuery }));
    }, []);
    const members = useSelector(state => state?.gymMember?.members);

    const role = useSelector(state => state?.user?.user?.role)
    console.log(role)

    const handleDelete = () => {
        dispatch(deleteMember(memberToDelete));
        setShowModal(false);
        dispatch(getMembers({ search: searchQuery }));
       
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (member) => {
        setMemberToDelete(member);
        console.log(member)
        setShowModal(true);
    };

    console.log(members)

    const handleSearchChange = (event) =>{
        console.log(event.target.value)
        setSearchQuery(event.target.value)
        dispatch(getMembers({ search: event.target.value }));
    }
    return (
        <>
             
            <DeleteModal
                show={showModal}
                onHide={handleCloseModal}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete ${memberToDelete?.full_name}?`}
            />
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar member="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side members-page">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Members</h3>
                                {role === "admin" ? <Link to="/admin-add-member" className="btn btn-secondary btn-lg fs-17"><i className="fa-solid fa-plus" /><span className="ms-2">Add Members</span></Link> : null}
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Showing {members.length} Entries</h5>
                                <div className="buttons-div">
                                    {/* <button onClick={handleActive} className={"btn rounded-start " + showActive}>Active</button>
                                    <button onClick={handleInactive} className={"btn rounded-end " + showInActive}>Inactive</button> */}
                                </div>
                                <div className="input-group mb-3">
                                    <input onChange={handleSearchChange} type="text" className="form-control" placeholder="Search for Members" aria-label="Search for Members" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="table-div overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Member ID</th>
                                            <th scope="col">Member Name</th>
                                            <th scope="col">Joined Date</th>
                                            <th scope="col">Expiry Date</th>
                                            <th scope="col">Package</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        {
                                            members.map((member) => {
                                                return (
                                                    <tr key={member?.gym_member?.id}>
                                                        <td>{member?.gym_member?.id}</td>
                                                        <td>{member?.full_name}</td>
                                                        <td>{member?.gym_member?.joined_date?.slice(0, 10)}</td>
                                                        <td>{member?.gym_member?.end_date?.slice(0, 10)}</td>
                                                        <td>{member?.gym_member?.membership?.name}</td>
                                                        <td>
                                                            <p className="d-flex justify-content-center rounded-4 fs-14 fw-500 p-2 py-1 text-white"
                                                                style={{
                                                                    backgroundColor: member?.gym_member?.status === "active" ? "#008000" :
                                                                        member?.gym_member?.status === "inactive" ? "#FF0000" : "transparent",

                                                                }}
                                                            >
                                                                {member?.gym_member?.status}
                                                            </p>
                                                        </td>
                                                        <td>{role === "admin" ? <> <button className="btn p-0" onClick={() => handleShowModal(member)} ><i className="fa-solid fa-trash-can del" /></button>
                                                            <Link className="me-1" to={`/admin-member/edit-member/${member?.id}`} ><i className="fa-regular fa-pen-to-square edit" /> </Link> </> : null}
                                                            <Link className="text-secondary" to={`/admin-member/view-member/${member?.id}`} ><i className="fa-sharp fa-light fa-eye" /> </Link>
                                                            {
                                                                member?.gym_member?.status === "inactive" && role === "admin" 
                                                                    ? <Link title="renew member" className="text-red ms-1" to={`/admin-member/renew/${member?.id}`} ><i class="fa-solid fa-arrows-rotate" /> </Link>
                                                                    : null
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}