import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Waitlist from '@/components/Waitlist';

global.fetch = jest.fn() as jest.Mock;

describe('Waitlist Component (Glassmorphic Form)', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders all form fields and submits successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Waitlist />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/LinkedIn Profile URL/i), { target: { value: 'https://linkedin.com/in/jane' } });
    fireEvent.change(screen.getByLabelText(/How do you currently use AI\?/i), { target: { value: 'builder' } });
    fireEvent.change(screen.getByLabelText(/Why do you want to attend/i), { target: { value: 'Because it is awesome' } });

    // Submit the form
    const submitBtn = screen.getByRole('button', { name: /Submit Application/i });
    fireEvent.click(submitBtn);

    // Verify loading state
    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();

    // Verify success state
    await waitFor(() => {
      expect(screen.getByText(/Application Received/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/apply', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '1234567890',
        linkedinUrl: 'https://linkedin.com/in/jane',
        aiUsage: 'builder',
        aiUsageOther: '',
        why: 'Because it is awesome'
      })
    }));
  });
});
