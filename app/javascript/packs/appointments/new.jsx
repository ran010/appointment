import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function New({isLogin, userData}) {
  const [selectedDate, setSelectedDate] = useState('')
  const [bookTime, setBookTime] = useState('')
  const [availableAppointment, setAvailableAppointment] = useState([])
  let history = useHistory();

  const handleDateClick = () =>{
    axios.get(`/api/schedules/${selectedDate}`)
      .then((res) => {
        setAvailableAppointment(res.data)
      }).catch(() => {
    });
  }
  const createAppointment = () => {

    axios.post('/api/appointments', {
      time_slot_id: availableAppointment._id.$oid,
      user_id: userData._id.$oid,
      book_time: bookTime
    })
      .then(function (response) {
        setAvailableAppointment('');
        setBookTime('');
        setSelectedDate('');
        history.push("/appointments");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Container>
      <Row>
        <Col md={12}>
          <FullCalendar
            plugins={[ dayGridPlugin,interactionPlugin ]}
            selectable={true}
            customButtons= {
              {
                okButton: {
                  text: 'Ok!',
                  click: function () {
                    handleDateClick();
                  }
                },
                cancelButton: {
                  text: 'Cancel',
                  click: function () {
                    setSelectedDate('');
                  }
                }
            }}
            headerToolbar={{
              start: 'prev,next',
              center: 'title',
            }}
            footerToolbar={{
              right: 'cancelButton, okButton'
            }}
            initialView="dayGridMonth"
            dateClick={(arg)=> setSelectedDate(arg.dateStr)}
          />
        </Col>
        {(availableAppointment.available_time || []).length > 0 &&
        <Col md={12}>
          <h3>Available Time</h3>
          <br/>
          <Row>
            {(availableAppointment.available_time || []).map((time, key) => {
              return (<Col md={4} key={key}>
                        <Button variant="secondary" onClick={() => setBookTime(time)} className='mb-3'>{time}</Button>
                      </Col>)
            })}
            <br/>
            <Col md={12}>
              <div className='float-right'>
                {isLogin && <Button onClick={() => createAppointment()} >Book Appointment</Button>}
                {!isLogin && <a href='/users/sign_in'><Button color='primary' className='float-right'>Book Appointment</Button></a>}
              </div>
            </Col>
          </Row>
        </Col>
        }
      </Row>
    </Container>
  )
}