import React from 'react'

export default function NoticeBox(props) {
    return (
        <>
            <div key={props.key} className="notice-box border border-2 rounded-2 p-3 mb-3">
                <div className="row align-items-top">
                    <div className='col-1'>
                        <img className=' mb-1 img-fluid' src='https://cdn.asparksys.com/medias/1680545971496.jpg' alt='notice' />
                    </div>
                    <div className="col-8">
                        <h5 className="topic mb-1"> {props.topic}</h5>
                        <span className='fs-14'>{props.createdAt?.slice(0, 10)}</span>
                    </div>
                    <p data-bs-toggle="modal" data-bs-target="#notice" className="col-3 text-secondary cursor-pointer fs-16 text-end"><i class="cursor-pointer fa-regular fa-eye"></i></p>
                </div>
                <div className='row'>
                    <p className="description col-12">
                        {props.description}
                    </p>
                    {/* <img className='col-2 img-fluid' src='https://cdn.asparksys.com/medias/1680545971496.jpg' alt='notice' /> */}
                </div>

            </div>

            <div class="modal fade" id="notice" tabindex="-1" aria-labelledby="noticeLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="noticeLabel">{props.topic}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {props.description}
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
