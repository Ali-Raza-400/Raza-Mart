import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useLazyGetSaleStatsQuery } from '../../slices/dashbord';

const DailySalesChart = () => {
  const [duration, setDuration] = useState('year');
  console.log("duration:::", duration);

  const [getSaleStats, { data, isLoading, isError }] = useLazyGetSaleStatsQuery();
console.log("data:::",data);
  useEffect(() => {
    getSaleStats(duration);
  }, [duration, getSaleStats]);

  console.log("data:::", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  const categories = data?.data?.x || [];
  const userRegistrations = data?.data?.y || [];
  const options = {
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
      categories: categories,
    }
  };

  const series = [{
    name: "Daily Sales",
    data: userRegistrations
  }];

  return (
    <div className="chart-container">
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <div>
          <p>User registration record</p>
        </div>
        <div>
          <select className="form-select" aria-label="Default select example" onChange={(e) => {
            setDuration(e.target.value);
          }}>
            <option value="year">Year</option>
            <option value="month&&year=2024">Month</option>
          </select>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default DailySalesChart;

