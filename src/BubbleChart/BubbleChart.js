import React from "react";
import { crudService } from "../_services";
import { crudActions, alertActions, loaderActions } from "../_actions";
import { connect } from "react-redux";
import Chart from "chart.js";
import config from "./BubbleChartConfig";
import ChartDataLabels from "chartjs-plugin-datalabels";
import _ from "lodash";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Search from "components/SearchModule";
import { YEAR } from "../_constants/form.constants";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadImage } from "_helpers/pdfGenerator";

Chart.plugins.register(ChartDataLabels);

class BubbleChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      resultData: [],
      selectedMarket: null,
      selectedYear: new Date().getFullYear(),
      vendor_categories: [],
      selectedCategory: 0,
    };
    this.config = { ...config };
    this.config.options.onClick = this.handleBubbleClick;
    this.config.parentContext = this;
    this.chartRef = React.createRef();
    this.loading = false;
  }
  handleBubbleClick(e) {
    let element = this.getElementAtEvent(e);
    if (element.length > 0) {
      // data gives you `x`, `y` and `r` values
      let data = this.config.data.datasets[element[0]._datasetIndex].data[
        element[0]._index
      ];
      this.config.parentContext.props.editBubble(
        data,
        this.config.parentContext.state.selectedMarket,
        this.config.parentContext.state.selectedYear,
        this.config.parentContext.state.selectedCategory
      );
    } else {
      let yTop = this.chart.chartArea.top;
      let yBottom = this.chart.chartArea.bottom;
      let yMin = this.chart.scales["y-axis-0"].min;
      let yMax = this.chart.scales["y-axis-0"].max;
      let newY = 0;
      if (e.offsetY <= yBottom && e.offsetY >= yTop) {
        newY = Math.abs((e.offsetY - yTop) / (yBottom - yTop));
        newY = (newY - 1) * -1;
        newY = newY * Math.abs(yMax - yMin) + yMin;
      }
      let xTop = this.chart.chartArea.left;
      let xBottom = this.chart.chartArea.right;
      let xMin = this.chart.scales["x-axis-0"].min;
      let xMax = this.chart.scales["x-axis-0"].max;
      let newX = 0;
      if (e.offsetX <= xBottom && e.offsetX >= xTop) {
        newX = Math.abs((e.offsetX - xTop) / (xBottom - xTop));
        newX = newX * Math.abs(xMax - xMin) + xMin;
      }
      if (!this.config.parentContext.state.selectedMarket) {
        this.config.parentContext.props.showError("Please Select a market");
      } else if (this.config.parentContext.state.selectedCategory == 0) {
        this.config.parentContext.props.showError("Please Select a Category");
      } else {
        this.config.parentContext.props.editBubble(
          {
            newX,
            newY,
          },
          this.config.parentContext.state.selectedMarket,
          this.config.parentContext.state.selectedYear,
          this.config.parentContext.state.selectedCategory
        );
      }
    }
  }
  reloadBubbleChart() {
    const {
      finalObject,
      selectedMarket,
      selectedYear,
      selectedCategory,
    } = this.state;

    let result = {};
    if (selectedMarket) {
      result = {
        ...(finalObject[selectedMarket.id]
          ? finalObject[selectedMarket.id]
          : { label: selectedMarket.label }),
      };
    } else {
      result = {
        label: "",
      };
    }
    if (result.data) {
      result.data = result.data.filter(
        (x) =>
          x.year == selectedYear &&
          (x.vendor_category_id == selectedCategory ||
            x.category_id == selectedCategory)
      );

      result.backgroundColor = result.data
        .filter(
          (x) =>
            x.year == selectedYear &&
            (x.vendor_category_id == selectedCategory ||
              x.category_id == selectedCategory)
        )
        .map((x) => x.color);
    }
    this.setState(
      (currState) => ({
        ...currState,
        resultData: result,
      }),
      () => this.myChart.update()
    );
  }
  fetchData = () => {
    this.props.showLoader();
    this.loading = true;
    if (this.props.serverSide && this.loading) {
      crudService._getAll(this.props.url, []).then(
        ({ data }) => {
          let { finalObject } = this.groupSimilarMarket(data);
          this.setState(
            (currState) => ({
              ...currState,
              finalObject,
            }),
            () => this.reloadBubbleChart()
          );
          this.props.hideLoader();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.props.showError(error.message);
          this.props.hideLoader();
        }
      );
    }
  };

  groupSimilarMarket(data) {
    let groupedData = _.groupBy(data, "market");
    let finalObject = Object.keys(groupedData).map((key) => {
      return {
        data: groupedData[key].map((value) => ({
          x: value.bubble_x,
          y: parseInt(value.bubble_y),
          r: value.bubble_size,
          label: value.bubble_name,
          id: value.id,
          color: value.bubble_color + "99",
          year: value.year,
          vendor_category_id: value.vendor_category_id,
          category_id: value.category_id,
          revenue: value.revenue,
        })),
        backgroundColor: groupedData[key].map(
          (value) => value.bubble_color + "99"
        ),
        label: groupedData[key].length ? groupedData[key][0].market_name : "",
        id: key,
      };
    });
    finalObject = finalObject.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: curr,
      };
    }, {});
    return { finalObject };
  }
  fetchVendorCategories() {
    this.props.showLoader();
    this.loading = true;
    if (this.props.serverSide && this.loading) {
      crudService._getAll("vendors/vendor_category", []).then(
        ({ data }) => {
          this.setState({ vendor_categories: data });
          this.props.hideLoader();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.props.showError(error.message);
          this.props.hideLoader();
        }
      );
    }
  }
  componentWillReceiveProps() {
    this.fetchData();
  }
  componentDidMount() {
    this.fetchData();
    this.fetchVendorCategories();
    this.myChart = new Chart(this.chartRef.current, this.config);
    this.myChart.canvas.parentNode.style.height = "720px";
    this.myChart.canvas.parentNode.style.width = "720px";
    this.myChart.canvas.parentNode.style.marginLeft = "auto";
    this.myChart.canvas.parentNode.style.marginRight = "auto";
  }
  changeMarket(data) {
    this.setState(
      (currState) => ({
        ...currState,
        ...data,
      }),
      () => this.reloadBubbleChart()
    );
    // this.fetchData();
  }

  render() {
    const { resultData } = this.state;
    this.config.data.datasets = [resultData];
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem
            xs={4}
            style={{
              marginTop: "10px",
              marginLeft: "20px",
              marginRight: "-30px",
            }}
          >
            <Search
              onChange={(v) => this.changeMarket({ selectedMarket: v })}
            />
          </GridItem>
          <GridItem xs={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.selectedCategory}
              style={{ width: "100%" }}
              onChange={(v) =>
                this.changeMarket({ selectedCategory: v.target.value })
              }
            >
              <MenuItem value={0} disabled>
                Select
              </MenuItem>
              {this.state.vendor_categories.map((x) => (
                <MenuItem value={x.id}>{x.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Category</FormHelperText>
          </GridItem>
          <GridItem xs={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.selectedYear}
              onChange={(v) =>
                this.changeMarket({ selectedYear: v.target.value })
              }
            >
              {YEAR().map((x) => (
                <MenuItem value={x.id}>{x.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Year</FormHelperText>
          </GridItem>
          <GridItem xs={2}>
            <IconButton
              aria-label="edit"
              onClick={() =>
                downloadImage("competitiveDynamicGraph", "CompetitiveGraph")
              }
            >
              <GetAppIcon fontSize="small" />
            </IconButton>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem
            xs={12}
            style={{ margin: "auto", overflowX: "auto", overflowY: "hidden" }}
          >
            <div
              className="chart-container"
              id="competitiveDynamicGraph"
              style={{ overflowX: "auto", overflowY: "hidden" }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  // marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    className={this.props.classes.indicators}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "4.3%",
                    }}
                  >
                    <p
                      className="leaders"
                      style={{
                        padding: "14.5%",
                        paddingBottom: "13.3%",
                        color: "#707070",
                      }}
                    >
                      Leaders
                    </p>
                  </div>
                  <div
                    className={`${this.props.classes.indicators} ${this.props.classes.compDynMiddleText}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      margin: "7%",
                      marginTop: "0%",
                      marginLeft: "10%",
                    }}
                  >
                    <p
                      className="challengers"
                      style={{
                        padding: "14.5%",
                        background: "none",
                        color: "#707070",
                      }}
                    >
                      Challengers
                    </p>
                  </div>
                  <div
                    className={this.props.classes.indicators}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignContent: "center",
                      marginLeft: "26px",
                      marginTop: "-5.7%",
                    }}
                  >
                    <p
                      className="players"
                      style={{
                        padding: "15%",
                        paddingTop: "14%",
                        color: "#707070",
                      }}
                    >
                      Emerging Players
                    </p>
                  </div>
                </div>
              </div>
              {resultData && (
                <canvas
                  style={{ position: "relative", marginBottom: "140px" }}
                  ref={this.chartRef}
                />
              )}
            </div>
          </GridItem>
        </GridContainer>
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
  downloadFile: crudActions._download,
};
const styles = {
  indicators: {
    opacity: "0.3",
    fontSize: "2.5rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1",
    letterSpacing: "0.2px",
    color: "#000",
    position: "relative",
    bottom: "0",
    right: "0",
    "& p": {
      backgroundColor: "#f3e4f6",
      padding: "7rem",
      width: "20px",
      height: "20px",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      borderRadius: "7px",
      textAlign: "center",
    },
    "& p:nth-child(2)": {
      backgroundColor: "transparent",
    },
  },
};
export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(BubbleChart));
