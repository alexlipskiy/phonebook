import React, { PureComponent } from 'react';
import { Toolbar, RaisedButton, ToolbarGroup } from 'material-ui';
import FormPhone from "../Form/FormPhone";
import { observer } from 'mobx-react';
import "./header.scss";

@observer(['addPhone'])
export default class Header extends PureComponent {
    state = {
        open: false
    };

    handleOpenModal = () => this.setState({ open: true });

    handleCloseModal = () => this.setState({ open: false });

    render() {
        return (
            <div className="header">
                <Toolbar>
                    <ToolbarGroup>
                        <RaisedButton label="Create Phone" primary={true} onClick={this.handleOpenModal}/>
                    </ToolbarGroup>
                </Toolbar>
                <FormPhone label="create"
                           handleCloseModal={this.handleCloseModal}
                           handleSuccess={this.props.addPhone}
                           open={this.state.open}/>
            </div>
        );
    }
}