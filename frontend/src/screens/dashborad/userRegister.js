import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const UserRegistrationChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yaxis: {
      title: {
        text: 'New Users'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " new users"
        }
      }
    },
    title: {
      text: 'User Registration Trends',
      align: 'left'
    }
  };

  const series = [{
    name: 'New Registrations',
    data: [44, 55, 57, 56, 61, 58]
  }];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default UserRegistrationChart;

