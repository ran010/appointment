import React, {lazy, useEffect, useState} from 'react'
import {Container, Table, Col, Input} from 'react-bootstrap';
import axios from 'axios';

export default function Index({userData}) {
  const [appointments, setAppointments] = useState([])
  useEffect(()=> {
    axios.get('/api/appointments')
      .then((res) => {
        setAppointments(res.data)
      }).catch(() => {
    });
  },[])

  const deleteAppointment = (id) => {
    axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        if(res.status == 200){
          setAppointments(appointments.filter(x=>x._id.$oid != id))
        }
      }).catch(() => {
    });
  }

  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th>Date/Time</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {appointments.map((data, key) => {
          return (
            <tr key={key}>
              <td><p>{data.time_slot.schedule.date}</p>
                    <p>{data.book_time}</p></td>
              <td>{data.user.first_name}</td>
              <td>{data.user.first_name}</td>
              <td class="cursor-pointer" onClick={() => deleteAppointment(data._id.$oid)}>Delete</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </Container>
  )
}