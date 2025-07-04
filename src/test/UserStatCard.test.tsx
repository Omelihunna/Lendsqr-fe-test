import { render, screen } from '@testing-library/react';
import UserStatCard from '../components/dashboard/cards/UserStatCard';
import '@testing-library/jest-dom';

describe('UserStatCard', () => {
  const item = {
    id: '1',
    icon: '/images/icons/user-stat-icon-1.svg',
    title: 'Users',
    count: '2,453',
  };

  it('renders stat title, icon, and count', () => {
    render(<UserStatCard item={item} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('2,453')).toBeInTheDocument();
    const icon = screen.getByAltText("stat");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', item.icon);
  });
}); 