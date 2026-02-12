import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttatchmentsInput = ({ attachments, setAttachments }) => {
  const [option, setoption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setoption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>

          <button className=" cursor-pointer">
            <HiOutlineTrash
              className="text-lg text-red-500"
              onClick={() => handleDeleteOption(index)}
            />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center  gap-3 border border-gray-100 rounded-md px-3">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setoption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white py-2"
          />
        </div>

        <div className="card-btn text-nowrap">
          <HiMiniPlus className="text-lg" onClick={() => handleAddOption()} />
        </div>
      </div>
    </div>
  );
};

export default AddAttatchmentsInput;
