import React, {Component} from 'react';
class UpdateEmployeeFormButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="ln_solid">
                <div className="form-group">
                    <div className="col-md-6 offset-md-3">
                        <button type="submit" className="btn btn-success save">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={event => this.props.cancelButton(event)}
                            className="cancel-modal btn btn-secondary cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeFormButton;
