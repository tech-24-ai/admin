import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { crudService } from '../../_services';
import ReactSelectMaterialUi from "react-select-material-ui";

class MuiAutocompleteBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: [],
            value: ''
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { url } = this.props
        crudService._getAllWithParam(url, {})
            .then(
                result => {
                    if (result.status === 200) {
                        this.setState({
                            options: result.data,
                        })
                    }
                }
            );
    }

    handleChange = (value, name) => {        
        this.props.handleChange(value, name, [])
    }



    render() {
        const { name, label, value } = this.props

        const { options } = this.state
        let selectOptions = []
        if (options) {
            options.forEach(element => {
                selectOptions.push({
                    label: element.name,
                    value: element.id,
                })
            });
        }



        return (
            <React.Fragment>
                <FormControl
                    fullWidth={true}
                >

                    <ReactSelectMaterialUi
                        label={label}
                        value={value}
                        options={selectOptions}
                        onChange={(e) => this.handleChange(e, name)}
                        SelectProps={{
                            isClearable: true,
                        }}
                    />
                </FormControl>
            </React.Fragment>
        )

    }
}

export default MuiAutocompleteBox;