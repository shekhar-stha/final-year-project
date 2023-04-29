import React from 'react'

export default function TrainerScheduleTable(props) {
    return (
        <div className={(props.class) + " table-div"}>
            <h4 className="fs-20 fw-600 text-secondary mb-3">Todays Schedule</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">{props.schedule}</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
