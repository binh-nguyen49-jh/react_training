import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LoadingButton.scss';

class LoadingButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    handleOnClick: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    type: 'button',
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.className = `btn
      ${this.props.className} 
      ${this.state.isLoading ? 'loading' : ''}
    `;
  }

  doneLoading = () =>
    setTimeout(
      () =>
        this.setState({
          isLoading: false,
        }),
      700
    );

  handleOnClick = async (event) => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });
    try {
      await this.props.handleOnClick(event);
    } finally {
      this.doneLoading();
    }
  };

  render() {
    const { text, type, disabled } = this.props;
    return (
      <button
        type={type}
        className={this.className}
        disabled={disabled}
        onClick={this.handleOnClick}>
        <div className='spinner' />
        <p className='text'>{text}</p>
      </button>
    );
  }
}

export default React.memo(LoadingButton);
