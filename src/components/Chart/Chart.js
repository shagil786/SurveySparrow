import React from "react";
import { maxArray } from "../../utils/generateData";

const Chart = ({
  svg_width,
  svg_height,
  range,
  data,
  minValue,
  stroke,
  fillPadding = 20,
  barRadius,
  description,
  labels,
  yAxisOffest = 100,
  xAxisOffest = 0
}) => {
  const x0 = range?.xRange[1] - range?.xRange[0] + yAxisOffest;
  const xAxisLength = svg_width - x0 * 2;
  const y0 = range?.yRange[1] - range?.yRange[0] + xAxisOffest;
  const yAxisLength = svg_height - y0 * 2;

  const xAxisY = y0 + yAxisLength;
  const yData = data?.map((each) => each?.y);
  const dataMin = minValue,
    dataMax = maxArray(yData);
  const dataYRange = dataMax - dataMin;
  const barPlotWidth = xAxisLength / data?.length;

  return (
    <svg width={svg_width} height={svg_height}>
      {/* x axis */}
      <line
        x1={x0}
        y1={xAxisY}
        x2={x0 + xAxisLength}
        y2={xAxisY}
        stroke={stroke}
      />
      {/* y axios */}
      <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke={stroke} />
      {/* x labels */}
      {labels?.x?.map((each, index) => {
        const x = x0 + index * barPlotWidth + barPlotWidth / 2;
        return (
          <text
            data-type="x"
            key={`${index}_${each}`}
            x={x}
            y={xAxisY + 20}
            textAnchor="middle"
            className="labels"
          >
            {each}
          </text>
        );
      })}
      {/* y Labels */}
      {labels?.y?.map((each, index) => {
        const y = xAxisY - index * (yAxisLength / (labels.y.length - 1));
        return (
          <text
            data-type="y"
            key={`${index}_${each}`}
            x={x0 - 20}
            y={y}
            textAnchor="end"
            className="labels"
          >
            {each}
          </text>
        );
      })}

      {/* x axis description */}
      <text
        x={x0 + xAxisLength / 2}
        y={svg_height - 10}
        textAnchor="middle"
        className="description"
      >
        {description?.x}
      </text>
      {/* y axis description */}
      <text
        x={20}
        y={y0 + yAxisLength / 2 + yAxisOffest * 2 / 3}
        textAnchor="middle"
        transform={`rotate(-90, -20, ${y0 + yAxisLength / 2})`}
        className="description"
      >
        {description?.y}
      </text>

      {/* Bar plots */}
      {data?.map((each, index) => {
        const x = x0 + index * barPlotWidth;
        const yRatio = (each?.y - dataMin) / dataYRange;

        const y = y0 + (1 - yRatio) * yAxisLength;
        const height = yRatio * yAxisLength;

        return (
          <g key={index}>
            <rect
              x={x + fillPadding / 2}
              y={y}
              width={barPlotWidth - fillPadding}
              height={height}
              fill="transparent"
              stroke={stroke}
              rx={barRadius?.x}
              ry={barRadius?.y}
              className="rect"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default Chart;
