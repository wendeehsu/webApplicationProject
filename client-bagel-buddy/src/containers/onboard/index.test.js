import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Onboard from './index';

test('Nav headers in onboarding', () => {
  render(<BrowserRouter><Onboard /></BrowserRouter>);
  const headingElement = screen.getAllByRole("heading");
  expect(headingElement[0]).toHaveTextContent("Sign up");
  expect(headingElement[1]).toHaveTextContent("Log in");
});
