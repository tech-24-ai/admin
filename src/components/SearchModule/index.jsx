import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { crudActions, alertActions } from '../../_actions';
import { TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import { crudService } from '../../_services';
class SearchBox extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchValue: '',
            aboutValue: '',
            modules: []
        }
    }

    onSearchEvent = () => {
        let moduleId = null
        const { router } = this.props

        if (sessionStorage.getItem('childrenIds')) {
            const childrenIdsession = JSON.parse(sessionStorage.getItem('childrenIds'))
            childrenIdsession.forEach(element => {
                moduleId = element
            });
        }

        if (moduleId) {
            router.push('/modules')
        } else {
            this.props.showError('Please Enter Market')
        }
    }

    getParentData = (array) => {
        let childrenIds = []
        if (array.parent) {
            this.getParentData(array.parent)
            childrenIds.push(array.id)
        } else {
            sessionStorage.setItem('moduleId', array.id)
        }
        sessionStorage.setItem('childrenIds', JSON.stringify(childrenIds))
    }

    onChange = (event, node) => {
        if (typeof event === 'string') {
            this.props.showError('Please Select Child Market')
        } else {
            this.props.onChange({label:node.title,id:event})
        }

    }

    componentDidMount() {
        crudService._getAll('module/categories?not_categories=[5]', {})
            .then(
                result => {
                    this.setState({ modules: result.data })
                }
            );
    }

    renderChildren = (array) => {
        let result = []
        const localArray = array;
        for (let i = 0; i < localArray.length; i++) {
            let node = localArray[i];
            const finalArray = {
                title: localArray[i].name,
                value: localArray[i].id,
                about: localArray[i].about,
                category_id: localArray[i].category_id,
                parent_id: localArray[i].parent_id,
                bg_color: localArray[i].bg_color ? localArray[i].bg_color : '',
                children: node.children && this.renderChildren(node.children)
            }

            result.push(finalArray)
        }
        return result;
    }

    render() {
        const { aboutValue, modules, searchValue } = this.state
        const { isHeader } = this.props

        let selectedValue

        if (typeof searchValue != 'string') {
            selectedValue = searchValue
        }

        return (
            <React.Fragment>
                {isHeader ?
                    <FormGroup className="search-box-wrapper">
                        <TreeSelect
                            showSearch
                            style={{ width: '90%', float: 'left' }}
                            value={selectedValue || undefined}
                            placeholder="Enter technology"
                            treeNodeFilterProp="title"
                            showArrow={false}
                            treeData={modules && modules.length > 0 && this.renderChildren(modules)}
                            onSelect={this.onChange}
                        />
                    </FormGroup>
                    :
                    <Row>
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} className="search-block">
                            <FormGroup className="search-box-wrapper">
                                <TreeSelect
                                    showSearch
                                    style={{ width: '90%', float: 'left' }}
                                    value={this.state.searchValue || undefined}
                                    placeholder="Select Market for creating chart"
                                    showArrow={false}
                                    treeNodeFilterProp="title"
                                    treeData={modules && modules.length > 0 && this.renderChildren(modules)}
                                    onSelect={this.onChange}
                                />
                            </FormGroup>
                            {aboutValue}
                        </Col>
                    </Row>
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication, confirm } = state;
    const { user } = authentication;
    return { user, confirm };
}

const actionCreators = {
    showError: alertActions.error,
    clears: crudActions._clear,
}

export default connect(mapStateToProps, actionCreators)(SearchBox);
