import React from 'react';
import ReactDOM from "react-dom";

export default class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          ...this.props.style
        }}
        onMouseOver={this.props.onMouseOverModal}
        onMouseEnter={this.props.onMouseOverModal}
        onMouseOut={this.props.onMouseOutModal}
      >
        {this.props.children}
      </div>,
      document.getElementById("root")
    );
  }
}