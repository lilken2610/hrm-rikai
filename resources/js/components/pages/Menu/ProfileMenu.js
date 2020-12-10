import React, { Component } from "react";
import cropper from '../../../../../public/images/cropper.jpg';
class ProfileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: [],
        };
      }

      componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "Authorization"
        );
        axios
          .get("http://127.0.0.1:8000/api/auth/user")
            .then((res) => {
              console.log(res.data.id)
            this.setState({
              user: res.data
            });
          })
          .catch((error) => console.log(error));
      }

    render() {
        const checkLogin = this.state.user;
        return (
            <div className="profile clearfix">
                {(() => {
                        if (checkLogin.id != null) {
                            return (
                                <>

            <div className="profile_pic">
                                        <img src={ checkLogin.avatar } alt="..." className="img-circle profile_img"/>
            </div>
            <div className="profile_info">
              <span>Welcome,</span>
                                        <h2>{ checkLogin.fullname }</h2>
            </div>
                                    </>
                                )
                            }
                         })()}
          </div>
         );
    }
}

export default ProfileMenu;
