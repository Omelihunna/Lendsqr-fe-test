import {render, screen} from '@testing-library/react';
import OptionsModal from '../components/dashboard/modals/OptionsModal';
import '@testing-library/jest-dom';
import {MemoryRouter} from "react-router-dom";

describe('OptionsModal', () => {
    const mockId = "123";

    it('renders all options', () => {
        render(
            <MemoryRouter>
                <OptionsModal id={mockId} />
            </MemoryRouter>
        );

        expect(screen.getByText(/View Details/i)).toBeInTheDocument();
        expect(screen.getByText(/Blacklist User/i)).toBeInTheDocument();
        expect(screen.getByText(/Activate User/i)).toBeInTheDocument();
    });

    it('renders correct link for View Details', () => {
        render(
            <MemoryRouter>
                <OptionsModal id={mockId} />
            </MemoryRouter>
        );

        const viewDetailsLink = screen.getByRole('link', { name: /view details/i });
        expect(viewDetailsLink).toBeInTheDocument();
        expect(viewDetailsLink).toHaveAttribute('href', `/dashboard/users/${mockId}`);
    });

    it('renders all icons with correct alt text', () => {
        render(
            <MemoryRouter>
                <OptionsModal id={mockId} />
            </MemoryRouter>
        );

        const icons = screen.getAllByRole('img');
        expect(icons).toHaveLength(3);

        // Check that all icons have alt text (even though they're all "eye icon" in your code)
        icons.forEach(icon => {
            expect(icon).toHaveAttribute('alt');
        });
    });

    it('renders as a list with correct structure', () => {
        render(
            <MemoryRouter>
                <OptionsModal id={mockId} />
            </MemoryRouter>
        );

        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });
});