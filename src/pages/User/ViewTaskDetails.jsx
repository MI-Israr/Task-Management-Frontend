import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "in progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getTaskDetailsById = async () => {};
  const updateTodoChecklist = async (index) => {};
  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (idx) {
      getTaskDetailsById();
    }

    return () => {};
  }, [idx]);

  return <div>ViewTaskDetails</div>;
};

export default ViewTaskDetails;
