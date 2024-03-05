import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Feedback from './Feedback';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Footer from '../../Components/Footer';
import NavBar from '../../Components/Navbar';
import { Box, Container, Typography, Paper } from '@mui/material';
import "../../App.css"

const EventDetailed = () => {
  const { id } = useParams();
  const jwtStudentToken = Cookies.get('student_token');
  const isStudentLoggedIn = jwtStudentToken ? true : false;
  const [detailedEvent, setDetailedEvent] = useState({});
  var decoded = {};
  if (jwtStudentToken) {
    decoded = jwtDecode(jwtStudentToken);
  }


  const loadEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/getSelectedEvent/${id}`);
      setDetailedEvent(response.data.event);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadEvent();
  }, [id]);

  return (
    <>
      <NavBar></NavBar>
      <Container className='eventDetailed' sx={{ marginTop: '100px' }}>
        <Typography variant="h4" component="div" sx={{ color: 'white', textAlign: 'center' }}>
          {detailedEvent.title}
        </Typography>
        {/* style={{ margin: '10px 160px' }}  */}
        <img className='detailed-image' src={detailedEvent.image} alt={detailedEvent.title}/>
        <Typography className='description' variant="body1" sx={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
          {detailedEvent.description}
        </Typography>
      </Container>
      <Feedback></Feedback>
      <Footer></Footer>
    </>
  )
}

export default EventDetailed