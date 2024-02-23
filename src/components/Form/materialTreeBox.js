import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import SvgIcon from "@material-ui/core/SvgIcon";
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { crudService } from "../../_services";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CustomizedTreeView(props) {
  const classes = useStyles();
  const [options, setOptions] = useState([]);

  let selectedData = [];

  const checkNode = (e, node) => {
    let data = props.formField.value;

    node.forEach((element) => {
      if (!data.includes(element)) {
        data.push(element);
      } else {
        const indexValue = data.findIndex((value) => value === element);
        data.splice(indexValue, 1);
      }
    });

    const event = {
      target: {
        name: props.formField.name,
        value: data,
      },
    };
    props.handleInputChange(event);
  };

  useEffect(() => {
    async function fetchData() {
      const { formField } = props;
      await crudService._getAllWithParam(formField.url, {}).then((result) => {
        if (result.status === 200) {
          setOptions(result.data);
        }
      });
    }
    fetchData();
  }, []);

  const getLabel = (element) => {
    const { formField } = props;
    return element[formField.getOptionLabel];
  };
  const getValue = (element) => {
    const { formField } = props;
    return element[formField.getOptionValue];
  };

  const renderNode = (option) => {
    return (
      <StyledTreeItem nodeId={getValue(option)} label={getLabel(option)} />
    );
  };

  const renderChildren = (option) => {
    return (
      <StyledTreeItem nodeId={getValue(option)} label={getLabel(option)}>
        {option.children &&
          option.children.map((children) => {
            if (children.children) {
              return renderChildren(children);
            } else {
              return renderNode(children);
            }
          })}
      </StyledTreeItem>
    );
  };

  const checkAllData = (element) => {
    selectedData.push(getValue(element));
    if (element.children) {
      element.children.forEach((children) => {
        checkAllData(children);
      });
    }
  };

  const checkAllEv = (e) => {
    if (e.target.checked) {
      if (options) {
        options.forEach((element) => {
          checkAllData(element);
        });
      }
    } else {
      selectedData = [];
    }

    const event = {
      target: {
        name: props.formField.name,
        value: selectedData,
      },
    };
    props.handleInputChange(event);
  };

  return (
    <div>
      <FormControl
        error={props.formField.helperText ? true : false}
        fullWidth={props.formField.fullWidth}
      >
        <FormControlLabel
          control={<Checkbox onChange={(e) => checkAllEv(e)} color="primary" />}
          label={props.formField.label}
        />

        <div style={{ marginTop: 10 }}>
          <TreeView
            className={classes.root}
            expanded={props.formField.value}
            defaultSelected={props.formField.value}
            selected={props.formField.value}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
            multiSelect
            onNodeSelect={checkNode}
          >
            {options &&
              options.map((option) => {
                if (option.children) {
                  return renderChildren(option);
                } else {
                  return renderNode(option);
                }
              })}
          </TreeView>
        </div>
        {props.formField.helperText && (
          <FormHelperText>{props.formField.helperText}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
