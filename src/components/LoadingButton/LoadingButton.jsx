import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Spinner.scss';
import './LoadingButton.scss';

class LoadingButton extends PureComponent {
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
  }

  doneLoading = () =>
    setTimeout(
      () =>
        this.setState({
          isLoading: false,
        }),
      200
    );

  handleOnClick = async (event) => {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });
    try {
      await this.props.handleOnClick(event);
      this.doneLoading();
    } catch (error) {
      this.doneLoading();
    }
  };

  render() {
    const { text, type, disabled } = this.props;
    return (
      <button
        type={type}
        className={`btn
          ${this.props.className} 
          ${this.state.isLoading ? 'loading' : ''}
       `}
        disabled={disabled}
        onClick={this.handleOnClick}>
        <div className='spinner' />
        <p className='text'>{text}</p>
      </button>
    );
  }
}

export default LoadingButton;
