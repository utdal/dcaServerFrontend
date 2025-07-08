import ResetIcon from '../reset.png';
import DownloadIcon from '../download.png';
import SelectIcon from '../selection.png';
import ClickIcon from '../hand-pointer.png';
import * as d3 from "d3";

export function addUIIcons(svg, x, y, width, height, margin, tooltip, zoomTransformRef, setIsSelectMode, isSelectMode, svgRef, zoomRef) {
  const resetX = width - margin.right - 20;
  const resetY = margin.top + 20;

  const uiGroup = svg.append("g").attr("class", "ui-icons");

  function showTooltip(text, posX, posY) {
    tooltip.innerHTML = text;
    tooltip.style.opacity = 0.5;
    tooltip.style.left = `${window.scrollX + posX}px`;
    tooltip.style.top = `${window.scrollY + posY}px`;
  }

  function hideTooltip() {
    tooltip.style.opacity = 0;
  }

  function renderIcon({ cx, cy, image, title, onClick }) {
    uiGroup.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", 10)
      .attr("fill", "white")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("click", onClick)
      .on("mouseover", () => showTooltip(title, cx + svg.node().getBoundingClientRect().left + 10, cy + svg.node().getBoundingClientRect().top - 30))
      .on("mouseout", hideTooltip);

    uiGroup.append("image")
      .attr("x", cx - 7.5)
      .attr("y", cy - 7.5)
      .attr("width", 15)
      .attr("height", 15)
      .attr("pointer-events", "none")
      .attr("href", image);
  }

  renderIcon({
    cx: resetX,
    cy: resetY,
    image: ResetIcon,
    title: "Reset Zoom",
    onClick: () => {
      svg.transition().duration(750).call(zoomRef.current.transform, d3.zoomIdentity);
      zoomTransformRef.current = d3.zoomIdentity;
    }
  });

  const downloadX = resetX - 40;
  const downloadY = resetY;

  function downloadPNG() {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const uiGroupEl = svgElement.querySelector(".ui-icons");
    if (uiGroupEl) uiGroupEl.style.display = "none";

    document.fonts.ready.then(() => {
      const clone = svgElement.cloneNode(true);

      const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
      style.textContent = `
        .graph-title, .axis {
          font-size: 20px;
          font-weight: bold;
          fill: #333;
          font-family: Helvetica;
        }
        .axis {
          font-size: 16px;
        }
        .scale-graph {
          font-size: 12px;
        }
      `;

      clone.insertBefore(style, clone.firstChild);

      const svgString = new XMLSerializer().serializeToString(clone);
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const scale = 5;
        const canvas = document.createElement("canvas");
        canvas.width = svgElement.clientWidth * scale;
        canvas.height = svgElement.clientHeight * scale;

        const context = canvas.getContext("2d");
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "graph.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);

        if (uiGroupEl) uiGroupEl.style.display = null;
      };

      img.onerror = (e) => {
        console.error("Image load error:", e);
        if (uiGroupEl) uiGroupEl.style.display = null;
      };

      img.src = url;
    });
  }



  renderIcon({
    cx: downloadX,
    cy: downloadY,
    image: DownloadIcon,
    title: "Download Image",
    onClick: downloadPNG,
  });
  if(setIsSelectMode){
    const toggleX = resetX - 80;
    const toggleY = resetY;

    renderIcon({
      cx: toggleX,
      cy: toggleY,
      image: isSelectMode ? ClickIcon : SelectIcon,
      title: isSelectMode ? "Move Around" : "Select Points",
      onClick: () => setIsSelectMode(prev => !prev),
    });
  }
}