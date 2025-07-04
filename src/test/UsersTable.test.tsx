import { render, screen, fireEvent } from '@testing-library/react';
import UsersTable from '../components/dashboard/UsersTable';
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

describe('UsersTable', () => {
  it('renders table headers', () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} loading={false} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/Date joined/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  it('renders user rows', () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} loading={false} />
      </MemoryRouter>
    );
    expect(screen.getByText('Org1')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('Org2')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
  });

  it('opens filter modal when filter icon is clicked', () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} loading={false} />
      </MemoryRouter>
    );
    const filterIcons = screen.getAllByAltText('filter-icon');
    fireEvent.click(filterIcons[0]);
    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
  });

  it('opens options modal when more icon is clicked', () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} loading={false} />
      </MemoryRouter>
    );
    const moreIcons = screen.getAllByAltText('more');
    fireEvent.click(moreIcons[0]);
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Blacklist User/i)).toBeInTheDocument();
    expect(screen.getByText(/Activate User/i)).toBeInTheDocument();
  });
}); 