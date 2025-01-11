import DailySalesChart from "./DailySale";
import FilterUsageHeatmap from "./filterusageHeat";
import ProductCategoriesChart from "./productcategory";
import UserRegistrationChart from "./userRegister";


const Dashboard= () => {
  return (
    <div className="dashboard">
      <h1>E-commerce Dashboard</h1>
      <div className="chart-grid">
        <UserRegistrationChart />
        <DailySalesChart />
        <ProductCategoriesChart />
        <FilterUsageHeatmap />
      </div>
    </div>
  );
};

export default Dashboard;

