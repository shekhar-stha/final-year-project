import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
    return (
       <>
        <Link className='btn btn-secondary'  to="/login">Login Again</Link>
        <div className='unauthorized'>
            <img src='https://cdn.asparksys.com/medias/1677386590389.webp' alt='' />
        </div>
       </>
    )
}