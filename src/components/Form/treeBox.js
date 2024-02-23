import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { crudService } from "../../_services";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faFile,
  faFolder,
  faFolderOpen,
  faSquare,
  faChevronRight,
  faChevronDown,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FormLabel } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CustomizedTreeView(props) {
  const [options, setOptions] = useState([]);

  const [expanded, setExpanded] = useState([]);

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

  const onCheck = (data) => {
    const event = {
      target: {
        name: props.formField.name,
        value: data,
      },
    };
    props.handleInputChange(event);
  };
  const onExpand = (data) => {
    setExpanded(data);
  };

  const swaps = {
    [props.formField.getOptionLabel]: "label",
    [props.formField.getOptionValue]: "value",
  };
  const pattern = new RegExp(
    Object.keys(swaps)
      .map((e) => `(?:"(${e})":)`)
      .join("|"),
    "g"
  );
  const newOptions = JSON.parse(
    JSON.stringify(options).replace(
      pattern,
      (m) => `"${swaps[m.slice(1, -2)]}":`
    )
  );
  const nodes = JSON.parse(
    JSON.stringify(newOptions).replace(
      new RegExp(`,"children":\\[\\]`, "g"),
      ""
    )
  );

  return (
    <div>
      <FormControl
        error={props.formField.helperText ? true : false}
        fullWidth={props.formField.fullWidth}
      >
        <FormLabel>{props.formField.label}</FormLabel>

        <div style={{ marginTop: 20 }}>
          <CheckboxTree
            label={props.formField.label}
            nodes={nodes}
            checked={props.formField.value ? props.formField.value : []}
            expanded={expanded}
            onCheck={(checked) => onCheck(checked)}
            onExpand={(expanded) => onExpand(expanded)}
            disabled={props.formField.disabled}
            icons={{
              check: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-check"
                  icon={faCheckSquare}
                />
              ),
              uncheck: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-uncheck"
                  icon={faSquare}
                />
              ),
              halfCheck: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-half-check"
                  icon={faCheckSquare}
                />
              ),
              expandClose: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-expand-close"
                  icon={faChevronRight}
                />
              ),
              expandOpen: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-expand-open"
                  icon={faChevronDown}
                />
              ),
              expandAll: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-expand-all"
                  icon={faPlusSquare}
                />
              ),
              collapseAll: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-collapse-all"
                  icon={faMinusSquare}
                />
              ),
              parentClose: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-parent-close"
                  icon={faFolder}
                />
              ),
              parentOpen: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-parent-open"
                  icon={faFolderOpen}
                />
              ),
              leaf: (
                <FontAwesomeIcon
                  className="rct-icon rct-icon-leaf-close"
                  icon={faFile}
                />
              ),
            }}
          />
        </div>
        {props.formField.helperText && (
          <FormHelperText>{props.formField.helperText}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
