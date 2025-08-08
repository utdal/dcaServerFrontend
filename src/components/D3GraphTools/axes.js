import * as d3 from "d3";
export function drawAxes(svg, x, y, width, height, margin) {
  svg.append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "scale-graph x")
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "scale-graph y")
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("class", "axis")
    .text("Steps");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90)`)
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("class", "axis")
    .text("Hamiltonian");
}


function makeXGridlines(scale) {
  return d3.axisBottom(scale)
    .tickValues(d3.range(
      Math.ceil(scale.domain()[0] / 100) * 100,
      Math.floor(scale.domain()[1] / 100) * 100 + 1,
      100
    ));
}

function makeYGridlines(scale) {
  return d3.axisLeft(scale)
    .tickValues(d3.range(
      Math.ceil(scale.domain()[0] / 20) * 20,
      Math.floor(scale.domain()[1] / 20) * 20 + 1,
      20
    ));
}

export function drawGrid(svg, x, y, width, height, margin) {
  const gridGroup = svg.append("g").attr("class", "grid-group");

  gridGroup.append("g")
    .attr("class", "grid-x")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(makeXGridlines(x)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat("")
    );

  gridGroup.append("g")
    .attr("class", "grid-y")
    .attr("transform", `translate(${margin.left},0)`)
    .call(makeYGridlines(y)
      .tickSize(-(width - margin.left - margin.right))
      .tickFormat("")
    );

  return gridGroup;
}