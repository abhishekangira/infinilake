import { useState } from "react";

export default function Filter({
  column: { filterValue, setFilter, Header },
  filterType,
  setFilterType,
}) {
  return (
    <div style={{ padding: "1rem", border: "2px solid black", marginBottom: "20px" }}>
      Filter <strong>{Header}</strong> if it{" "}
      <select
        value={filterType}
        onChange={(e) => {
          setFilterType(e.target.value);
        }}
      >
        {["text", "startsWith"].map((type) => (
          <option key={type} value={type}>
            {type === "text" ? "contains" : type}
          </option>
        ))}
      </select>
      {["text", "startsWith"].includes(filterType) && (
        <input
          value={filterValue || ""}
          onChange={(e) => {
            setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
          }}
          placeholder={`enter text`}
        />
      )}
    </div>
  );
}
