import React from 'react';
import '@testing-library/jest-dom'
import user from "@testing-library/user-event";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Onboard from './index';

test('Nav headers in onboarding', () => {
  render(<BrowserRouter><Onboard /></BrowserRouter>);
  const headingElement = screen.getAllByRole("heading");
  expect(headingElement[0]).toHaveTextContent("Sign up");
  expect(headingElement[1]).toHaveTextContent("Log in");
});

test('user1 can login', () => {
  render(<BrowserRouter><Onboard /></BrowserRouter>);
  const emailElement = screen.getByLabelText(/email/i);
  const passwordElement = screen.getByLabelText(/password/i);
  const loginBtnElement = screen.getByRole("button", {
    name: /Log in/i
  });
  expect(emailElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(loginBtnElement).toBeInTheDocument();

  act(() => {
    user.type(emailElement, "user1@gmail.com");
    user.type(passwordElement, "user1");
    user.click(loginBtnElement);
  });

  expect(window.location.pathname).toEqual('/');
});
