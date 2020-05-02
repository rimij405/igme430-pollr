// ////////////////////////
// MODULE / LIBRARY IMPORT
// ////////////////////////

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './inputs/Input';
import Label from './inputs/Label';

// ////////////////////////
// MEMBERS
// ////////////////////////

// Password Field object.
class PasswordField extends Component {
  render() {
    const {
      id,
      title,
      name,
      value,
      placeholder,
    } = this.props;

    return (<React.Fragment>
      <Label name={name} title={title} ></Label>
      <Input type="password" id={id} name={name} value={value} placeholder={placeholder} ></Input>
    </React.Fragment>);
  }
}

// Password.
PasswordField.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

// ////////////////////////
// EXPORT
// ////////////////////////

export default PasswordField;
