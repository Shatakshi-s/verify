// client/src/App.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders verification inputs', () => {
    render(<App />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(6);
});

test('handles valid input', () => {
    render(<App />);
    const inputs = screen.getAllByRole('textbox');
    
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[0].value).toBe('1');
    fireEvent.change(inputs[1], { target: { value: '2' } });
    expect(inputs[1].value).toBe('2');
    
    fireEvent.click(screen.getByText('Submit'));
});
