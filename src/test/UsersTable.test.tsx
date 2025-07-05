import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UsersTable from '../components/dashboard/UsersTable';
import userReducer from '../store/user/userSlice';
import '@testing-library/jest-dom';
import type { User } from '../constants/constants';
import { MemoryRouter } from 'react-router-dom';

const mockUsers = [
  {
    id: '1',
    organization: 'Org1',
    username: 'user1',
    email: 'user1@example.com',
    phoneNumber: '1234567890',
    createdAt: '2024-06-01T12:00:00Z',
    accountBalance: '1000',
    accountNumber: '0001112223',
  },
  {
    id: '2',
    organization: 'Org2',
    username: 'user2',
    email: 'user2@example.com',
    phoneNumber: '0987654321',
    createdAt: '2024-06-02T12:00:00Z',
    accountBalance: '2000',
    accountNumber: '0001112224',
  },
] as User[];

const createTestStore = () => {
  return configureStore({
    reducer: {
      users: userReducer,
    },
    preloadedState: {
      users: {
        selectedUserId: null,
        selectedUser: null,
        allUsers: [],
        isFilterOpen: false,
        filterValues: {
          organization: '',
          username: '',
          email: '',
          date: '',
          phone: '',
          status: '',
        },
      },
    },
  });
};

const renderWithProviders = (store: any) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <UsersTable users={mockUsers} loading={false} />
      </MemoryRouter>
    </Provider>
  );
};

describe('UsersTable', () => {
  it('renders table headers', () => {
    const store = createTestStore();
    renderWithProviders(store);
    expect(screen.getByText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/Date joined/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  it('renders user rows', () => {
    const store = createTestStore();
    renderWithProviders(store);
    expect(screen.getByText('Org1')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('Org2')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
  });

  it('opens filter modal when filter icon is clicked', () => {
    const store = createTestStore();
    renderWithProviders(store);
    const filterIcons = screen.getAllByAltText('filter-icon');
    fireEvent.click(filterIcons[0]);
    
    const state = store.getState();
    expect(state.users.isFilterOpen).toBe(true);
  });

  it('opens options modal when more icon is clicked', () => {
    const store = createTestStore();
    renderWithProviders(store);
    const moreIcons = screen.getAllByAltText('more');
    fireEvent.click(moreIcons[0]);
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Blacklist User/i)).toBeInTheDocument();
    expect(screen.getByText(/Activate User/i)).toBeInTheDocument();
  });

  it('renders filter icons with cursor pointer style', () => {
    const store = createTestStore();
    renderWithProviders(store);
    const filterIcons = screen.getAllByAltText('filter-icon');
    filterIcons.forEach(icon => {
      expect(icon).toHaveStyle('cursor: pointer');
    });
  });
}); 