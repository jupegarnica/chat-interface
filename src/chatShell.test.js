import React from 'react';
import ReactDOM from 'react-dom';
import ChatShell from './chatShell';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatShell />, div);
});
