import React, { useContext } from 'react';
import { AuthContext } from '../App.js';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdVpnKey, MdEventNote } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { BiMessageCheck } from "react-icons/bi";
import Logo from './Logo';

const activeClassName = 'nav-item-active'

const VerticalBar = styled.aside`
  box-shadow: 13px 3px 40px #00000005;
  background-color: white;
  color: #799283;
  width: 18%;
  min-height: 100vh;
  @media (max-width: 930px) {
    position: fixed;
    width: 100%;
  }
`
const NavWrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top:0;
`
const StyledNav = styled.nav`
  width: 100%;
  margin-top: 10%;
  flex: 1;
  ul {
    display:flex;
    flex-direction: column;
    align-items: center;
    li {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      width: 100%;
    }
  }
`
const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;
  color: #799283;
  height: 100%;
  width: 100%;
  display:flex;
  align-items: center;
  svg {
    flex: 0.5;
  }
  p {
    flex: 1;
  }
  &.${activeClassName} {
    color: red;
    font-weight:bold;
    border-left: 3px solid red;
  }
`
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
  button {
    padding: 14px 40px;
    background: #EBF1EF;
    border-radius: 8px;
    border: none;
    margin-top: 16px;
  }
  @media (max-width: 930px) {
    visibility: hidden;
  }
`
const Picture = styled.div `
  width: 55px;
  height: 55px;
  background: #C5C5C5;
  border-radius: 8px;
  position: relative;
  top: 22px;
  @media (max-width: 930px) {
    visibility: hidden;
  }
`
const PFooter = styled.div `
  color: #212121;
  font-size: 14px;
  width: 80%;
  p:nth-of-type(1) {
    font-size: 12px;
  }
  p:nth-of-type(2){
    margin-top: 40px;
    color: #799283;
    font-size: 14px;
  }
  @media (max-width: 930px) {
    visibility: hidden;
  }
`

export default function Navbar(props) {
  
  const value = useContext(AuthContext);

  function handleNavBar(){
    if (window.innerWidth <= 930){
      props.handleNavBar();
      document.body.classList.remove('noscroll');
    }
  }

  return (
    <>
    <VerticalBar>
      <NavWrapper>
        <Logo />
        <StyledNav>
          <ul>
            <li><StyledNavLink to="/dashboard" onClick={handleNavBar}><MdDashboard size={24} /><p>Dashboard</p></StyledNavLink></li>

            <li><StyledNavLink to="/roomlist" onClick={handleNavBar}><MdVpnKey size={24} /><p>Rooms</p></StyledNavLink></li>

            <li><StyledNavLink to="/booking" onClick={handleNavBar}><MdEventNote size={24} /><p>Bookings</p></StyledNavLink></li>
              
            <li><StyledNavLink to="/conciergelist" onClick={handleNavBar}><IoPersonSharp size={24}/><p>Concierges</p></StyledNavLink></li>
              
            <li><StyledNavLink to="/reviews" onClick={handleNavBar}><BiMessageCheck size={24}/><p>Reviews</p></StyledNavLink></li>
              
          </ul>
        </StyledNav>
        <Picture></Picture>
        <Contact>
          <h3>Benoit Laguerre</h3>
          <p>be.laguerre@gmail.com</p>
          <button>Edit</button>
        </Contact>
        <PFooter>
          <h4>Travl Hotel Admin Dashboard</h4>
          <p>© 2020 All Rights Reserved</p>
          <p>Made by Benoit Laguerre</p>
        </PFooter>
      </NavWrapper>
    </VerticalBar>
    </>
    
    
  );
}