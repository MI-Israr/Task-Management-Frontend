import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA,
      );
      if (response.data) {
        setDashboardData;
      }
    } catch (error) {
      console.error(`Error fetching Users data: ${error}`);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return <DashboardLayout activeMenu={"Dashboard"}>Dashboard</DashboardLayout>;
};

export default Dashboard;
