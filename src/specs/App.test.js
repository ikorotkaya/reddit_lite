import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
		console.log('req1: ', req);
		return res(ctx.json(PopularSubredditResponse));
	}),

	// Handles a GET subreddit foo request
	rest.get('https://www.reddit.com/r/foo/about.json', (req, res, ctx) => {
		console.log('req2: ', req);
		return res(ctx.json(AboutFooSubredditResponse));
	}),

	// Handles a GET subreddit bar request
	rest.get('https://www.reddit.com/r/bar/about.json', (req, res, ctx) => {
		console.log('req3: ', req);
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
});
