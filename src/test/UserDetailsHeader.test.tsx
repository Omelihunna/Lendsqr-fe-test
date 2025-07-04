import { render, screen } from '@testing-library/react';
import UserDetailsHeader from '../components/userDetails/UserDetailsHeader';
import '@testing-library/jest-dom';
import type { User } from '../constants/constants';
import { MemoryRouter } from 'react-router-dom';

describe('UserDetailsHeader', () => {
    const user: User = {
        id: '1',
        bvn: '12345678901',
        email: 'test@example.com',
        gender: 'male',
        status: 'Active',
        avatar: '',
        socials: { twitter: '', facebook: '', instagram: '' },
        children: 0,
        fullName: 'John Doe',
        username: 'johndoe',
        createdAt: '',
        updatedAt: '',
        dateJoined: '',
        phoneNumber: '1234567890',
        emailAddress: 'test@example.com',
        organization: 'Org1',
        maritalStatus: 'single',
        typeOfResidence: 'apartment',
        guarantor: { address: '', fullName: '', phoneNumber: '', relationship: '' },
        accountNumber: '0001112223',
        accountBalance: '1000',
        educationAndEmployment: {
            officeEmail: '',
            loanRepayment: '',
            monthlyIncome: '',
            employmentStatus: '',
            levelOfEducation: '',
            sectorOfEmployment: '',
            durationOfEmployment: '',
        },
    };

    it('renders user info and nav items', () => {
        render(
            <MemoryRouter>
                <UserDetailsHeader user={user} />
            </MemoryRouter>
        );
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('12345678901')).toBeInTheDocument();
        expect(screen.getByText(`${user.accountNumber}/Providus Bank`)).toBeInTheDocument();
        expect(screen.getByText('User’s Tier')).toBeInTheDocument();
        expect(screen.getByText('₦1000')).toBeInTheDocument();
    });
}); 