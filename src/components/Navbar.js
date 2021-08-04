import React, { useContext } from 'react';
import { AuthContext } from '../App.js';
import styled from "styled-components";
import {
  NavLink
} from "react-router-dom";
import {FaHotel} from 'react-icons/fa';

const activeClassName = 'nav-item-active'

const VerticalBar = styled.aside`
  box-shadow: 13px 3px 40px #00000005;
  background-color: white;
  color: #799283;
  font-size: 18px;
  width: 18%;
  font-family: 'Poppins'
`;

const NavWrapper = styled.div `
  position: sticky;
  top:0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
`;

const LogoTitle = styled.div `
  width: 67%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: black;
    font-size: 24px;
  }
  p {
    color: #5D5449;
    font-size: 10px;
    font-family: 'Poppins', sans-serif;
  }
`;

const StyledNav = styled.nav`
  width: 100%;
  margin-top: 10%;
  flex: 1;
`;

const StyledList = styled.li `
  height: 60px;
  line-height: 60px;
  font-size: 18px;
`;

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;
  color: #799283;
  height: 100%;
  width: 100%;
  display:flex;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Poppins', sans-serif;
  &.${activeClassName} {
    color: red;
    font-weight:bold;
    border-left: 3px solid red;
  }
`;

const Contact = styled.div `
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-arround;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
  font-size: 12px;
  width: 80%;
  h3 {
    font-size: 16px;
    color: black;
  }
`

const Picture = styled.div `
  width: 55px;
  height: 55px;
  background: #C5C5C5;
  border-radius: 8px;
  position: relative;
  top: 22px;
  
`
const StyledButton = styled.button `
  padding: 14px 40px;
  background: #EBF1EF;
  border-radius: 8px;
  border: none;
  margin-top: 16px;
`

const PFooter = styled.div `

  color: #212121;
  font-size: 14px;
  width: 80%;
    p {
      font-size: 12px;
    }
`

const MB = styled.p `

  margin-top: 40px;
  color: #799283;
  font-size: 14px;
  `

export default function Navbar(props) {
  
  function HandleTitle(name) {
    props.handleTitle(name)
  }
    

  const value = useContext(AuthContext);
  
  return (
    <>
    <VerticalBar>
      <NavWrapper>
      
        <LogoTitle>
          <FaHotel size={32} color={'#135846'} />
          <div>
            <h1>travl</h1>
            <p>Hotel Admin Dashboard</p>
          </div>
        </LogoTitle>
        
        {value ?
        <>     
          <StyledNav>
            <ul>
              <StyledList><StyledNavLink to="/dashboard" onClick={()=> HandleTitle("Dashboard")}><span className="material-icons"> dashboard </span>Dashboard</StyledNavLink></StyledList>

              <StyledList><StyledNavLink to="/roomlist" onClick={()=> HandleTitle("Room List")}><span className="material-icons"> vpn_key </span>Rooms</StyledNavLink></StyledList>

              <StyledList><StyledNavLink to="/booking" onClick={()=> HandleTitle("Booking")}><span className="material-icons"> event_note </span>Booking</StyledNavLink></StyledList>
                
              <StyledList><StyledNavLink to="/conciergelist" onClick={()=> HandleTitle("Concierge List")}><span className="material-icons"> person_outline </span>Concierge</StyledNavLink></StyledList>
                
              <StyledList><StyledNavLink to="/reviews" onClick={()=> HandleTitle("Reviews")}><span className="material-icons"> grading </span>Reviews</StyledNavLink></StyledList>
                
            </ul>
          </StyledNav>
          <Picture></Picture>
          <Contact>
            <h3>Benoit Laguerre</h3>
            <p>be.laguerre@gmail.com</p>
            <StyledButton>Edit</StyledButton>
          </Contact>
        </>
        : <StyledNav>
            <ul>
              <StyledList><StyledNavLink to="/login"><span className="material-icons">
              login</span>Login</StyledNavLink></StyledList>
              
              <StyledList><StyledNavLink to="/register"><span className="material-icons">
              app_registration </span>Register</StyledNavLink></StyledList>
             
            </ul>
          </StyledNav>}

        <PFooter>
          <h4>Travl Hotel Admin Dashboard</h4>
          <p>© 2020 All Rights Reserved</p>
          <MB>Made by Benoit Laguerre</MB>
        </PFooter>
        
      
      </NavWrapper>
    </VerticalBar>
    </>
    
    
  );
}