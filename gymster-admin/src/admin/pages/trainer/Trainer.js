import Tabbar from "../../components/tabbar/Tabbar";
import { Link, Outlet } from "react-router-dom";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteTrainer, getTrainers } from "../../../store/slices/trainer/trainerSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import  { toast } from "react-toastify";

export default function Trainer() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState(null);

    const handleDelete = () => {
        dispatch(deleteTrainer(trainerToDelete));
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (schedule) => {
        setTrainerToDelete(schedule);
        console.log(schedule)
        setShowModal(true);
    };

    useEffect(() => {
        dispatch(getTrainers());
    }, []);
    const trainers = useSelector(state => state.gymTrainer);
    const trainerData = trainers?.trainers
    console.log(trainerData)
    return (
        <>
             
            <DeleteModal
                show={showModal}
                onHide={handleCloseModal}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete ${trainerToDelete?.full_name}?`}
            />
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar trainer="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side trainers-page">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Trainers</h3>
                                <Link to="/admin-add-trainer" className="btn btn-secondary btn-lg fs-17"><i className="fa-solid fa-plus" /><span className="ms-2">Add Trainers</span></Link>
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Showing {trainerData.length} Entries</h5>

                                {/* <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search for Trainers" aria-label="Search for Trainers" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                                </div> */}
                            </div>

                            {/* Data Table */}
                            <div className="table-div overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th title="trainer id" scope="col">ID</th>
                                            <th scope="col">Trainer Name</th>
                                            <th scope="col">Routine</th>
                                            <th scope="col">Mobile Number</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        {
                                            trainerData.map((data) => {
                                                return (
                                                    <tr key={data?.gym_trainer?.id}>
                                                        <td>{data?.gym_trainer?.id}</td>
                                                        <td>{data?.full_name}</td>
                                                        <td>{data?.gym_trainer?.routine}</td>
                                                        <td>{data?.phone_number}</td>
                                                        <td>
                                                            <button className="btn p-0" onClick={() => handleShowModal(data)} >
                                                                <i className="fa-solid fa-trash-can del" />
                                                            </button>
                                                            <Link className="me-2" to={`/admin-trainer/edit-trainer/${data?.id}`}><i className="fa-regular fa-pen-to-square edit" /></Link>
                                                            <Link className="text-secondary" to={`/admin-trainer/view-trainer/${data?.id}`}><i className="fa-sharp fa-light fa-eye"/></Link>
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
            <Outlet />
        </>
    )
}