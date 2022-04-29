import React, { PureComponent } from 'react';
import '../InputField/InputField.scss';
import './DropdownField.scss';
import PropTypes from 'prop-types';

class DropdownField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selected: new Array(this.props.options.length).fill(false),
      isChoosing: false,
    };
    this.optionListRef = React.createRef(null);
    this.placeholderRef = React.createRef(null);
  }

  handleChange = (index) => {
    const newSelected = [...this.state.selected];
    newSelected[index] = !newSelected[index];
    const newValue = newSelected
      .map((selected, idx) => (selected ? this.props.options[idx] : ''))
      .filter((val) => val.length > 0)
      .join(',');
    this.setState({
      selected: newSelected,
      value: newValue,
    });
    this.placeholderRef.current.value = newValue;
    this.props.onChange(this.props.name, newValue, '');
  };

  validate = () => {
    this.props.onValidate(this.props.name, this.state.value);
  };

  componentDidMount() {
    // check click outside dropdown menu
    document.addEventListener(
      'click',
      (event) => {
        if (
          this.state.isChoosing &&
          this.optionListRef.current &&
          !this.optionListRef.current.contains(event.target)
        ) {
          this.setState({
            isChoosing: false,
          });
        }
      },
      false
    );
  }

  render = () => {
    const { label, name, options, className, error, placeholder } = this.props;
    return (
      <div ref={this.optionListRef} className={`formInput select ${className}`}>
        <input
          ref={this.placeholderRef}
          onClick={() =>
            this.setState({
              isChoosing: true,
            })
          }
          id={`placeholder-${name}`}
          type='text'
          placeholder={placeholder}
          defaultValue={this.state.value}
          readOnly={true}
          onBlur={this.validate}
        />
        <div className={`selectInput ${this.state.isChoosing ? 'show' : ''}`}>
          <ul className='optionList'>
            {options.map((option, index) => {
              return (
                <li key={index}>
                  <div className='optionItem'>
                    <input
                      type='checkbox'
                      id={option}
                      name={name}
                      value={option}
                      checked={this.state.selected[index]}
                      onChange={() => this.handleChange(index)}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <label htmlFor={`placeholder-${name}`}>{label}</label>
        <span className='inputError'>{error}</span>
      </div>
    );
  };
}

DropdownField.propTypes = {
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
};

DropdownField.defaultProps = {
  placeholder: '',
  name: '',
  label: '',
  options: [],
  className: '',
};

export default React.memo(DropdownField);
