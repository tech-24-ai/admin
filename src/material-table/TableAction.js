import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import ViewIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";

export const TableAction = (
  deleteRole = false,
  editRole = false,
  downLoadFile = false,
  editPass = false,
  viewData = false,
  Custom = false,
  Alternate = false,
) => {
  return {
    field: "action",
    title: "Action",
    sorting: false,
    filtering: false,
    render: (rowData) => (
      <React.Fragment>
        {deleteRole && (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              deleteRole(rowData);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}

        {editRole && (
          <IconButton
            aria-label="edit"
            onClick={(event) => {
              editRole(rowData);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}

        {editPass && (
          <IconButton
            aria-label="edit"
            onClick={(event) => {
              editPass(rowData);
            }}
          >
            <LockIcon fontSize="small" />
          </IconButton>
        )}
        {downLoadFile && (
          <IconButton
            aria-label="edit"
            onClick={(event) => {
              downLoadFile(rowData);
            }}
          >
            <GetAppIcon fontSize="small" />
          </IconButton>
        )}

        {viewData && (
          <IconButton
            aria-label="edit"
            onClick={(event) => {
              viewData(rowData);
            }}
          >
            <ViewIcon fontSize="small" />
          </IconButton>
        )}
        {Custom && <Custom rowData={rowData} />}
        
        {Alternate && <Alternate rowData={rowData} />}
      </React.Fragment>
    ),
  };
};
