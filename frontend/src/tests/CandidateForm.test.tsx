import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CandidateForm from '../CandidateForm';

describe('CandidateForm', () => {
  const mockSubmit = jest.fn();

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as any;
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders all fields and disables submit when invalid', () => {
    render(<CandidateForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Education')).toBeInTheDocument();
    expect(screen.getByLabelText('Working Experience')).toBeInTheDocument();
    expect(screen.getByLabelText('CV (PDF or DOCX)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });

  it('shows error tooltips for invalid fields', async () => {
    render(<CandidateForm onSubmit={mockSubmit} />);
    fireEvent.blur(screen.getByLabelText('Email'));
    expect(await screen.findByText(/Required\./i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid' } });
    fireEvent.blur(screen.getByLabelText('Email'));
    expect(await screen.findByText(/Invalid email format/i)).toBeInTheDocument();
  });

  it('enables submit when all fields are valid', async () => {
    render(<CandidateForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+123456789' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('Education'), { target: { value: 'Bachelor' } });
    fireEvent.change(screen.getByLabelText('Working Experience'), { target: { value: '5 years' } });
    await waitFor(() => expect(screen.getByRole('button', { name: /Submit/i })).not.toBeDisabled());
  });

  it('calls onSubmit with valid data', async () => {
    render(<CandidateForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+123456789' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('Education'), { target: { value: 'Bachelor' } });
    fireEvent.change(screen.getByLabelText('Working Experience'), { target: { value: '5 years' } });
    await waitFor(() => expect(screen.getByRole('button', { name: /Submit/i })).not.toBeDisabled());
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });
});
