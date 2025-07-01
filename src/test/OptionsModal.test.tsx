import { render, screen } from '@testing-library/react';
import OptionsModal from '../components/dashboard/modals/OptionsModal';
import '@testing-library/jest-dom';

describe('OptionsModal', () => {
  it('renders all options', () => {
    render(<OptionsModal />);
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Blacklist User/i)).toBeInTheDocument();
    expect(screen.getByText(/Activate User/i)).toBeInTheDocument();
  });
}); 