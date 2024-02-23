import React from "react";
import CompetitiveLandsacpe from "pages/VendorModule/CompetitiveDynamic/List.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import MailOutline from "@material-ui/icons/Business";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CardBody from "components/Card/CardBody.js";

class CompetitiveDynamic extends React.PureComponent {
  render() {
    let title = "Competitive Landscape";
    let { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={14} sm={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <MailOutline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{title}</h4>
            </CardHeader>
            <CardBody>
              <CompetitiveLandsacpe url={"competitive-landscape"} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
CompetitiveDynamic.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CompetitiveDynamic);
