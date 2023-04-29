import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getMembers } from '../../../store/slices/members/memberSlice';
import { getSchedule } from "../../../store/slices/schedule/scheduleSlice";

export default function SelectSchedule({ show, handleClose }) {
    const dispatch = useDispatch();
    const cancelRef = useRef(null);

    useEffect(() => {
        dispatch(getSchedule())
        dispatch(getMembers())
    }, [])

    const userId = useSelector(state => state?.user?.user?.id)
    const schedules = useSelector(state => state?.schedule?.schedule)

    const formik = useFormik({
        initialValues: {
            memberScheduleId: ''
        },
        onSubmit: values => {
            insertSchedule()
        },
    });

    const insertSchedule = async () => {
        try {
            await axios.patch(`/member/updateMember/${userId}`, formik.values)
            cancelRef.current.click();
            toast.success(`Successfully Updated Schedule`, {
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
                    <Modal.Title>Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        {
                            schedules.map((data) => {
                                return (
                                    <div key={data.id} className="form-check">
                                        <label 
                                        className="form-check-label w-100 d-flex justify-content-between align-items-center"
                                        htmlFor={data?.id}
                                        >
                                            <input className="form-check-input me-4 mb-4"
                                                type="radio"
                                                name="memberScheduleId"
                                                id={data?.id}
                                                value={data.id}
                                                checked={formik.values.memberScheduleId === data.id}
                                                onChange={() => formik.setFieldValue("memberScheduleId", data.id)}
                                                onBlur={formik.handleBlur}
                                            />
                                            <table className="table border">
                                                <thead>
                                                    <tr className='table-dark'>
                                                        <th scope="col">Sunday</th>
                                                        <th scope="col">Monday</th>
                                                        <th scope="col">Tuesday</th>
                                                        <th scope="col">Wednesday</th>
                                                        <th scope="col">Thursday</th>
                                                        <th scope="col">Friday</th>

                                                    </tr>
                                                </thead>
                                                <tbody className="overflow">
                                                    <tr>
                                                        <td>{data?.days[0]}</td>
                                                        <td>{data?.days[1]}</td>
                                                        <td>{data?.days[2]}</td>
                                                        <td>{data?.days[3]}</td>
                                                        <td>{data?.days[4]}</td>
                                                        <td>{data?.days[5]}</td>

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
