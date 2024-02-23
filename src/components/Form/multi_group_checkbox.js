import React from 'react';
import { crudService } from '../../_services';
import { MaterialUiGroupCheckBox } from 'material-ui-group-checkbox'

class MuiGroupCheckBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { formField } = this.props
        crudService._getAllWithParam(formField.url, {})
            .then(
                result => {
                    if (result.status === 200) {
                        this.setState({
                            items: result.data,
                        })
                    }
                }
            );
    }

    handleChange = (value) => {
        const event = {
            target: {
                name: value.target.name,
                value: value.target.value,
            }
        }
        this.props.handleInputChange(event)
    }

    render() {
        const { formField } = this.props
        const { items } = this.state
        const options = {
            name: formField.name,
            label: formField.label,
            error: formField.error,
            value: formField.value,
            getOptionLabel: formField.getOptionLabel,
            getOptionValue: formField.getOptionValue,
            getChildOptionLabel: formField.getSubOptionLabel,
            getChildOptionValue: formField.getSubOptionValue,
        }
        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <MaterialUiGroupCheckBox items={items} options={options} handleInputChange={this.handleChange} />
            </div>
        )
    }
}


export default MuiGroupCheckBox