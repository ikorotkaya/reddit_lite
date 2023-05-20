import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import PopularSubredditResponse from '../subreddit.popular.json';
import AboutFooSubredditResponse from '../subreddit.foo.about.json';
import AboutBarSubredditResponse from '../subreddit.bar.about.json';

export const handlers = [
	// Handles a get /popular request
	rest.get('https://www.reddit.com/r/popular.json', (req, res, ctx) => {
		// console.log('req1: ', req);
		return res(ctx.json(PopularSubredditResponse));
	}),

	// Handles a GET subreddit foo request
	rest.get('https://www.reddit.com/r/foo/about.json', (req, res, ctx) => {
		// console.log('req2: ', req);
		return res(ctx.json(AboutFooSubredditResponse));
	}),

	// Handles a GET subreddit bar request
	rest.get('https://www.reddit.com/r/bar/about.json', (req, res, ctx) => {
		// console.log('req3: ', req);
		return res(ctx.json(AboutBarSubredditResponse));
	}),
];

const redditApiServer = setupServer(...handlers);

describe('App', () => {
	// Enable request interception.
	beforeAll(() => redditApiServer.listen());
	// Reset handlers so that each test could alter them
	// without affecting other, unrelated tests.
	afterEach(() => redditApiServer.resetHandlers());

	// Don't forget to clean up afterwards.
	afterAll(() => redditApiServer.close());

	test('contains logo in navbar', async () => {
		render(<App />);

		await waitFor(() => {
			expect(screen.getByText('foo')).toBeInTheDocument();
		});

		screen.debug(undefined, null, { highlight: false });
	});

	test('renders two popular posts on initial render', () => {
		render(<App />);

		expect(screen.getByTestId('feed')).toBeInTheDocument();

		expect(screen.getByTestId('feed')).toHaveTextContent('React Testing library is so much fun');
		expect(screen.getByTestId('feed')).toHaveTextContent('MSW FTW');
	});

	test('renders popular posts with text content including search term', async () => {
		render(<App />);

		await waitFor(() => {
			expect(screen.getByText('React Testing library is so much fun')).toBeInTheDocument();
		});

		// get search input
		const searchInput = screen.getByTestId('search-input');

		// type in search term
		fireEvent.change(searchInput, {target: {value: 'msw'}});

		// fire event to update search term by clicking search button
		const searchButton = screen.getByTestId('search-button');
		fireEvent.click(searchButton);

		await waitFor(() => {
			expect(screen.getByTestId('feed')).not.toHaveTextContent('React Testing library is so much fun');
		});

		expect(screen.getByTestId('feed')).toHaveTextContent('MSW FTW');
	});
});
