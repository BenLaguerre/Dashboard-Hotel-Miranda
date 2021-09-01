import React, { useState, useEffect, useRef} from 'react';
import * as d3 from "d3";

export default function ReservationChart() {
  const [dataset, setDataset] = useState([50, 12, 25, 30, 9, 42, 70])
  const [dataset2, setDataset2] = useState([24, 75, 8, 51,32, 27, 22])
  const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
  const  ref = useRef();

  function test(text){
    console.log(text)
  }
  useEffect (() => {

    let width = 500;
    let height = 300;
    let xHeight = 280;
    let svg = d3.select(ref.current)
                .attr("width", width)
                .attr("height", height);
               

    const xScale = d3.scaleBand()
      .domain(days)
      .range([26,500])
    svg
      .append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate (${0},${xHeight-20})`);

    const yScale = d3.scaleLinear()
      .domain([0, 80])
      .range([ xHeight-20, 10])
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .attr("transform", 'translate (26,0)');



    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i *  xScale.bandwidth() + xScale.bandwidth()/2 + 8 )
      .attr("y", d => xHeight- 20 -  (d*3.25))
      .attr("width", 15)
      .attr("height", d => d*3.25 )
      .attr("fill", "#135846")
      .on("click",d => test(d) )

      .data(dataset2)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i *  xScale.bandwidth() + xScale.bandwidth()/2 + 29)
      .attr("y", d  => xHeight -20 - (d*3.25))
      .attr("width", 15)
      .attr("height", d => d*3.25 )
      .attr("fill", "red");
  })
    
    return (
    <svg
      ref={ref}
      
      
    />
    
  )
}

