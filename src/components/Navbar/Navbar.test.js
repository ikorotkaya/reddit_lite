import React from 'react';
import Navbar from './Navbar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Navbar', () => {
	test('renders Navbar component', () => {
		render(<Navbar />);
		expect(screen.getByTestId('navbar')).toBeInTheDocument();
	});

	test('renders Logo component', () => {
		render(<Navbar />);
		expect(screen.getByTestId('logo')).toBeInTheDocument();
		// check if image is rendered
		expect(screen.getByTestId('logo')).toHaveTextContent('Reddit');
	});

	test('renders Search component', () => {
		render(<Navbar />);
		expect(screen.getByTestId('search')).toBeInTheDocument();
		expect(screen.getByTestId('search')).toHaveTextContent('Search');
	});
});
