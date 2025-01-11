import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useLazyGetUserStatsQuery } from '../../slices/dashbord';

const UserRegistrationChart = () => {
  const [duration, setDuration] = useState('month');
  console.log("duration:::", duration);

  const [getUserStats, { data, isLoading, isError }] = useLazyGetUserStatsQuery();

  useEffect(() => {
    getUserStats(duration);
  }, [duration, getUserStats]);

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
      categories: categories, // Safely use categories
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
          return val + " new users";
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
    data: userRegistrations // Safely use the registrations data
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
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default UserRegistrationChart;
