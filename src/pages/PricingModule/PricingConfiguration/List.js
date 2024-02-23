import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MaterialDataTable from "material-table/Table.js";
import {
  crudActions,
  confirmActions,
  modalActions,
  loaderActions,
  alertActions,
} from "../../../_actions";
import { fileService } from "../../../_services/file.service";
import { TableAction } from "../../../material-table/TableAction";
import PasswordForm from "../../PasswordForm";
import { PermissionHelper } from "_helpers";
import MyForm from "components/Form";
import {
  Typography,
  Grid,
  Switch,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const title = "Pricing Configuration";
class PricingConfigurationList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      exportImportValue: "",
      switchButton: false,
      selectElement: false,
      isExport: false,
      isImport: false,
      form: { module_id: 0 },
    };

    this.deleteCrud = this.deleteCrud.bind(this);
    this.addCrud = this.addCrud.bind(this);
    this.editCrud = this.editCrud.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      if (this.props.confirm.data.length) {
        const ids = this.props.confirm.data.map((value) => value.id);
        this.props.deleteAllCrud(
          "form",
          "pricingInsight/pricing_configuration/delete_all",
          { ids: JSON.stringify(ids) }
        );
      } else {
        if (this.props.confirm.data.id) {
          this.deleteData(this.props.confirm.data.id);
        }
      }
      this.props.clearConfirm();
    }
  }

  deleteData = (id) => {
    this.props.deleteCrud("form", "pricingInsight/pricing_configuration", id);
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
    this.props.history.push(`/admin/pricing-configuration-form/${data.id}`);
  }

  changePassword = (data) => {
    this.props.openModal({
      open: true,
      title: "Update Vendor Password",
      component: <PasswordForm id={data.id} actionFor="vendor" />,
    });
  };

  addCrud() {
    this.props.history.push(`/admin/pricing-configuration-form/new`);
  }

  import = (event) => {
    this.props.showLoader();
    const { form } = this.state;
    let file = event.target.files[0];
    let url = "/pricingInsight/import";

    fileService._import(url, file).then((response) => {
      if (response.status == 200) {
        this.props.hideLoader();
        window.location.reload();
      }
    });
  };

  export = () => {
    const { form } = this.state;
    if (form.module_id == 0) {
      this.props.showError("Please select module");
      return false;
    }
    fileService._download(`pricingInsight/export?module_id=${form.module_id}`);
  };

  handleInputChange(event) {
    debugger;

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
        url: "app/modules",
        getOptionLabel: "name",
        getOptionValue: "id",
        options: [
          {
            name: "flow_added",
            value: true,
          },
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
      });
    }

    if (value === "1") {
      this.setState({
        isExport: PermissionHelper.checkPermission("export_pricing_configuration") ? true : false,
        isImport: false,
      });
    } else if (value === "2") {
      this.setState({
        isImport: PermissionHelper.checkPermission("import_pricing_configuration") ? true : false,
        isExport: false,
      });
    }
  };

  render() {
    const columns = [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Category",
        field: "categories.name",
      },
      {
        title: "Module",
        field: "modules.name",
      },
      {
        title: "Pricing Model",
        field: "pricingModels.name",
      },
      {
        title: "Unit",
        field: "unit",
      },
      // {
      //     title: "Global Avg Price",
      //     field: "modules.name"
      // },
      {
        title: "Added Date",
        field: "updated_at",
        defaultSort: "desc"
      },
      TableAction(
        PermissionHelper.checkPermission("delete_pricing_configuration")
          ? this.deleteCrud
          : null,
        PermissionHelper.checkPermission("edit_pricing_configuration")
          ? this.editCrud
          : null
      ),
    ];

    const { isExport, isImport, exportImportValue } = this.state;

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
                </Select>
              </GridItem>

              {isExport && (
                <>
                  <GridItem xs={3}>
                    <MyForm
                      handleInputChange={(e) => this.handleInputChange(e)}
                      formFields={this.getFormFields()}
                      isExport="true"
                    />
                  </GridItem>
                  <GridItem xs={3}>
                    <Tooltip title="export">
                      <IconButton aria-label="export">
                        <CloudDownloadIcon onClick={this.export} />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                </>
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
          </Paper>
        </GridItem>

        <GridItem xs={12} style={{ zIndex: 0 }}> 
          <MaterialDataTable
            title={title}
            columns={columns}
            addData={
              PermissionHelper.checkPermission("add_pricing_configuration")
                ? this.addCrud
                : false
            }
            deleteAll={
              PermissionHelper.checkPermission("delete_pricing_configuration")
                ? this.deleteAll
                : false
            }
            url="pricingInsight/pricing_configuration"
            selection={true}
            grouping={false}
            defaultExpanded={true}
            refresh={true}
            serverSide={true}
            search={true}
            sorting={true}
            export={false}
            filtering={true}
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
  getRole: crudActions._get,
  deleteCrud: crudActions._delete,
  deleteAllCrud: crudActions._deleteAll,
  showConfirm: confirmActions.show,
  clearConfirm: confirmActions.clear,
  openModal: modalActions.open,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  showError: alertActions.error,
};

export default connect(
  mapStateToProps,
  actionCreators
)(PricingConfigurationList);
