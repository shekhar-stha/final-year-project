import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMembers } from '../../../store/slices/members/memberSlice';
import { getDiet } from "../../../store/slices/diet/dietSlice";

export default function SelectDiet({ show, handleClose }) {
    const dispatch = useDispatch();
    const cancelRef = useRef(null);

    useEffect(() => {
        dispatch(getDiet())
        dispatch(getMembers())
    }, [])

    const userId = useSelector(state => state?.user?.user?.id)
    const diets = useSelector(state => state?.diet?.diet)

    const formik = useFormik({
        initialValues: {
            dietId: ''
        },
        onSubmit: values => {
            console.log(values);
            insertDiet()
        },
    });

    const insertDiet = async () => {
        try {
            await axios.patch(`/member/updateMember/${userId}`, formik.values)
            cancelRef.current.click();
            toast.success(`Successfully Updated Diet`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            console.log('success')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data , {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    return (
        <>
            <Modal dialogClassName='my-modal' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Diet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        {
                            diets.map((data) => {
                                return (
                                    <div key={data.id} className="form-check">
                                        <label className="form-check-label w-100 d-flex justify-content-between align-items-center" >
                                            <input className="form-check-input me-4 mb-4"
                                                type="radio"
                                                name="dietId"
                                                id="dietId"
                                                value={data.id}
                                                checked={formik.values.dietId === data.id}
                                                onChange={() => formik.setFieldValue("dietId", data.id)}
                                            />
                                            <table className="table border">
                                                <thead>
                                                    <tr className='table-dark'>
                                                    <th scope="col">Diet Type</th>
                                                        <th scope="col">Meal 1</th>
                                                        <th scope="col">Meal 2</th>
                                                        <th scope="col">Meal 3</th>
                                                        <th scope="col">Meal 4</th>
                                                        <th scope="col">Meal 5</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="overflow">
                                                    <tr>
                                                    <td>{data?.diet_type}</td>
                                                        <td>{data?.meal[0]}</td>
                                                        <td>{data?.meal[1]}</td>
                                                        <td>{data?.meal[2]}</td>
                                                        <td>{data?.meal[3]}</td>
                                                        <td>{data?.meal[4]}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </label>
                                    </div>
                                )
                            })
                        }
                        <div className='d-flex justify-content-end'>
                            <button ref={cancelRef} onClick={handleClose} className="btn btn-outline-primary fs-16 mt-4 me-3">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary fs-16 mt-4">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
