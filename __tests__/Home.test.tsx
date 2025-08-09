import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { ToastProvider } from '@/components/ui/Toast';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<ToastProvider><Home /></ToastProvider>);

    const heading = screen.getByRole('heading', {
      name: /HyperHash/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
