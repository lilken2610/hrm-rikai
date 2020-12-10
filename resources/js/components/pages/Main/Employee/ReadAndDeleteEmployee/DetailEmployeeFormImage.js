import React,{Component} from 'react';
import { IMAGE_URL } from "../../../../CONSTANT/Constants";
class DetailEmployeeFormImage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="col-sm-3 col-md-3 image shadow-sm  bg-light rounded">
            <img
                className="image"
                src={
                    IMAGE_URL +
                    "/" +
                    this.props.employee.image
                }
                alt="picture"
            />
        </div>
         );
    }
}
 
export default DetailEmployeeFormImage;