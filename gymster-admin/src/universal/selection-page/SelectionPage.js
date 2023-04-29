import React from 'react'
import { Link } from 'react-router-dom'

export default function SelectionPage() {
  return (
    <div className='selection-page'>
      <Link to="/admin-dashboard">Admin</Link>
      <Link to="/trainer-dashboard">Trainer</Link>
      <Link to="/member-dashboard">Member</Link>
    </div>
  )
}
