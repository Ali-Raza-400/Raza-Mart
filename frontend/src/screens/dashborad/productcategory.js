import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ProductCategoriesChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    title: {
      text: 'Top Selling Product Categories',
      align: 'left'
    }
  };

  const series = [4400, 5500, 2800, 3200, 2100];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default ProductCategoriesChart;

