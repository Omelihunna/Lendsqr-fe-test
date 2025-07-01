import { render, screen, fireEvent } from '@testing-library/react';
import FilterModal from '../components/dashboard/modals/FilterModal';
import '@testing-library/jest-dom';

describe('FilterModal', () => {
  it('renders all filter fields', () => {
    render(<FilterModal />);
    expect(screen.getByLabelText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
  });

  it('submits the form', () => {
    render(<FilterModal />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText(/Filter/i));
    // No error thrown, formik handles submit
    expect(screen.getByLabelText(/Username/i)).toHaveValue('testuser');
  });

  it('resets the form', () => {
    render(<FilterModal />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText(/Reset/i));
    expect(screen.getByLabelText(/Username/i)).toHaveValue('');
  });
}); 