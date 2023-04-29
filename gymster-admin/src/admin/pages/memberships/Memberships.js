import Tabbar from "../../components/tabbar/Tabbar";
import { Link, Outlet } from "react-router-dom";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMembership } from "../../../store/slices/membership/membershipSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import { deleteMembership } from "../../../store/slices/membership/membershipSlice";
import  { toast } from "react-toastify";

export default function Memberships() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [membershipToDelete, setMembershipToDelete] = useState(null);

    const handleDelete = () => {
        dispatch(deleteMembership(membershipToDelete));
        setShowModal(false);
        toast.success(`Successfully deleted  ${membershipToDelete?.name}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (membership) => {
        setMembershipToDelete(membership);
        console.log(membership)
        setShowModal(true);
    };

    useEffect(() => {
        dispatch(getMembership());
    }, []);

    const membership = useSelector(state => state.membership);
    const membershipData = membership?.membership
    return (
        <>
             
            <DeleteModal
                show={showModal}
                onHide={handleCloseModal}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete ${membershipToDelete?.name}?`}
            />
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar memberships="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side memberships-page">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Memberships List</h3>
                                <Link to="/admin-add-membership" className="btn btn-secondary btn-lg fs-17"><i className="fa-solid fa-plus" /><span className="ms-2">Add Membership</span></Link>
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Showing {membershipData.length} Entries</h5>

                                {/* <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search for memberships" aria-label="Search for memberships" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                                </div> */}
                            </div>

                            {/* Data Table */}
                            <div className="table-div overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Membership Name</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Admission Fee</th>
              
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        {
                                            membershipData.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        <td> {data.name}</td>
                                                        <td>{data.duration} Month</td>
                                                        <td>{data.price}</td>
                                                        <td>{data?.admission_fee}</td>
                                                        {/* <td>
                                                            <button className="btn p-0" onClick={() => handleShowModal(data)} ><i className="fa-solid fa-trash-can del" /> </button>
                                                            <Link to={`/admin-memberships/edit-membership/${data.id}`}> <i className="fa-regular fa-pen-to-square edit" /></Link>
                                                        </td> */}
                                                        <td>
                                                            <button className="btn p-0" onClick={() => handleShowModal(data)} ><i className="fa-solid fa-trash-can del" /></button>
                                                            <Link to={`/admin-memberships/edit-membership/${data.id}`} ><i className="fa-regular fa-pen-to-square edit" /> </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination d-flex justify-content-center mt-4">
                                <nav aria-label="..." className="pe-5">
                                    <ul className="pagination pe-5">
                                        <li className="page-item">
                                            <Link className="page-link">Previous</Link>
                                        </li>
                                        <li className="page-item"><Link className="page-link">1</Link></li>
                                        <li className="page-item active" aria-current="page">
                                            <Link className="page-link">2</Link>
                                        </li>
                                        <li className="page-item"><Link className="page-link">3</Link></li>
                                        <li className="page-item">
                                            <Link className="page-link">Next</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    )
}