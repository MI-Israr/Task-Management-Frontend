import React, { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  return <DashboardLayout>Dashboard</DashboardLayout>;
};

export default Dashboard;
