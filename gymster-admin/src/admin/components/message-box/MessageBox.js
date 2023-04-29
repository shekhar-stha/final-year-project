import React from 'react'

export default function MessageBox(props) {
    return (
        <>
            <div key={props.key} className="notice-box border border-2 rounded-2 p-3 mb-3">
                <div className="row align-items-top">
                    <div className='col-1'>
                        <img className=' mb-1 img-fluid' src='https://cdn.asparksys.com/medias/1681813837930.jpg' alt='notice' />
                    </div>
                    <div className="col-8">
                        <h5 className="fs-18 mb-1"> {props.name}</h5>
                        <p className="fs-16 fw-500 mb-1"> {props.number}</p>
             
                    </div>
                    <p data-bs-toggle="modal" data-bs-target="#notice" className="col-3 text-secondary cursor-pointer fs-16 text-end"><i class="cursor-pointer fa-regular fa-eye"></i></p>
                </div>
                <div className='row'>
                    <p className="description col-12 fs-15">
                        {props.message}
                    </p>
                    <span className='fs-14 text-end'>{props.createdAt?.slice(0, 10)}</span>
                </div>

            </div>

            <div class="modal fade" id="notice" tabindex="-1" aria-labelledby="noticeLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="noticeLabel">{props.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        {props.message}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
