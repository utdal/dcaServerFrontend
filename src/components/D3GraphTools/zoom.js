import * as d3 from "d3";

export function setupZoom(svg, x, y, zoomGroup, zoomTransformRef, margin, isSelectMode, zoomRef, onZoomUpdate) {
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const xAxisGroup = svg.select(".scale-graph.x");
  const yAxisGroup = svg.select(".scale-graph.y");

  
  const gridGroup = svg.select(".grid-group");
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

    function zoomed(event) {
      const transform = event.transform;
      zoomTransformRef.current = transform;

      const zx = transform.rescaleX(x);
      const zy = transform.rescaleY(y);
      xAxisGroup.call(d3.axisBottom(zx));
      yAxisGroup.call(d3.axisLeft(zy));
      gridGroup.selectAll("*").remove();


      gridGroup.append("g")
        .attr("class", "grid-x")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(makeXGridlines(zx)
          .tickSize(-(height - margin.top - margin.bottom))
          .tickFormat("")
        );

      gridGroup.append("g")
        .attr("class", "grid-y")
        .attr("transform", `translate(${margin.left},0)`)
        .call(makeYGridlines(zy)
          .tickSize(-(width - margin.left - margin.right))
          .tickFormat("")
        );

      zoomGroup.selectAll("path")
        .attr("d", d3.line()
          .x(d => zx(d.step))
          .y(d => zy(d.hamiltonian)));

      zoomGroup.selectAll("circle")
        .attr("cx", d => zx(d.step))
        .attr("cy", d => zy(d.hamiltonian));

    }

    const zoom = d3.zoom()
      .scaleExtent([1, 10000])
      .translateExtent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .filter((event) => !isSelectMode)
      .on("zoom", zoomed)

    svg.call(zoom).call(zoom.transform, zoomTransformRef.current);
    zoomRef.current = zoom;

  }