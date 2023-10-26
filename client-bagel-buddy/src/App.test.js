import { render, screen } from '@testing-library/react';
import App from './App';

test('render logo with brand name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bagel Buddies/i);
  expect(linkElement).toBeInTheDocument();
});
