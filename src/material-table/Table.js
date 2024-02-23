import React from "react";
import MaterialTable from "material-table";
import { crudService } from "../_services";
import { alertActions, loaderActions } from "../_actions";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFilterComponent from "./DateFilterComponent";
// import Download from "react-csv/components/Download";
import _ from "lodash";
import XLSX from "xlsx";

class MaterialDataTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      resultData: [],
      columns: this.props.columns,
    };

    this.tableRef = React.createRef();
    this.fileUploader = React.createRef();
  }

  fetchData = () => {
    this.props.showLoader();
    if (!this.props.serverSide) {
      crudService._getAll(this.props.url, []).then(
        (result) => {
          this.setState({ resultData: result.data });
          this.props.hideLoader();
        },
        (error) => {
          this.props.showError(error.message);
          this.props.hideLoader();
        }
      );
    } else {
      this.refershTable();
    }
  };

  fetchSearchList = (url) => {
    return crudService._getAll(url, []).then(
      (result) => {
        return result.data;
      },
      (error) => {
        return [];
      }
    );
  };
  componentDidMount() {
    this.fetchData();
    this.convertColumns();
  }

  componentDidUpdate() {
    if (this.props.alert.message) {
      this.refershTable();
    }
  }

  refershTable = () => {
    if (this.tableRef.current) {
      this.tableRef.current.onQueryChange();
      this.props.hideLoader();
    }
  };

  importFile = (e) => {
    this.props.import(e);
  };

  downloadExcel = () => {
    this.props.showLoader();
    if (this.props.serverSide) {
      crudService._getAll(this.props.url, []).then(
        (result) => {
          const newData = result.data.map((row) => {
            delete row.tableData;
            return row;
          });
          const workSheet = XLSX.utils.json_to_sheet(newData);
          const workBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
          //Buffer
          let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
          //Binary string
          XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
          //Download
          XLSX.writeFile(workBook, this.props.title + ".xlsx");
          this.props.hideLoader();
        },
        (error) => {
          this.props.showError(error.message);
          this.props.hideLoader();
        }
      );
    } else {
      //this.refershTable();
    }
    // const newData=columns.map(row=>{
    //   delete row.tableData
    //   return row
    // })
  };

  async convertColumns() {
    const { columns } = this.state;
    for (let index = 0; index < columns.length; index++) {
      if (columns[index].lookupConstant) {
        columns[index].lookup = columns[index].lookupConstant.reduce(
          (acc, curr) => {
            acc[curr.id] = curr.name;
            return acc;
          },
          {}
        );
        delete columns[index].lookupConstant;
      }

      if (columns[index].url) {
        let filterData = _.uniqBy(
          await this.fetchSearchList(columns[index].url),
          "blog_topic_id"
        );
        console.log("filterData", filterData);
        let filterName = columns[index].filterName;
        columns[index].filterComponent = (props) => {
          return (
            <Autocomplete
              id="combo-box-demo"
              options={filterData}
              getOptionLabel={(option) => {
                if (filterName === "plan_name") {
                  return option.plan_name;
                } else if (filterName === "blog_topic") {
                  return option.blog_topic;
                } else {
                  return option.name;
                }
              }}
              style={{ width: 200 }}
              renderInput={(params) => <TextField {...params} />}
              onInputChange={(e, value) => {
                return props.onFilterChanged(index, value);
              }}
            />
          );
        };
      }

      if (
        columns[index].type == "date_range" ||
        columns[index].field == "created_at" ||
        columns[index].field == "updated_at" ||
        columns[index].field == "booking_date"
      ) {
        columns[index].filterComponent = DateFilterComponent;
      }
    }
    this.setState({ ...this.state, columns });
  }
  render() {
    const { columns, resultData } = this.state;
    if (this.props.flag) {
      this.refershTable();
    }
    const {
      selection,
      search,
      sorting,
      filtering,
      defaultExpanded,
      exportButton,
      refresh,
      serverSide,
      grouping,
    } = this.props;
    const actions = [];
    const options = {
      exportButton: exportButton,
      selection: selection,
      grouping: grouping,
      defaultExpanded: defaultExpanded,
      actionsColumnIndex: -1,
      search: search,
      sorting: sorting,
      filtering: filtering,
      pageSize: 10,
      isLoading: true,
      pageSizeOptions: [10, 20, 30, 50, 100],
    };

    if (this.props.deleteAll) {
      actions.push({
        icon: "delete",
        tooltip: "Delete",
        onClick: (event, rowData) => {
          this.props.deleteAll(rowData);
          this.fetchData();
        },
      });
    }

    if (this.props.addData) {
      actions.push({
        icon: "add",
        tooltip: "Add",
        isFreeAction: true,
        onClick: () => {
          this.props.addData();
        },
      });
    }
    if (this.props.exportData) {
      actions.push({
        icon: "cloud_download",
        tooltip: "Export",
        isFreeAction: true,
        onClick: () => {
          this.downloadExcel();
        },
      });
    }

    if (refresh) {
      actions.push({
        icon: "refresh",
        tooltip: "Refresh Data",
        isFreeAction: true,
        onClick: () => this.fetchData(),
      });
    }

    if (this.props.export) {
      actions.push({
        icon: "cloud_download",
        tooltip: "Export",
        isFreeAction: true,
        onClick: () => {
          this.props.export();
        },
      });
    }

    if (this.props.import) {
      actions.push({
        icon: "cloud_upload",
        tooltip: "import",
        isFreeAction: true,
        onClick: () => {
          if (this.fileUploader.current) {
            this.fileUploader.current.click();
          }
        },
      });
    }

    if (this.props.pullData) {
      actions.push({
        icon: "import_export",
        tooltip: "Fetch",
        isFreeAction: true,
        onClick: () => {
          this.props.pullData();
        },
      });
    }

    return (
      <React.Fragment>
        <input
          type="file"
          id="file"
          ref={this.fileUploader}
          style={{ display: "none" }}
          onChange={(e) => {
            this.importFile(e);
            e.target.value = null;
          }}
        />

        {serverSide && (
          <MaterialTable
            tableRef={this.tableRef}
            title={this.props.title}
            data={(query) =>
              new Promise((resolve, reject) => {
                const tempQuery = {
                  ...query,
                  customFilter:
                    this.props.filterData && this.props.filterData.length > 0
                      ? this.props.filterData
                      : [],
                };
                crudService
                  ._getAll(this.props.url, tempQuery)
                  .then((result) => {
                    if (result.status === 200) {
                      if (this.props.updateFlag) {
                        this.props.updateFlag();
                      }
                      resolve({
                        data: result.data.data,
                        page: result.data.page - 1,
                        totalCount: Number(result.data.total),
                      });
                    }
                  });
              })
            }
            options={options}
            actions={actions}
            columns={columns}
          />
        )}

        {!serverSide && (
          <MaterialTable
            title={this.props.title}
            data={resultData}
            options={options}
            actions={actions}
            columns={columns}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert };
};
const actionCreators = {
  showError: alertActions.error,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(
  mapStateToProps,
  actionCreators
)(MaterialDataTable);
