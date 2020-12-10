import { styleWorking } from "../../../../CSS/styleworking";
import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import InputSearch from "./Input";
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputId : {}
    }
  }

  render() {
    return (
      <form
        onSubmit={event => {
          this.props.searchListTime(event);
        }}
       
      >
        <div className="frmsearch">
        <div className="row">
                        <div className="col-md-12">
                            <div className="x_panel">
                                <div className="x_content">
                                    <section className="content invoice">
                                        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col">
              <InputSearch 
                label={"ID:"}
                type={"text"}
                id={"idemployee"}
                name={"id"}
                placeholder={"Enter ID"}
                setValueInput={this.props.setValueInput}
                ref={(node) => { this.id = node; }}  
              />
                <InputSearch 
                label={"Name:"}
                ref={(node) => { this.name = node; }}  
                type={"text"}
                id={"name"}
                name={"name"}
                placeholder={"Enter name"}
                setValueInput={this.props.setValueInput}
              />
              </div>
              <div className="col">
              <InputSearch 
                label={"Start Day:"}
                ref={(node) => { this.startday = node; }}  
                type={"date"}
                id={"startday"}
                name={"startday"}
                placeholder={""}
                setValueInput={this.props.setValueInput}
              />
                <InputSearch 
                label={"End Day:"}
                ref={(node) => { this.endday = node; }}  
                type={"date"}
                id={"endday"}
                name={"endday"}
                placeholder={""}
                setValueInput={this.props.setValueInput}
              />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row" style={{ margin: "20px" }}>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-5"></div>
              <div className="col-sm-8 col-md-8 col-lg-8 col-xl-7">
                <button
                  type="submit"
                  className="btn btn-primary col"
                  style={styleWorking.btnPrimary}
                >
                  Search
                </button>
                <Link
                  to={"/add-time"}
                  className="btn btn-success col"
                  style={{
                    color: "white",
                    minWidth: "82px",
                    lineHeight: "1.8"
                  }}
                >
                  Add time
                </Link>
                <button
                  type="button"
                  onClick={this.props.clearSearchInput}
                  className="btn btn-secondary "
                  style={styleWorking.btnSecondary}
                 
                >
                  Clear
                </button>
              </div>
            </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            </div>
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={styleWorking.lableRow}
              id="basic-addon1"
            >
              Row:
            </span>
            <select
              style={styleWorking.selectRow}
              name="record"
              id="record"
              onChange={event => {
                this.props.searchRowListTime(event);
              }}
            >
              {this.props.rows.map((row, index) => (
                <option value={row} key={index}>
                  {row}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    );
  }
}
export default SearchForm;
