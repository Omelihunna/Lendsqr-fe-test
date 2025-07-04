import { render, screen } from '@testing-library/react';
import Loader from '../components/global/Loader';
import '@testing-library/jest-dom';

describe('Loader', () => {
  it('renders the loader', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
}); 