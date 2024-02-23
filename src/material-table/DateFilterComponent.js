import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

export default (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if ((startDate && endDate) || (!startDate && !endDate)) {
      props.onFilterChanged(props.columnDef.tableData.id, {
        startDate,
        endDate,
      });
    }
  }, [startDate, endDate]);
  return (
    <>
      <TextField
        id="date"
        label="From"
        type="date"
        value={startDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <br />
      <TextField
        id="date"
        label="To"
        type="date"
        value={endDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
      />
    </>
  );
};
