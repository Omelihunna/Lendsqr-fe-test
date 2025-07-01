import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore, {type MockStore} from 'redux-mock-store';
import UserDetailsPage from '../pages/UserDetailsPage';
import { useGetUserByIdQuery } from '../store/user/userApi';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock store and API hook
vi.mock('../store/user/userApi', () => ({
    useGetUserByIdQuery: vi.fn(),
}));

// Mock child components
vi.mock('../components/userDetails/UserDetailsHeader.tsx', () => ({
    default: () => <div data-testid="user-header">UserDetailsHeader</div>,
}));
vi.mock('../components/userDetails/UserDetailsBody.tsx', () => ({
    default: () => <div data-testid="user-body">UserDetailsBody</div>,
}));

// Setup
const mockStore = configureStore([]);
const mockedUseGetUserByIdQuery = useGetUserByIdQuery as any;

const renderWithProviders = (store: MockStore, route = '/dashboard/users/123') => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/dashboard/users/:id" element={<UserDetailsPage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe('UserDetailsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows loader while loading', () => {
        mockedUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        const store = mockStore({});
        renderWithProviders(store);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('shows error message if query fails', async () => {
        mockedUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            error: { data: { message: 'User not found' } },
        });

        const store = mockStore({});
        renderWithProviders(store);

        expect(await screen.findByText(/Error Loading User/i)).toBeInTheDocument();
        expect(screen.getByText(/User not found/i)).toBeInTheDocument();
    });

    it('shows fallback if user is null', async () => {
        mockedUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            isError: false,
        });

        const store = mockStore({});
        renderWithProviders(store);

        expect(await screen.findByText(/User Not Found/i)).toBeInTheDocument();
    });

    it('renders user detail content when data is loaded', async () => {
        mockedUseGetUserByIdQuery?.mockReturnValue({
            data: {
                id: '123',
                fullName: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
                avatar: '',
                bvn: '',
                status: '',
                socials: {
                    twitter: '',
                    facebook: '',
                    instagram: '',
                },
                children: 0,
                username: '',
                createdAt: '',
                updatedAt: '',
                dateJoined: '',
                phoneNumber: '',
                emailAddress: '',
                organization: '',
                maritalStatus: '',
                typeOfResidence: '',
                guarantor: {
                    address: '',
                    fullName: '',
                    phoneNumber: '',
                    relationship: '',
                },
                accountNumber: '',
                accountBalance: '',
                educationAndEmployment: {
                    officeEmail: '',
                    loanRepayment: '',
                    monthlyIncome: '',
                    employmentStatus: '',
                    levelOfEducation: '',
                    sectorOfEmployment: '',
                    durationOfEmployment: '',
                },
            },
            isLoading: false,
            isError: false,
        });

        const store = mockStore({});
        renderWithProviders(store);

        expect(screen.getByTestId('user-header')).toBeInTheDocument();
        expect(screen.getByTestId('user-body')).toBeInTheDocument();
        expect(screen.getByText(/ACTIVATE USER/i)).toBeInTheDocument();
        expect(screen.getByText(/BLACKLIST USER/i)).toBeInTheDocument();
    });


    it('dispatches correct actions on mount and unmount', async () => {
        mockedUseGetUserByIdQuery?.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        const store = mockStore({});
        const { unmount } = renderWithProviders(store);
        const actions = store.getActions();

        expect(actions[0].type).toBe('users/selectUser');
        unmount();
        expect(store.getActions()[1].type).toBe('users/clearSelectedUser');
    });
});
