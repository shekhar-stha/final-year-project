import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import  { toast } from "react-toastify";
import { deleteDiet, getDiet, updateDiet } from "../../../store/slices/diet/dietSlice";
import { getNotice } from "../../../store/slices/notice/noticeSlice";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import DeleteModal from "../../components/modals/DeleteModal";
import EditDiet from "../../components/modals/diet/EditDiet";
import Tabbar from "../../components/tabbar/Tabbar";

export default function Diet() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiet());
    }, []);
    const diet = useSelector(state => state.diet);
    const dietData = diet?.diet


    // Delete Modal
    const [showDelete, setShowDelete] = useState(false);
    const [dietToDelete, setDietToDelete] = useState(null);

    const handleShowDelete = (diet) => {
        setDietToDelete(diet);
        console.log(diet)
        setShowDelete(true);
    };

    const handleDelete = () => {
        dispatch(deleteDiet(dietToDelete));
        setShowDelete(false);
        toast.success(`Successfully deleted ${dietToDelete?.diet_type}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    const searchProducts = () =>{
        
    }
    return (
        <>
             
            <DeleteModal
                show={showDelete}
                onHide={handleCloseDelete}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete ${dietToDelete?.diet_type} no ${dietToDelete?.id}?`}
            />

            {/* <EditDiet
                show={showEdit}
                onHide={handleCloseEdit}
                onConfirm={handleEdit}
                currentData={dietToUpdate}
            /> */}
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar diet="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side diet-page">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Diet</h3>
                                <Link to="/add-diet" className="btn btn-secondary btn-lg fs-17"><i className="fa-solid fa-plus" /><span className="ms-2">Add New Diet</span></Link>
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Showing {dietData?.length} Entries</h5>
                            </div>

                            {/* Data Table */}
                            <div className="table-div three-actions overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Diet ID</th>
                                            <th scope="col">Diet Type</th>
                                            <th scope="col">Meal 1</th>
                                            <th scope="col">Meal 2</th>
                                            <th scope="col">Meal 3</th>
                                            <th scope="col">Meal 4</th>
                                            <th scope="col">Meal 5</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        {
                                            dietData.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        <td>{data.diet_type}</td>
                                                        {
                                                            data.meal.map((meal) => <td>{meal}</td>)
                                                        }
                                                        <td><p style={{width: '150px'}} className="text-truncate">{data.description}</p></td>
                                                        <td>
                                                            <button className="btn p-0" onClick={() => handleShowDelete(data)} ><i className="fa-solid fa-trash-can del" /></button>
                                                            <Link to={`/diet/edit/${data.id}`} ><i className="fa-regular fa-pen-to-square edit" /> </Link>
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