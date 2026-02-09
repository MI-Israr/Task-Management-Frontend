import React, { useState } from "react";

const SelectUsers = (selectedUsers, setSelectedUsers) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getALlUsers = async () => {};

  return <div>SelectUsers</div>;
};

export default SelectUsers;
