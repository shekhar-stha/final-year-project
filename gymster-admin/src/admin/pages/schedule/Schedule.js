import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import  { toast } from "react-toastify";
import { deleteteSchedule, getSchedule } from "../../../store/slices/schedule/scheduleSlice";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import DeleteModal from "../../components/modals/DeleteModal";
import Tabbar from "../../components/tabbar/Tabbar";

export default function Schedule() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);

    useEffect(() => {
        dispatch(getSchedule());
    }, []);


    const handleDelete = () => {
        dispatch(deleteteSchedule(scheduleToDelete));
        setShowModal(false);
        toast.success(`Successfully deleted schedule ${scheduleToDelete?.id}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (schedule) => {
        setScheduleToDelete(schedule);
        console.log(schedule)
        setShowModal(true);
    };

    const schedule = useSelector(state => state.schedule);
    const scheduleData = schedule?.schedule
    return (
        <>
             
            <DeleteModal
                show={showModal}
                onHide={handleCloseModal}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete schedule number ${scheduleToDelete?.id}?`}
            />
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar schedule="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side schedule-page">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Schedule</h3>
                                <Link to="/add-schedule" className="btn btn-secondary btn-lg fs-17"><i className="fa-solid fa-plus" /><span className="ms-2">Add Schedule</span></Link>
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Showing {scheduleData?.length} Entries</h5>


                                {/* <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search for schedule" aria-label="Search for schedule" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                                </div> */}
                            </div>

                            {/* Data Table */}
                            <div className="table-div overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Schedule ID</th>
                                            <th scope="col">Sunday</th>
                                            <th scope="col">Monday</th>
                                            <th scope="col">Tuesday</th>
                                            <th scope="col">Wednesday</th>
                                            <th scope="col">Thursday</th>
                                            <th scope="col">Friday</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        {
                                            scheduleData.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        {
                                                            data.days.map((days) => <td>{days}</td>)
                                                        }
                                                        <td><button className="btn p-0" onClick={() => handleShowModal(data)} ><i className="fa-solid fa-trash-can del" /></button>
                                                            <Link to={`/schedule/edit-schedule/${data.id}`} ><i className="fa-regular fa-pen-to-square edit" /></Link> </td>
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