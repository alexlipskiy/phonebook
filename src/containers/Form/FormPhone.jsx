import React, { PureComponent } from 'react';
import { Dialog, FlatButton, TextField, DatePicker } from 'material-ui';
import { FIELDS, OPTIONS_DATE } from "../../constants";
import "./form-phone.scss";

export default class FormPhone extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { fields: props.fields || FIELDS, done: props.defaultDone };
    }

    handleChange = (val, name) => {
        const { fields } = this.state;
        const newFields = [...fields];
        const findItem = newFields[fields.findIndex(i => i.name === name)];

        if (findItem.errorRules) findItem.error = !findItem.errorRules.test(val);

        findItem.value = val;
        const done = fields.every(i => i.errorRules ? (!i.error && i.value) : true);
        this.setState({ fields: newFields, done });
    };

    handleCreatePhone = () => {
        const { fields } = this.state;
        const { handleSuccess, id } = this.props;

        const values = {};
        fields.map(i => values[i.name] = i.value);
        handleSuccess(id ? {...{'id': id}, ...values} : values);
        this.handleClose();
    };

    clearFields = () => {
        const { fields } = this.state;
        this.setState({fields: fields.map(i => { delete i.value; return i; })});
    };

    handleClose = () => {
        this.clearFields();
        this.props.handleCloseModal();
    };

    render() {
        const { open, label } = this.props;
        const { fields, done } = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label={label}
                primary={true}
                disabled={!done}
                onClick={this.handleCreatePhone}
            />,
        ];

        return (
            <Dialog title="Create a phone" open={open} actions={actions} onRequestClose={this.handleClose}>
               <div className="form-wrapper">
                   {
                       fields.map((i, k) => (
                           i.date
                             ? <DatePicker key={k}
                                           hintText={i.label}
                                           className="date-picker"
                                           autoOk={i.autoOk}
                                           defaultDate={i.value && new Date(i.value)}
                                           container={i.container}
                                           onChange={(e, date) => this.handleChange(new Date(date).toLocaleString('en-US', OPTIONS_DATE), i.name)}/>
                             : <TextField key={k}
                                          floatingLabelText={i.label}
                                          value={i.value}
                                          errorText={i.error && i.errorText}
                                          onChange={e => this.handleChange(e.target.value, i.name)}/>
                       ))
                   }
               </div>
            </Dialog>
        );
    }
}