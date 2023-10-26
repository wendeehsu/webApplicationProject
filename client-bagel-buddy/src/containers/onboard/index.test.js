import { render, screen } from '@testing-library/react';
import Onboard from './index';

test('find sign up in onboarding', () => {
  render(<Onboard />);
  const linkElement = screen.getAllByRole("heading");
  expect(linkElement[0]).toHaveTextContent('Sign up');
  expect(linkElement[1]).toHaveTextContent('Log in');
});
