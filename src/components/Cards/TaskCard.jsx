import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../layout/AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  status,
  priority,
  dueDate,
  assignedTo,
  todoChecklist,
  attachments,
  createdAt,
  updatedAt,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  return (
    <div className="" onClick={onClick}>
      <div className="">
        <div
          className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded `}
        >
          {status}
        </div>
        <div
          className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounde`}
        >
          {priority} Priority
        </div>
      </div>
      <div
        className={`px-4 border-l-[3px] ${status === "In Progress" ? "border-cyan-500" : status === "Completed" ? "border-indigo-500" : "border-voilet-500"}`}
      >
        <p className="">{title}</p>
        <p className="">{description}</p>
        <p className="">Task Done: </p>
      </div>
    </div>
  );
};

export default TaskCard;
