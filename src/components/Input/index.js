import React from 'react';
import PropTypes from 'prop-types';

import { Container, TextInput } from './styles';

export default function Input({ style, ...rest }) {
  return (
    <Container style={style}>
      <TextInput {...rest} />
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  style: {},
};
