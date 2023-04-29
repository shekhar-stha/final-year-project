import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import SelectDiet from "../../components/modals/SelectDiet";
import Tabbar from "../../components/tabbar/Tabbar";

export default function Diet() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [diet, setDiet] = useState()

    const userId = useSelector(state => state?.user?.user?.id)

    const fetchDiet = async () => {
        try {
            const response = await axios.get(`/member/get-member-with-diet/${userId}`)
            setDiet(response?.data?.gym_member?.diet)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDiet()
    }, [show])
    console.log(diet)
    return (
        <>
             
            <SelectDiet show={show} handleClose={handleClose} /> 
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar diet="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side diet-page">
                            {/* 1 */}
                            <h3 className="mb-3 text-secondary">Diet</h3>
                            <hr />
                            <button onClick={handleShow} className="btn ms-auto d-flex btn-secondary">Change Diet</button>
                            {/* Data Table */}
                            <div className="table-div three-actions overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Diet Type</th>
                                            <th scope="col">Meal 1</th>
                                            <th scope="col">Meal 2</th>
                                            <th scope="col">Meal 3</th>
                                            <th scope="col">Meal 4</th>
                                            <th scope="col">Meal 5</th>
                                            <th scope="col">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        <tr>
                                            <td>{diet?.diet_type}</td>
                                            {
                                                diet?.meal?.map((data) => {
                                                    return (
                                                        <td>{data}</td>
                                                    )
                                                })
                                            }
                                            <td>{diet?.description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}