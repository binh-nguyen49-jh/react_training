import React, { Component } from "react";
import "./FormButton.scss";

class FormButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleOnClick = async () => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });
    try {
      await this.props.handleOnClick();
      setTimeout(
        () =>
          this.setState({
            isLoading: false,
          }),
        700
      );
    } catch (error) {
      setTimeout(
        () =>
          this.setState({
            isLoading: false,
          }),
        700
      );
    }
  };
  render() {
    return (
      <button
        type={this.type}
        className={`btn ${this.props.className} ${
          this.state.isLoading ? "loading" : undefined
        }`}
        onClick={this.handleOnClick}
      >
        <div className="spinner" />
        <p className="text">{this.props.text}</p>
      </button>
    );
  }
}

export default React.memo(FormButton);
