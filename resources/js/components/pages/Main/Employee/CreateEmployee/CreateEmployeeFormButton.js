import React,{Component} from 'react';

class CreateEmployeeFormButton extends Component {
    constructor(props) {
        super(props);       
    }  
    render() { 
        return (
            <div className="ln_solid">
                <div className="form-group">
                    <div className="col-md-6 offset-md-3">
                        <button
                             id='button'
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                        <button
                            id='button'
                            type="button"
                            className="btn btn-secondary"
                            onClick={event => {
                                this.props.handleReset(
                                    event
                                );
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
          );
    }
}
 
export default CreateEmployeeFormButton;