import React, { Component } from 'react';
import '../InputField/InputField.scss';
import './DropdownField.scss';
import PropTypes from 'prop-types';

class DropdownField extends Component {
  constructor(props) {
    super(props);
    const { options, defaultValues } = props;
    console.log(defaultValues);
    this.state = {
      value: defaultValues.join(', '),
      selected: new Array(options.length).fill(false).map((item, idx) => {
        return defaultValues.indexOf(options[idx]) !== -1 || false;
      }),
      isChoosing: false,
    };
    this.optionListRef = React.createRef(null);
    this.placeholderRef = React.createRef(null);
  }

  handleChange = (index) => {
    const { options, onChange, name } = this.props;
    const newSelected = [...this.state.selected];
    newSelected[index] = !newSelected[index];
    const newValue = newSelected
      .map((selected, idx) => (selected ? options[idx] : ''))
      .filter((val) => val.length > 0)
      .join(',');
    this.setState({
      selected: newSelected,
      value: newValue,
    });
    this.placeholderRef.current.value = newValue;
    onChange(name, newValue, '');
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
    const { value, selected, isChoosing } = this.state;
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
          defaultValue={value}
          readOnly={true}
          onBlur={this.validate}
        />
        <div className={`selectInput ${isChoosing ? 'show' : ''}`}>
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
                      checked={selected[index]}
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
  error: PropTypes.string,
  defaultValues: PropTypes.array,
};

DropdownField.defaultProps = {
  placeholder: '',
  name: '',
  label: '',
  options: [],
  className: '',
  defaultValues: [],
};

export default React.memo(DropdownField);
