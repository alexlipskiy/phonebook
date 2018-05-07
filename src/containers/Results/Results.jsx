import React, { PureComponent } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { FIELDS, FIELD_OPTIONS } from '../../constants';
import { Dialog, FlatButton, SelectField, MenuItem, AutoComplete } from 'material-ui';
import FormPhone from '../Form/FormPhone';
import { observer } from 'mobx-react';
import "./results.scss";

@observer(['editPhone', 'removePhone'])
export default class Results extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            openEdit: false,
            sortBy: '',
            phones: props.phones,
            openRemove: false,
            defaultSelectSearch: 'firstName',
            selectedValue: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.phones !== this.props.phones) this.setState({ phones: nextProps.phones });
    }

    handleEdit = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const fields = FIELDS.map(e => {
            e.value = item[e.name];
            return e;
        });

        this.setState({ fields, openEdit: true, id: item.id });
    };

    handleCloseModal = modal => this.setState({ [modal]: false, id: null });

    handleShowRemoveModal = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ openRemove: true, saveItem: index });
    };

    handleRemoveItem = () => {
        const { removePhone } = this.props;
        const { saveItem } = this.state;
        removePhone(saveItem);
        this.setState({ openRemove: false });
    };

    handleChangeSelectSearch = (event, index, value) => this.setState({ defaultSelectSearch: value });

    handleSearch = val => {
        const { phones } = this.props;
        const { defaultSelectSearch } = this.state;

        if (!val) return this.setState({ phones: phones });

        this.setState({ phones: phones.filter(i => defaultSelectSearch === 'id'
                                        ? parseInt(val) === parseInt(i[defaultSelectSearch])
                                        : i[defaultSelectSearch].includes(val)) });
    };

    handleSort = (event, index, value) => {
        const phones = this.state.phones;
        const rules = (a, b) => {
            if (['firstName', 'lastName'].includes(value)) {
                return a[value] > b[value];
            } else if (value === 'dateOfBirth') {
                return new Date(a[value]) - new Date(b[value]);
            } else {
                return a[value] - b[value];
            }
        };

        this.setState({ phones: phones.sort(rules), sortBy: FIELD_OPTIONS.find(i => i.key === value).key });
    };

    render() {
        const { editPhone, phones } = this.props;
        const { openEdit, fields, openRemove, defaultSelectSearch, sortBy, id } = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleCloseModal('openRemove')}
            />,
            <FlatButton
                label={"Remove"}
                primary={true}
                onClick={this.handleRemoveItem}
            />,
        ];

        return (
            <div className="wrapper-table">
                <Table multiSelectable={true}>
                    <TableHeader>
                        <TableRow>
                            { FIELD_OPTIONS.map((item, key) => <TableHeaderColumn key={key}>{item.value}</TableHeaderColumn>) }
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            this.state.phones.map((i, k) => (
                                <TableRow key={k}>
                                    { Object.values(i).map((value, key) => <TableRowColumn key={key}>{value}</TableRowColumn>) }
                                    <TableRowColumn>
                                        <FlatButton label="Edit" onClick={e => this.handleEdit(e, i)}/>
                                        <FlatButton label="Remove" onClick={e => this.handleShowRemoveModal(e, i)}/>
                                    </TableRowColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <Dialog open={openRemove} actions={actions} onRequestClose={() => this.handleCloseModal('openRemove')}>
                    Are you sure that that you want to delete this item?
                </Dialog>
                <FormPhone open={openEdit}
                           fields={fields}
                           label={'Edit'}
                           id={id}
                           defaultDone={true}
                           handleSuccess={editPhone}
                           handleCloseModal={() => this.handleCloseModal('openEdit')}/>
                <div className="search">
                    <SelectField
                        floatingLabelText="By search"
                        value={FIELD_OPTIONS.find(i => i.key === defaultSelectSearch).key}
                        onChange={this.handleChangeSelectSearch}>
                        { FIELD_OPTIONS.map((item, key) => <MenuItem key={key} value={item.key} primaryText={item.value}/>) }
                    </SelectField>
                    <AutoComplete floatingLabelText="search"
                                  onUpdateInput={this.handleSearch}
                                  dataSource={phones.map(i => i[defaultSelectSearch])}
                                  onNewRequest={this.handleSearch}/>
                    <SelectField
                        floatingLabelText="Sort by"
                        value={sortBy}
                        onChange={this.handleSort}>
                        { FIELD_OPTIONS.map((item, key) => <MenuItem key={key} value={item.key} primaryText={item.value}/>) }
                    </SelectField>
                </div>
            </div>
        );
    }
}