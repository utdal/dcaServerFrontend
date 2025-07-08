import * as d3 from "d3";

export function createScales(data, width, height, margin, arbitraryMinOffsetX, arbitraryMaxOffsetX, arbitraryMinOffsetY, arbitraryMaxOffsetY) {
  const x = d3.scaleLinear()
    .domain([
      Math.min(d3.min(data, d => d.step)) + arbitraryMinOffsetX,
      d3.max(data, d => d.step) + arbitraryMaxOffsetX,
    ])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([
      d3.min(data, d => d.hamiltonian) + arbitraryMinOffsetY,
      d3.max(data, d => d.hamiltonian) + arbitraryMaxOffsetY,
    ])
    .range([height - margin.bottom, margin.top]);

  return { x, y };
}