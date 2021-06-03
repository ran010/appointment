import React, {useState} from 'react'
import {Container, Row, Col, Input, Button} from 'reactstrap';
import axios from 'axios';

export default function Edit({userData}) {
  const [schedules ,setSchedules] = useState([])
  const handleInputChange = (event) => {
    setTimeout(function(){
      if(event.target.value != undefined){
        axios.get(`/api/schedules?time_block=${event.target.value}`)
          .then((res) => {
            setSchedules(res.data)
          }).catch(() => {
        });
      }
    }, 1500);
  }
  const weekDays={1: 'Sunday', 2: 'Monday',3: 'Tuesday', 4: 'Wednesday', 5: 'Thursday', 6: 'Friday', 0: 'Saturday'}
  const getHourMinutesFromDate= (date) =>{
    let newDate = new Date(date)
    let currentHours = ("0" + (newDate.getHours() % 12 || 12)).slice(-2);
    let currentMinutes = ("0" + newDate.getMinutes()).slice(-2);
    return [currentHours, currentMinutes]
  }

  const getDayFromDate = (date) =>{
    let newDate = new Date(date)
    return weekDays[newDate.getDay()]
  }
  return (
    <Container>
      <Row>
        <h1 className="my-3">Appointment Time Block(in minutes)</h1>
        <Input name="appointmentTime" onChange={(event)=>handleInputChange(event)} />
        {schedules.length > 0 &&
        <Col md={12}>
          <h2 className="my-3">Availability</h2>
          <hr/>
          <ul>
            {schedules.map((time, key) => {
              let openTime = getHourMinutesFromDate(time.open_time)
              let closeTime = getHourMinutesFromDate(time.close_time)
              return (<li key={key} className="my-4">
                <h5>{getDayFromDate(time.date)}</h5>
                <Button variant="secondary">{openTime[0]}:{openTime[1]} AM</Button> - <Button variant="secondary">{closeTime[0]}:{closeTime[1]} PM</Button>
              </li>)
            })}
          </ul>
        </Col>
        }
      </Row>
    </Container>
  )
}