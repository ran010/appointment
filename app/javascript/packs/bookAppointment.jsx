import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Container,Row, Col} from 'react-bootstrap'
import Appointment from './appointments'
import NewAppointment from './appointments/new'
import EditAppointment from './schedules/edit'
import axios from "axios";

export default function BookAppointment({userData}) {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() =>{
    if (Object.keys(userData).length > 0){
      setIsLogin(true)
    }
  })
  const handleLogout = () => {
    axios({
      method: 'delete',
      url: '/users/sign_out',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      window.location.href = '/users/sign_in';
    });
  }

  return (
    <Router>
      <Container className="mt-4">
        <Row>
          {isLogin && (
            <Col md={3}>
              <ul>
                <li className='m-3'>
                  <h5><Link to="/appointments/new">New Appointment</Link></h5>
                </li>
                <li className='m-3'>
                  <h5><Link to={`/schedule/${userData._id.$oid}/edit`}>Edit Schedule</Link></h5>
                </li>
                <li className='m-3'>
                  <h5><Link to="/appointments">Appointment</Link></h5>
                </li>
                <li className='m-3'>
                  <h5 className='cursor-pointer'><div onClick={() => handleLogout()}>Logout</div></h5>
                </li>
              </ul>
            </Col>
          )}

          <Col md={isLogin ? 9 : 12 }>
            <Switch>
              <Route path="/appointments/new">
                <NewAppointment isLogin={isLogin} userData={userData}/>
              </Route>
              {isLogin && (
                <>
                  <Route path="/schedule/:id/edit">
                    <EditAppointment userData={userData}/>
                  </Route>
                  <Route path="/appointments">
                    <Appointment userData={userData} />
                  </Route>
                </>
              )}
            </Switch>
          </Col>
        </Row>
      </Container>

    </Router>
  );
}
