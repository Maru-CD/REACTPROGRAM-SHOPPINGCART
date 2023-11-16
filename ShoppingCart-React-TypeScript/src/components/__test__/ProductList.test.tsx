import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductList from '../ProductList';

test('renders ProductList component', () => {
  render(
      <ProductList />
  );

  // You can customize this based on your actual rendering logic
  const productListElement = screen.getByText(/main--products/i);

  expect(productListElement).toBeInTheDocument();
});
