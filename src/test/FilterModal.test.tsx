import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FilterModal from '../components/dashboard/modals/FilterModal';
import userReducer from '../store/user/userSlice';
import '@testing-library/jest-dom';

// Mock ReactDOM.createPortal
const mockCreatePortal = jest.fn((children) => children);
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: mockCreatePortal,
}));

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      users: userReducer,
    },
    preloadedState: {
      users: {
        selectedUserId: null,
        selectedUser: null,
        allUsers: [],
        isFilterOpen: true,
        filterValues: {
          organization: '',
          username: '',
          email: '',
          date: '',
          phone: '',
          status: '',
        },
        ...initialState,
      },
    },
  });
};

const renderWithProvider = (store: any) => {
  return render(
    <Provider store={store}>
      <FilterModal />
    </Provider>
  );
};

describe('FilterModal', () => {
  beforeEach(() => {
    mockCreatePortal.mockClear();
  });

  it('renders all filter fields when modal is open', () => {
    const store = createTestStore();
    renderWithProvider(store);
    
    expect(screen.getByLabelText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
  });

  it('does not render when modal is closed', () => {
    const store = createTestStore({ isFilterOpen: false });
    renderWithProvider(store);
    
    expect(screen.queryByTestId('filter-form')).not.toBeInTheDocument();
  });

  it('submits the form and updates Redux state', async () => {
    const store = createTestStore();
    renderWithProvider(store);
    
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Filter/i));
    
    await waitFor(() => {
      const state = store.getState();
      expect(state.users.filterValues.username).toBe('testuser');
      expect(state.users.filterValues.email).toBe('test@example.com');
      expect(state.users.isFilterOpen).toBe(false);
    });
  });

  it('resets the form and clears Redux filter values', async () => {
    const store = createTestStore({
      filterValues: {
        organization: 'test',
        username: 'testuser',
        email: 'test@example.com',
        date: '2024-01-01',
        phone: '1234567890',
        status: 'Active',
      },
    });
    renderWithProvider(store);
    
    fireEvent.click(screen.getByText(/Reset/i));
    
    await waitFor(() => {
      const state = store.getState();
      expect(state.users.filterValues.organization).toBe('');
      expect(state.users.filterValues.username).toBe('');
      expect(state.users.filterValues.email).toBe('');
      expect(state.users.filterValues.date).toBe('');
      expect(state.users.filterValues.phone).toBe('');
      expect(state.users.filterValues.status).toBe('');
    });
  });

  it('closes modal when close button is clicked', async () => {
    const store = createTestStore();
    renderWithProvider(store);
    
    fireEvent.click(screen.getByText(/Close/i));
    
    await waitFor(() => {
      const state = store.getState();
      expect(state.users.isFilterOpen).toBe(false);
    });
  });

  it('renders status options correctly', () => {
    const store = createTestStore();
    renderWithProvider(store);
    
    const statusSelect = screen.getByLabelText(/Status/i);
    expect(statusSelect).toBeInTheDocument();
    
    const options = statusSelect.querySelectorAll('option');
    expect(options).toHaveLength(5); // Including the default "Select" option
    expect(options[1]).toHaveValue('Active');
    expect(options[2]).toHaveValue('Pending');
    expect(options[3]).toHaveValue('Blacklisted');
    expect(options[4]).toHaveValue('Inactive');
  });
}); 