import DashboardLayout from "../../components/layout/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

const CreateTask = () => {
  return <DashboardLayout activeMenu="Create Task">CreateTask</DashboardLayout>;
};

export default CreateTask;
