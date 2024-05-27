import React from "react";
import { Chart } from "react-google-charts";
interface PropsChartContainer {
  data: any;
  options: any;
}
const ChartContainer = ({ data, options }: PropsChartContainer) => {
  return (
    <div style={{ height: "110px" }}>
      <Chart
        chartType="LineChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  );
};
export default ChartContainer;
