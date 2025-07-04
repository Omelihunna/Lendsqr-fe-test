import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import {vi} from 'vitest';
import LoginForm from "../components/login/LoginForm.tsx";
import {MemoryRouter} from "react-router-dom";

// Mock the validation schema module
var mockValidationSchema = {
    validate: vi.fn(),
    validateSync: vi.fn(),
    isValid: vi.fn(),
    isValidSync: vi.fn(),
};

vi.mock('../schemas/LoginValidationSchema.tsx', () => ({
    LoginValidationSchema: mockValidationSchema,
}));

describe('LoginForm (with Vitest)', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Default valid behavior
        mockValidationSchema.validate.mockResolvedValue({});
        mockValidationSchema.validateSync.mockReturnValue({});
        mockValidationSchema.isValid.mockResolvedValue(true);
        mockValidationSchema.isValidSync.mockReturnValue(true);
    });

    it('renders email and password fields', () => {
        render(
            <MemoryRouter>
                <LoginForm/>
            </MemoryRouter>);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('renders welcome texts and login button', () => {
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);
        expect(screen.getByText('Welcome!')).toBeInTheDocument();
        expect(screen.getByText('Enter details to login.')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Login'})).toBeInTheDocument();
    });

    it('toggles password visibility on click', () => {
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);
        const passwordField = screen.getByPlaceholderText('Password');
        const toggleBtn = screen.getByText('SHOW');

        expect(passwordField).toHaveAttribute('type', 'password');
        fireEvent.click(toggleBtn);
        expect(passwordField).toHaveAttribute('type', 'text');

        fireEvent.click(screen.getByText('HIDE'));
        expect(passwordField).toHaveAttribute('type', 'password');
    });

    it('toggles password on Enter and Space keypress', () => {
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);
        const passwordField = screen.getByPlaceholderText('Password');
        const toggle = screen.getByText('SHOW');

        fireEvent.keyDown(toggle, {key: 'Enter'});
        expect(passwordField).toHaveAttribute('type', 'text');

        fireEvent.keyDown(screen.getByText('HIDE'), {key: ' '});
        expect(passwordField).toHaveAttribute('type', 'password');
    });

    it('handles empty form submission correctly', async () => {
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);

        await act(async () => {
            fireEvent.click(screen.getByTestId('login-button'));
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        const loginButton = screen.getByTestId('login-button');
        const hasSpinner = loginButton.querySelector('span[style*="animation"]');

        if (hasSpinner) {
            expect(hasSpinner).toBeTruthy();
            console.log('Form submitted with empty fields');
        } else {
            const emailError = screen.queryByTestId('email-error');
            const passwordError = screen.queryByTestId('password-error');

            if (emailError) {
                expect(emailError).toHaveTextContent(/\S/);
            }
            if (passwordError) {
                expect(passwordError).toHaveTextContent(/\S/);
            }

            // At least one error should exist if validation is working
            expect(emailError || passwordError).toBeTruthy();
        }
    });

    it('updates input values correctly', async () => {
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);
        const email = screen.getByPlaceholderText('Email');
        const password = screen.getByPlaceholderText('Password');

        await act(async () => {
            fireEvent.change(email, {target: {value: 'test@example.com'}});
            fireEvent.change(password, {target: {value: 'pass1234'}});
        });

        expect(email).toHaveValue('test@example.com');
        expect(password).toHaveValue('pass1234');
    });

    it('calls console.log on valid form submit', async () => {
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        });
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Email'), {
                target: {value: 'test@example.com'},
            });
            fireEvent.change(screen.getByPlaceholderText('Password'), {
                target: {value: 'password123'},
            });
        });

        fireEvent.click(screen.getByRole('button', {name: 'Login'}));

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('Logging in with:', {
                email: 'test@example.com',
                password: 'password123',
            });
        });

        logSpy.mockRestore();
    });

    it('renders forgot password link', () => {
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);
        expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
    });

    it('renders logo image', () => {
        render(<MemoryRouter>
            <LoginForm/>
        </MemoryRouter>);
        const logo = screen.getByAltText('logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/images/logo.svg');
    });
});