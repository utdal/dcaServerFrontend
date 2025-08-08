export function setupTooltip(tooltipRef) {
  if (tooltipRef.current) return tooltipRef.current;

  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.pointerEvents = "none";
  tooltip.style.background = "rgba(0,0,0,0.7)";
  tooltip.style.color = "white";
  tooltip.style.padding = "6px 10px";
  tooltip.style.borderRadius = "4px";
  tooltip.style.fontSize = "12px";
  tooltip.style.opacity = 0;
  tooltip.style.transition = "opacity 0.2s ease";

  document.body.appendChild(tooltip);
  tooltipRef.current = tooltip;
  return tooltip;
}