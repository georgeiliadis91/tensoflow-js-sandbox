export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction.bbox;
    const text = prediction.class;

    // Set styling
    ctx.strokeStyle = "blue";
    ctx.font = "18px Arial";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
