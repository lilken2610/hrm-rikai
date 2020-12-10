import React, { Component } from "react";
class MultiLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <li className="language">
                    <a href="http://127.0.0.1:8000/locale/en">
                        <img
                            src="http://127.0.0.1:8000/assets/images/england.png"
                            width="10"
                            height="10"
                        />
                        <small>EN</small>
                    </a>
                </li>
                <li className="language">
                    <a href="http://127.0.0.1:8000/locale/jp">
                        <img
                            src="http://127.0.0.1:8000/assets/images/japan.png"
                            width="10"
                            height="10"
                        />
                        <small>JP</small>
                    </a>
                </li>
            </>
        );
    }
}

export default MultiLanguage;
