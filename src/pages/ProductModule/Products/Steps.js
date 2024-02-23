import React from "react";
import { connect } from "react-redux";
import MuiForm from "../../../components/QuestionForm";
import { stepActions, modalActions } from "../../../_actions";
class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: this.props.stepsData || [],
    };
  }

  componentDidMount() {
    const { moduleId } = this.props;

    const filter = {
      module_id: moduleId,
      admin: true,
    };

    this.props.getData("app/steps", filter);
  }

  createForm = () => {
    const { questionSteps } = this.props;
    const { form } = this.state;
    let steps = [];

    if (questionSteps) {
      questionSteps.forEach((element) => {
        let stepData = [];
        if (element.questions) {
          element.questions.forEach((question) => {
            let value;
            let subValue;
            let priority;
            if (form) {
              form.map((element) => {
                if (element.id == question.id) {
                  value = element.value;
                  subValue = element.subValue;
                  priority = element.priority;
                }
                return null;
              });
            }

            let options = [];
            let option_type;
            if (question.option_type === "country_select") {
              option_type = "autocomplete";
              options = "countries";
            } else if (question.option_type === "industry_select") {
              option_type = "autocomplete";
              options = "industries";
            } else {
              // option_type = question.option_type
              option_type = "checkbox";
              options = question.options;
            }

            stepData.push({
              name: question.id,
              label: question.name,
              type: option_type,
              options: options,
              value: value,
              subValue: subValue,
              priority: priority,
            });
          });
        }
        // set steps

        steps.push({
          label: element.name,
          formFields: stepData,
        });
      });
    }
    return steps;
  };

  handleChange = (value, name, subValue) => {
    const { form } = this.state;
    let fieldName;
    if (!["country_select", "industry_select"].includes(name)) {
      fieldName = Number(name);
    } else {
      fieldName = name;
    }
    if (form) {
      form.forEach((element, index) => {
        if (element.id === fieldName) {
          form.splice(index, 1);
          form.push({
            ...element,
            value: value,
            subValue: subValue,
          });
        }
      });
    }
    this.setState(form);
  };

  handlePriorityChange = (name, priority) => {
    const { form } = this.state;
    if (form) {
      form.forEach((element, index) => {
        if (element.id === name) {
          form.splice(index, 1);
          form.push({
            ...element,
            priority: priority,
          });
        }
      });
    }
    this.setState(form);
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.form);
    this.props.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        <MuiForm
          steps={this.createForm()}
          handleChange={this.handleChange}
          handlePriorityChange={this.handlePriorityChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.goBack}
          submitText="Submit"
          submitFullWidth={false}
          fullWidth={true}
          noValidate={false}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { questionSteps } = state;
  return { questionSteps };
};

const actionCreators = {
  getData: stepActions._getAll,
  closeModal: modalActions.close,
};

export default connect(
  mapStateToProps,
  actionCreators
)(Form);
