import React from "react";
import styled from "styled-components";
import Disconnect from '../components/Disconnect';
import { IoMailOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { HiMenuAlt2 } from "react-icons/hi";

const BarWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
  flex: 1;
  box-shadow: 0px 3px 10px #00000005;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 1% 5% 1% 5%;
  @media (max-width: 930px) {
    width: 100vw;
    justify-content: normal;
    gap: 10%;
  }
  div {
    display:flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    h1 {
      font: 300 28px Poppins;
    }
    @media (max-width: 930px) {
      gap:0;
    }
  }
`
const HideMenu = styled(HiMenuAlt2) `
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`
const Mail = styled(IoMailOutline) `
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`
const Bell = styled(VscBell) `
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`

export default function HorizontalBar(props) {
  
  function hideMenu (){
    props.handleNavBar()
  }

  return (
    <>
    <BarWrapper>
      <div>
        <HideMenu  onClick={hideMenu} size={26}></HideMenu>
        <h1>{props.name}</h1>
      </div>
      <div>
        <Mail size={26} />
        <Bell size={26} />
        <Disconnect />
      </div>
    </BarWrapper>
    </>
  );
}