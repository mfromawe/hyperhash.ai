
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /HyperHash/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
