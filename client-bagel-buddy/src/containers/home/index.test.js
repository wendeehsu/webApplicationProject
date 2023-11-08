import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './index';

test('Headings on homepage', () => {
  render(<BrowserRouter><HomePage /></BrowserRouter>);
  const headingElement = screen.getAllByRole("heading");
  expect(headingElement[1]).toHaveTextContent("Upcoming");
  expect(headingElement[2]).toHaveTextContent("Recommended Teachers");
});