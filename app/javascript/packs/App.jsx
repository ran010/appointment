import React from 'react'
import ReactDOM from 'react-dom'
import BookAppointment from './bookAppointment'
import './css/index.css'


document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('user_data');
  const userData = JSON.parse(node.getAttribute('data')) || {};
  ReactDOM.render(
    <BookAppointment userData={userData} />,
    document.body.appendChild(document.createElement('div')),
  )
})
