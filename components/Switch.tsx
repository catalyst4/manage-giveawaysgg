import { useState } from "react";
import { Switch as CSwitch } from "@headlessui/react";

export const Switch = ({ active, setActive }) => {

  return (
    <CSwitch
      checked={active}
      onChange={setActive}
      className={`${
        active ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          active ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </CSwitch>
  );
}