import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);

  const [tabs, settabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5"></div>
    </DashboardLayout>
  );
};

export default ManageTasks;
