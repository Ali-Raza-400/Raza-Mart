import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const FilterUsageHeatmap: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#008FFB"],
    title: {
      text: 'Product Filter Usage Heatmap',
      align: 'left'
    },
    xaxis: {
      type: 'category',
      categories: ['Price', 'Brand', 'Color', 'Size', 'Rating']
    }
  };

  const series = [
    {
      name: 'Electronics',
      data: [{ x: 'Price', y: 54 }, { x: 'Brand', y: 66 }, { x: 'Color', y: 25 }, { x: 'Size', y: 15 }, { x: 'Rating', y: 42 }]
    },
    {
      name: 'Clothing',
      data: [{ x: 'Price', y: 43 }, { x: 'Brand', y: 50 }, { x: 'Color', y: 70 }, { x: 'Size', y: 80 }, { x: 'Rating', y: 35 }]
    },
    {
      name: 'Books',
      data: [{ x: 'Price', y: 62 }, { x: 'Brand', y: 10 }, { x: 'Color', y: 5 }, { x: 'Size', y: 3 }, { x: 'Rating', y: 58 }]
    },
    {
      name: 'Home & Garden',
      data: [{ x: 'Price', y: 48 }, { x: 'Brand', y: 45 }, { x: 'Color', y: 52 }, { x: 'Size', y: 38 }, { x: 'Rating', y: 40 }]
    },
    {
      name: 'Toys',
      data: [{ x: 'Price', y: 38 }, { x: 'Brand', y: 55 }, { x: 'Color', y: 45 }, { x: 'Size', y: 30 }, { x: 'Rating', y: 45 }]
    }
  ];

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="heatmap" height={350} />
    </div>
  );
};

export default FilterUsageHeatmap;

