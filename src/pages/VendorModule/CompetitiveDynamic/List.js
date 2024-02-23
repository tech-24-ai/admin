import React from "react";
import { connect } from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {
  crudActions,
  confirmActions,
  modalActions,
  loaderActions,
} from "../../../_actions";
import { PermissionHelper } from "_helpers";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import BubbleChart from "../../../BubbleChart/BubbleChart";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CompetitiveDynamicForm from "./Form";
import Typography from "@material-ui/core/Typography";

Chart.plugins.register(ChartDataLabels);
const title = "Competitive Dynamics";
class CompetitiveDynamicList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteCrud = this.deleteCrud.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.id =
      this.props.match && this.props.match.params.id
        ? this.props.match.params.id
        : 0;
  }

  componentDidUpdate() {
    if (this.props.confirm.confirm) {
      if (this.props.confirm.data.length) {
        const ids = this.props.confirm.data.map((value) => value.id);
        this.props.deleteAllCrud(
          "form",
          `competitive-dynamic/${this.id}/delete_all`,
          {
            ids: JSON.stringify(ids),
          }
        );
      } else {
        if (this.props.confirm.data.id) {
          this.deleteData(this.props.confirm.data.id);
        }
      }
      this.props.clearConfirm();
    }
  }
  openBubbleForm(
    childId = 0,
    x = 0,
    y = 0,
    selectedMarket = "",
    selectedYear = new Date().setFullYear(),
    selectCategory = ""
  ) {    
    this.props.openModal({
      open: true,
      component: (
        <CompetitiveDynamicForm
          childId={childId == 0 ? "new" : childId}
          x={x}
          y={y}
          selectedMarket={selectedMarket}
          selectedYear={selectedYear}
          url={this.props.url}
          selectCategory={selectCategory}
          closeModal={() => this.handleClose()}
          id={this.id}
        ></CompetitiveDynamicForm>
      ),
    });
  }
  deleteData(id) {
    this.props.deleteCrud(
      "form",
      this.props.url ? this.props.url : `competitive-dynamic/${this.id}`,
      id
    );
    this.props.closeModal();
  }
  deleteCrud(data) {
    this.props.showConfirm(
      "Confirm",
      `Are you sure want to delete ${data.name} ?`,
      data
    );
  }
  openBubbleInfo(data, selectedMarket, selectedYear, selectCategory) {
    this.props.openModal({
      open: true,
      component: (
        <>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.label}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Bubble x - {data.x}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Bubble y - {data.y}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Bubble size - {data.r}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Bubble color - {data.color}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Market - {selectedMarket.label}
              </Typography>
            </CardContent>
            <CardActions>
              {PermissionHelper.checkPermission(
                "edit_vendor_competitive_dynamic"
              ) && (
                <Button
                  size="small"
                  color="primary"
                  onClick={({ id }) =>
                    this.openBubbleForm(
                      data.id,
                      0,
                      0,
                      selectedMarket,
                      selectedYear,
                      selectCategory
                    )
                  }
                >
                  Edit Bubble
                </Button>
              )}
              {PermissionHelper.checkPermission(
                "delete_vendor_competitive_dynamic"
              ) && (
                <Button
                  size="small"
                  color="primary"
                  onClick={({ id }) => this.deleteData(data.id)}
                >
                  Delete
                </Button>
              )}
            </CardActions>
          </Card>
        </>
      ),
    });
  }
  handleOpen(data, selectedMarket, selectedYear, selectCategory) {
    if (data.newX) {
      if (PermissionHelper.checkPermission("add_vendor_competitive_dynamic"))
        this.openBubbleForm(
          0,
          data.newX,
          data.newY,
          selectedMarket,
          selectedYear,
          selectCategory
        );
    } else {
      this.openBubbleInfo(data, selectedMarket, selectedYear, selectCategory);
    }
  }

  handleClose() {
    this.props.closeModal();
  }
  render() {
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Typography variant="body2" color="textSecondary" component="p">
            Click on the graph/bubble to add/edit bubble.
          </Typography>
        </GridItem>
        <GridItem xs={12}>
          <Card>
            <BubbleChart
              title={title}
              editBubble={this.handleOpen}
              url={
                this.props.url
                  ? this.props.url
                  : `competitive-dynamic/${this.id}`
              }
              serverSide={true}
            />
          </Card>
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
  showConfirm: confirmActions.show,
  deleteCrud: crudActions._delete,
  clearConfirm: confirmActions.clear,
  openModal: modalActions.open,
  closeModal: modalActions.close,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(
  mapStateToProps,
  actionCreators
)(CompetitiveDynamicList);
