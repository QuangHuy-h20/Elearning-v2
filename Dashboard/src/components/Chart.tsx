import dynamic from "next/dynamic";
import { ApexOptions } from "../types/ApexOptions";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Chart = () => {
  const chartOptions: ApexOptions = {
    chart: {
      height: "100%",
      type: "line",
    },
    series: [
      {
        name: "Online Students",
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
      },
      {
        name: "Total Enrolls",
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
      },
    ],
  };

  const chartOption = {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  };

  return (
    <ApexChart
      options={chartOption as Object}
      series={chartOptions.series}
      type="line"
      height="100%"
    />
  );
};

export default Chart;
