import React , { useEffect, useState } from "react";
import styled from "styled-components";
import { IoBedOutline } from "react-icons/io5";
import { RiCalendarCheckLine } from "react-icons/ri";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import Calendar from './Calendar';
import ReservationChart from "../chart/ReservationChart";
import { BsSquareFill } from "react-icons/bs";

const DashWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  column-gap: 40px;
` 
const KpiWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  width: 100%;
  gap: 40px;
` 
const KPI = styled.div `
  background: white;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1.5%;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;
  &:hover 
    {
      box-shadow: 0px 16px 30px #00000014;
    }
`
const Bed = styled(IoBedOutline) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
      background: #E23428;
  }
`
const Booking = styled(RiCalendarCheckLine) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
      background: #E23428;
  }
`
const Login = styled(BiLogIn) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
      background: #E23428;
  }
`
const Logout = styled(BiLogOut) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
    background: #E23428;
  }
`
const Number = styled.div `
  flex: 1;
  margin-left: 8%;
  h2 {
    color: #393939;
    font-size: 30px;
    margin-bottom: -10px;
  }
  p {
    color: #787878;
    font-size: 14px;
  }
`
const CalendarWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0px 4px 4px #00000005;
  flex:1;
  display:flex;
  flex-direction: column;
  align-items:center;
  border-radius: 20px;
  background: white;
  h3 {
    margin-bottom: 30px;
    color: #393939;
    font-size: 20px;
    align-self: flex-start;
    font-weight: normal;
  }
  h2 {
    margin: 30px 0 30px 20px;
    color: #393939;
    font-size: 20px !important;
    align-self: flex-start;
    font-weight: normal;
  }
  div {
    div { 
      .fc-toolbar-chunk div {
        display: flex;
        button:nth-of-type(1),button:nth-of-type(2) {
          padding: 0 !important;
          background-color: white !important;
          border:none !important;
          color: #135846 !important;
          border-radius: 5px !important;
          &:focus {
            box-shadow:none !important;
          }
        }
        h2 { 
          width: 170px;
          min-width: 30%;
          text-align: center;
        }
      }
      button {
        background-color: #135846 !important;
        border:none !important;
        border-radius: 12px !important;
        &:hover {
          opacity: 0.8;
          box-shadow:none !important;
        }
        &:focus {
          box-shadow:none !important;
        }
      }
    }
  }
  table {
    border: none !important;
    .fc-col-header-cell-cushion  {
      font-weight: normal;
      color: #799283;
      margin-bottom: 20px;
    }
    td {
      border: none;
      div {
        min-height: none !important;
      }
    }
    th {
      border: none;
      padding-bottom: 15px;
    }
    .fc-daygrid-day-events {
      margin: 0 !important;
      
    }
  }
`
const ChartWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0px 4px 4px #00000005;
  flex:1;
  display:flex;
  flex-direction: column;
  align-items:center;
  border-radius: 20px;
  background: white;
  h3 {
    margin-bottom: 30px;
    color: #393939;
    font-size: 20px;
    align-self: flex-start;
    font-weight: normal;
  }
  svg g {
    font-family: 'Poppins';
    font-size: 12px;
    opacity: 0.5;
  }
`
const Legend = styled.div`
  width: 50%;
  align-self: flex-start;
  display: flex;
  margin-bottom: 30px;
  p {
    flex:1;
  }
`
export default function Dashboard({title}) {

  const [activeDate, setDate] = useState([new Date('09/11/2021'), new Date('09/13/2021')]);
  
  const changeDate = (e) => {
    setDate(e)
  }
  
  useEffect(() => {
    title("Dashboard")
  }, [title]); 

  return (
    <>
    <DashWrapper>
      <KpiWrapper>
        <KPI><Bed size={32} /><Number><h2>61</h2><p>New Bookings</p></Number></KPI>
        <KPI><Booking size={32} /><Number><h2>33</h2><p>Scheduled Room</p></Number></KPI>
        <KPI><Login size={32} /><Number><h2>23</h2><p>Check In</p></Number></KPI>
        <KPI><Logout size={32} /><Number><h2>18</h2><p>Check Out</p></Number></KPI>
      </KpiWrapper>
      <CalendarWrapper>
        <h3>Recent Booking Schedule</h3>
        <Calendar
          
        />
        <div>

        </div>
      </CalendarWrapper>
      <ChartWrapper>
        <h3>Reservation Stats</h3>
        <Legend>
          <p><BsSquareFill color={'#135846'}/> Check In</p>
          <p><BsSquareFill color={'#ff0000'}/> Check Out</p>
        </Legend>
        <ReservationChart />
      </ChartWrapper>
      
      
    </DashWrapper>
    </>
  );
}