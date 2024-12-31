import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const DailySalesChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Daily Sales Trend',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    }
  };

  const series = [{
    name: "Daily Sales",
    data: [3100, 4000, 2800, 5100, 4200, 6000, 4800]
  }];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default DailySalesChart;

