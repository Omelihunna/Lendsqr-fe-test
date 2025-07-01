import { render, screen } from '@testing-library/react';
import UserDetailsBody from '../components/userDetails/UserDetailsBody';
import '@testing-library/jest-dom';
import type { User } from '../constants/constants';

describe('UserDetailsBody', () => {
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

  it('renders user info', () => {
    render(<UserDetailsBody user={user} />);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('FULL NAME')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('Phone Number')[0]).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Bvn')).toBeInTheDocument();
    expect(screen.getByText('12345678901')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Marital status')).toBeInTheDocument();
    expect(screen.getByText('Single')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
  });
}); 