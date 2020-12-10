import React, { Component } from "react";
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <footer>
                <div className="pull-right">
                    Rikai Technology by
                    <a href="https://colorlib.com">Japan</a>
                </div>
                <div className="clearfix"></div>
            </footer>
        );
    }
}

export default Footer;
