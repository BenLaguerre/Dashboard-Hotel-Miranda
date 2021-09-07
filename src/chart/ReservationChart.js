/*import React, { useState, useEffect, useRef} from 'react';
import * as d3 from "d3";

export default function ReservationChart() {
  const [checkInData, setCheckIn] = useState([50, 12, 25, 30, 9, 42, 40])
  const [checkOutData, setCheckOut] = useState([24, 26, 8, 19,32, 27, 22])
  const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
  const  ref = useRef();

  useEffect (() => {

    let width = 500;
    let height = 300;
    let xHeight = height - 30;
    let svg = d3.select(ref.current)
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

    const maxYAxis = d3.max([...checkInData,...checkOutData]) + 10;
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
      .attr("transform", 'translate (26,0)');

    // Handling Events
    function handleMouseOver(d, i) {  
      
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity',' 0.5')
        .attr('width', '25')
      // Specify where to put label of text
      svg.append("text")
        .attr('id','t'+  i  )
        .attr("x", d3.select(this).attr('x'))
        .attr("y", xHeight - (i*yRange) -5)
        .attr("font-family","Poppins")
        .attr("color","#135846")
        .text(i);
    }

    function handleMouseOut(d, i) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity',' 1')
        .attr('width', '15')
      // Select text by id and then remove
      d3.select('#t'+ i).remove();  // Remove text location
    }

    svg.selectAll("rect")
      .data(checkInData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i *  xScale.bandwidth() + xScale.bandwidth()/2 + 8 )
      .attr("y", d => xHeight -  (d*yRange))
      .attr("width", 15)
      .attr("height", d => d*yRange )
      .attr("fill", "#135846")
      .on('mouseenter', handleMouseOver)
      .on('mouseleave', handleMouseOut )

      
      .data(checkOutData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i *  xScale.bandwidth() + xScale.bandwidth()/2 + 29)
      .attr("y", d  => xHeight - (d*yRange))
      .attr("width", 15)
      .attr("height", d => d*yRange )
      .attr("fill", "red")
      .on('mouseenter', handleMouseOver)
      .on('mouseleave', handleMouseOut )

  })
    
    return (
    <svg
      ref={ref}
      
      
    />
    
  )
}*/

