import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Switch,
  Paper,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Tooltip from "@material-ui/core/Tooltip";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import { crudActions, confirmActions, loaderActions } from "../../../_actions";
import { fileService } from "../../../_services/file.service";
import { TableAction } from "../../../material-table/TableAction";
import MyForm from "components/Form";
import { PermissionHelper } from "_helpers";
import SearchModule from "components/SearchModule";

export const AntSwitch = withStyles((theme) => ({
  root: {
    width: 30,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    left: "0!important",
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const title = "Products";
export class ProductsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      exportImportValue: "",
      switchButton: false,
      selectElement: false,
      isExport: false,
      isImport: false,
      isFilterOpen: false,
      nameSearch: "",
      vendorSearch: "",
      moduleSearch: "",
      filterData: [],
      flag: false,
      form: {
        name: "",
        about: "",
        category_id: "",
        category: "",
        parent_id: "",
        parent: "",
        documents: [],
      },
    };
    this.deleteCrud = this.deleteCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.export = this.export.bind(this);
  }

  // componentDidMount() {
  //   this.props.getAllCrud('modules', 'app');
  // }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      let ids = [];
      if (this.props.confirm.data.length) {
        ids = this.props.confirm.data.map((value) => value._id);
      } else {
        if (this.props.confirm.data._id) {
          ids.push(this.props.confirm.data._id);
        }
      }
      this.deleteData(ids);
      this.props.clearConfirm();
    }
  }

  deleteData = (ids) => {
    this.props.deleteAllCrud("form", "products/delete_all", {
      ids: JSON.stringify(ids),
    });
  };

  export = () => {
    const { form } = this.state;
    if (form.module_id) {
      fileService._download(`products/export?moduleId=${form.module_id}`);
    } else {
      fileService._download("products/export");
    }
  };

  import = (event) => {
    this.props.showLoader();
    const { form } = this.state;
    let file = event.target.files[0];
    let url;
    if (form.module_id) {
      url = `/products/import?moduleId=${form.module_id}`;
    } else {
      url = "/products/import";
    }

    fileService._import(url, file).then((response) => {
      if (response.status == 200) {
        this.props.hideLoader();
        window.location.reload();
      }
    });
  };

  deleteCrud(data) {
    this.props.showConfirm(
      "Confirm",
      `Are you sure want to delete ${data.name} ?`,
      data
    );
  }

  deleteAll(data) {
    this.props.showConfirm(
      "Confirm",
      `Are you sure want to delete ${data.length} row ?`,
      data
    );
  }

  editCrud(data) {
    this.props.history.push(`/admin/product-form/${data._id}`);
  }

  addCrud() {
    this.props.history.push(`/admin/product-form/new`);
  }

  export() {
    fileService._download("reports/productreport");
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.form[event.target.name] = event.target.value;
    this.setState(newState);
  }

  getFormFields = () => {
    const { form } = this.state;
    const formFields = [
      {
        name: "module_id",
        label: "Choose Module",
        type: "group_autocomplete",
        // url: "app/modules",
        url: "app/module/children",
        getOptionLabel: "name",
        getOptionValue: "id",
        options: [
          // {
          //   name: "flow_added",
          //   value: true,
          // },
        ],
        value: form.module_id,
      },
    ];
    return formFields;
  };

  handleFlow = (e) => {
    const { value } = e.target;
    if (value !== undefined && value !== "undefined") {
      this.setState({
        exportImportValue: value,
        switchButton: true,
      });
    }

    if (value === "1") {
      this.setState({
        isExport: PermissionHelper.checkPermission("import_export_products")
          ? true
          : false,
        isImport: false,
      });
    } else if (value === "2") {
      this.setState({
        isImport: PermissionHelper.checkPermission("import_export_products")
          ? true
          : false,
        isExport: false,
      });
    }
    
  };

  handleImportFlow = () => {
    const { switchButton, isImport } = this.state;
    this.setState({
      switchButton: !switchButton,
      isImport: !isImport,
    });
  };

  handleSelectBox = () => {
    const { selectElement } = this.state;
    this.setState({
      selectElement: !selectElement,
      form: { parent_id: "" },
    });
  };

  filterDataClick = () => {
    const { nameSearch, vendorSearch, moduleSearch } = this.state;
    const filterDataTemp = [];
    if (nameSearch) {
      filterDataTemp.push({
        value: nameSearch,
        field: "name",
      });
    }

    if (vendorSearch) {
      filterDataTemp.push({
        value: vendorSearch,
        field: "vendor",
      });
    }

    if (moduleSearch) {
      filterDataTemp.push({
        value: moduleSearch,
        field: "module",
      });
    }

    this.setState({ filterData: filterDataTemp, flag: true });
  };

  inputDataRefresh = () => {
    if (this.state.isFilterOpen === true) {
      this.setState({
        nameSearch: "",
        vendorSearch: "",
        moduleSearch: "",
        flag: false,
      });
    }
  };

  render() {
    const {
      switchButton,
      selectElement,
      isExport,
      isImport,
      exportImportValue,
      isFilterOpen,
      filterData,
    } = this.state;
    const mystyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      fontSize: "0.875rem",
    };

    const columns = [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Vendor",
        field: "vendor",
      },
      {
        title: "Module",
        field: "module",
      },
      {
        title: "Flow Added",
        field: "flowAdded",
        render: (rowData) => {
          if (rowData.flowAdded) {
            return "Yes";
          } else {
            return "No";
          }
        },
      },
      TableAction(
        PermissionHelper.checkPermission("delete_products")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_products") ? this.editCrud : null
      ),
    ];

    return (
      <GridContainer>
        <GridItem xs={12}>
          <Paper style={{ marginBottom: 20, padding: 40 }}>
            <GridContainer style={{ alignItems: "center" }}>
              <GridItem xs={3}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  variant="outlined"
                  autoWidth="true"
                  value={exportImportValue || "0"}
                  onClick={this.handleFlow}
                >
                  <MenuItem value="0">Select Export/Import</MenuItem>
                  <MenuItem value="1">Export</MenuItem>
                  <MenuItem value="2">Import</MenuItem>
                  {/* <MenuItem value="3">Export_Wrong_Link</MenuItem> */}
                </Select>
              </GridItem>

              <div
                style={{
                  fontSize: "1rem",
                  padding: "2px 14px",
                  border: "1px solid rgba(0, 0, 0, 0.27)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  minWidth: "16px",
                  userSelect: "none",
                  position: "absolute",
                  right: "70px",
                }}
                onClick={() => {
                  this.inputDataRefresh();
                  this.setState({
                    isFilterOpen: !isFilterOpen,
                  });
                }}
              >
                <IconButton aria-label="edit">
                  <FilterList fontSize="medium" />
                </IconButton>
              </div>

              {switchButton && (
                <GridItem xs={3}>
                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Typography color="textPrimary">
                          With Out Flow
                        </Typography>
                      </Grid>
                      <Grid item>
                        <AntSwitch
                          onChange={this.handleSelectBox}
                          name="checkedC"
                        />
                      </Grid>
                      <Grid item>
                        <Typography color="textPrimary">With Flow</Typography>
                      </Grid>
                    </Grid>
                  </Typography>
                </GridItem>
              )}
              {selectElement && (
                <GridItem xs={3}>
                  <MyForm
                    handleInputChange={this.handleInputChange}
                    formFields={this.getFormFields()}
                    isExport="true"
                  />
                </GridItem>
              )}
              {isExport && (
                <GridItem xs={3}>
                  <Tooltip title="export">
                    <IconButton aria-label="export">
                      <CloudDownloadIcon onClick={this.export} />
                    </IconButton>
                  </Tooltip>
                </GridItem>
              )}

              {isImport && (
                <>
                  <input
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={(e) => {
                      this.import(e);
                      e.target.value = null;
                    }}
                  />
                  <label htmlFor="raised-button-file">
                    <Tooltip title="import">
                      <IconButton aria-label="import" component="span">
                        <CloudUploadIcon />
                      </IconButton>
                    </Tooltip>
                  </label>
                </>
              )}
            </GridContainer>
            <br />
            {isFilterOpen && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div style={mystyle}>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    onInput={(e) =>
                      this.setState({ nameSearch: e.target.value })
                    }
                  />
                </div>
                <div style={mystyle}>
                  <TextField
                    id="standard-basic"
                    label="Vendor"
                    variant="standard"
                    onInput={(e) =>
                      this.setState({ vendorSearch: e.target.value })
                    }
                  />
                </div>
                <div style={mystyle}>
                  <TextField
                    id="standard-basic"
                    label="Module"
                    variant="standard"
                    onInput={(e) =>
                      this.setState({ moduleSearch: e.target.value })
                    }
                  />
                </div>
                <button
                  style={{
                    fontSize: "1rem",
                    padding: "5px 14px",
                    border: "1px solid rgba(0, 0, 0, 0.27)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    minWidth: "16px",
                    userSelect: "none",
                    backgroundColor: "#fff",
                  }}
                  onClick={this.filterDataClick}
                >
                  Search
                </button>
              </div>
            )}
          </Paper>
        </GridItem>
        <GridItem xs={12} style={{ zIndex: 0 }}>
          <MaterialDataTable
            title={title}
            columns={columns}
            addData={
              PermissionHelper.checkPermission("add_products")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_products")
                ? this.deleteAll
                : false
            }
            onRefresh={this.refresh}
            url="products"
            selection={true}
            refresh={true}
            export={false}
            serverSide={true}
            filterData={filterData}
            flag={this.state.flag}
            updateFlag={() => this.setState({ flag: false })}
            sorting={true}
            search={false}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user } = authentication;
  return { user, confirm };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  deleteCrud: crudActions._delete,
  deleteAllCrud: crudActions._deleteAll,
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(
  mapStateToProps,
  actionCreators
)(ProductsList);
