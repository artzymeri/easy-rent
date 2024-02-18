import Sidebar from "@/app/Components/Sidebar";
import React from "react";
import "@/app/Styling/global-styling.css";

const Veturat = () => {
  return (
    <Sidebar>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input type="text" placeholder="search.." />
          <button>Filter</button>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button>ListView</button>
          <button>GridView</button>
        </div>
      </div>
      <div className="cars-list-view"></div>
    </Sidebar>
  );
};

export default Veturat;
