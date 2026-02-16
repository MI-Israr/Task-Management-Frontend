import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const UserDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

  // Initialize default stats to prevent undefined errors
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const processData = (data) => {
    // 1. Extract Stats from the "statistics" object sent by backend
    const statsData = data?.statistics || {};
    const chartsData = data?.charts || {};

    const distribution = chartsData.taskDistribution || {};
    const priorities = chartsData.taskPriorityLevel || {};

    // 2. Map Backend Keys (lowercase) to UI format
    // Backend keys: pending, inprogress, completed
    const pending = distribution.pending || 0;
    const inProgress =
      distribution.inprogress || distribution["in progress"] || 0;
    const completed = distribution.completed || 0;

    // 3. Update Stats State
    setStats({
      total: statsData.totalTasks || 0,
      pending: statsData.pendingTasks || pending, // Fallback to chart data if stat missing
      inProgress: inProgress,
      completed: statsData.completedTasks || completed,
    });

    // 4. Update Pie Chart
    setPieChartData([
      { status: "Pending", count: pending },
      { status: "In Progress", count: inProgress },
      { status: "Completed", count: completed },
    ]);

    // 5. Update Bar Chart
    // Backend keys: low, medium, high
    setBarChartData([
      { priority: "Low", count: priorities.low || 0 },
      { priority: "Medium", count: priorities.medium || 0 },
      { priority: "High", count: priorities.high || 0 },
    ]);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA,
      );

      if (response.data) {
        setDashboardData(response.data);
        processData(response.data);
      }
    } catch (error) {
      console.error(`Error fetching Dashboard data: ${error}`);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div className="mb-6">
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              Good Morning! {user?.name}
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(stats.total)}
            color="bg-primary"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(stats.pending)}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(stats.inProgress)}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(stats.completed)}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium">Task Distribution</h5>
          </div>
          <CustomPieChart data={pieChartData} colors={COLORS} />
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium">Task Priority Levels</h5>
          </div>
          <CustomBarChart data={barChartData} />
        </div>

        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg">Recent Tasks</h5>
              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
