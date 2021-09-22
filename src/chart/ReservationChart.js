import React, { useState, useEffect, useRef} from 'react';
import * as d3 from "d3";

export default function ReservationChart() {
  

  const [checkInData, setCheckIn] = useState([50, 12, 25, 30, 9, 42, 40])
  const [checkOutData, setCheckOut] = useState([24, 26, 8, 19,32, 27, 22])
  const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
  const  ref = useRef();

  //Get day
  let date = new Date()
  let weekday = date.toLocaleString("en-EN", { weekday: "long" })

  function orderWeekDays (){
    while (days[0] != weekday){
      let movedDay = days.shift();
      setDays(days.push(movedDay))
    }
  }

  useEffect (() => {
    orderWeekDays ()
    let width = 500;
    let height = 400;
    let xHeight = height - 30;
    let svg = d3.select(ref.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height);
               
    //X and Y axis
    const xScale = d3.scaleBand()
      .domain(days)
      .range([26,500])
    svg
      .append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate (${0},${xHeight})`);

    const maxYAxis = d3.max([...checkInData,...checkOutData]) + 5;
    const yScale = d3.scaleLinear()
      .domain([0, maxYAxis])
      .range([xHeight, 10])
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .attr("transform", 'translate (26,0)');

    const yRange = (xHeight-10)/maxYAxis;

    //Append background horizontal lines
    svg.append('g') 
      .attr('class', 'grid')
      .call(d3.axisLeft() 
      .scale(yScale) 
      .tickSize(-width, 0, 0) 
      .tickFormat('')) 
      .attr("transform", 'translate (26,0)')
      .attr('color','#EEE');

    // Tooltip
    var Tooltip = d3.select(ref.current)
      .append("div")
      .style('position','relative')
      .style("visibility", 'hidden')
      .style("background-color", "white")
      .style("width", '80px')
      .style("height", '50px')
      .style("box-shadow","0px 8px 30px #00000012")
      .style("border-radius", "5px")
      .style("border", "solid 1px")
      .style("padding", "5px")
      

    // Handling Events
    var mouseover = function(d) {
      Tooltip
        .style("visibility", 'visible')
      d3.select(this)
        .style("stroke", "black")
    }
    
    var mouseleave = function(d) {
      Tooltip
        .style("visibility", 'hidden')
      d3.select(this)
        .style("stroke", "none")
    }

    svg.selectAll()
      .data(checkInData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i *  xScale.bandwidth() + xScale.bandwidth()/2 + 8 )
      .attr("y", d => xHeight -  (d*yRange))
      .attr("width", 15)
      .attr("height", d => d*yRange )
      .attr("fill", "#135846")
      .on("mouseover", mouseover)
      .on("mousemove", (event, i) => {
        Tooltip
        .html("Check In: " + i)
        .style("visibility", 'visible')
        .style("left", (d3.pointer(event)[0]) + "px")
        .style("top", (d3.pointer(event)[1])-400 + "px")
      })
      .on("mouseleave", mouseleave)

    svg.selectAll()  
      .data(checkOutData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i *  xScale.bandwidth() + xScale.bandwidth()/2 + 29)
      .attr("y", d  => xHeight - (d*yRange))
      .attr("width", 15)
      .attr("height", d => d*yRange )
      .attr("fill", "red")
      .on("mouseover", mouseover)
      .on("mousemove", (event, i) => {
        Tooltip
        .html("Check Out: " + i)
        .style("visibility", 'visible')
        .style("left", (d3.pointer(event)[0]) + "px")
        .style("top", (d3.pointer(event)[1])-400 + "px")
      })
      .on("mouseleave", mouseleave)

  
  },[checkInData])
    
  return (
    <div ref={ref} />
      
  )
}

