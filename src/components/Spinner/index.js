import React, { Fragment } from "react";
import "./style.css";
const Spinner = () => (
  <Fragment>
    <div id="loading">
      <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Spinner;
