
import asyncHandler from "../middlewares/asynchandler.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const getUserCreationStats = async (req, res) => {
    try {
      const { type } = req.query; // 'month' or 'year'
      const startDate = new Date("2020-01-01T00:00:00Z");
      const endDate = new Date("2026-01-01T00:00:00Z");
  
      const stats = await User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: type === "month" 
              ? { month: { $month: "$createdAt" } } // Group by month
              : { year: { $year: "$createdAt" } }, // Group by year
            count: { $sum: 1 },
          },
        },
        {
          $sort: type === "month" 
            ? { "_id.month": 1 } 
            : { "_id.year": 1 },
        },
      ]);
  
      // Format response
      const result = {
        x: [],
        y: [],
      };
  
      if (type === "month") {
        // Prepare response for months
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        result.x = months;
        const counts = Array(12).fill(0); // Initialize with 0 for each month
        stats.forEach(({ _id, count }) => {
          counts[_id.month - 1] = count; // Map counts to months (1-based index)
        });
        result.y = counts;
      } else {
        // Prepare response for years
        const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
        result.x = years;
        const counts = Array(years.length).fill(0); // Initialize with 0 for each year
        stats.forEach(({ _id, count }) => {
          const index = years.indexOf(String(_id.year));
          if (index !== -1) counts[index] = count; // Map counts to years
        });
        result.y = counts;
      }
  
      // Send response
      res.status(200).json({
        statusCode: 200,
        message: "Operation completed successfully. ✔️",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching stats", error });
    }
  };

  const getSalesData = async (req, res) => {
    const { type, year } = req.query; // 'type' can be 'month' or 'year', 'year' is optional if type is 'month'
    
    try {
      if (!type) {
        return res.status(400).json({ message: 'Please provide the type parameter (month or year).' });
      }
  
      let salesData = [];
      let xLabels = [];
      let ySales = [];
      
      if (type === 'year') {
        // If type is 'year', get yearly sales data
        const startDate = new Date('2020-01-01T00:00:00Z'); // Start from 2020, for example
        const endDate = new Date(); // Current date for the latest year
  
        // Aggregation query for yearly sales
        salesData = await Order.aggregate([
          {
            $match: {
              isPaid: true, // Only consider paid orders
              createdAt: { $gte: startDate, $lt: endDate }, // Filter by year range
            },
          },
          {
            $group: {
              _id: { $year: "$createdAt" }, // Group by year of createdAt
              totalSales: { $sum: "$totalPrice" }, // Sum total sales for each year
            },
          },
          {
            $sort: { _id: 1 }, // Sort by year in ascending order
          },
        ]);
  
        // Prepare the response format for yearly data
        for (let year = 2020; year <= 2025; year++) {
          const yearData = salesData.find(data => data._id === year);
          xLabels.push(year.toString());
          ySales.push(yearData ? yearData.totalSales : 0);
        }
  
      } else if (type === 'month') {
        // If type is 'month', get monthly sales data for a specific year
        if (!year) {
          return res.status(400).json({ message: 'Please provide a year parameter for monthly data.' });
        }
  
        const startDate = new Date(`${year}-01-01T00:00:00Z`); // Start of the given year
        const endDate = new Date(`${parseInt(year) + 1}-01-01T00:00:00Z`); // Start of the next year
  
        // Aggregation query for monthly sales
        salesData = await Order.aggregate([
          {
            $match: {
              isPaid: true, // Only consider paid orders
              createdAt: { $gte: startDate, $lt: endDate }, // Filter by the given year
            },
          },
          {
            $group: {
              _id: { $month: "$createdAt" }, // Group by month of createdAt
              totalSales: { $sum: "$totalPrice" }, // Sum total sales for each month
            },
          },
          {
            $sort: { _id: 1 }, // Sort by month in ascending order
          },
        ]);
  
        // Prepare the response format for monthly data
        xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (let i = 0; i < 12; i++) {
          const monthData = salesData.find(data => data._id === i + 1); // Check if there's data for the month
          ySales.push(monthData ? monthData.totalSales : 0);
        }
      }
  
      // Return the data in the desired format for bar chart
      return res.status(200).json({
        statusCode: 200,
        message: 'Operation completed successfully. ✔️',
        data: {
          x: xLabels,
          y: ySales,
        },
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  export default getSalesData;
  
  

export { getUserCreationStats,getSalesData };