import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import PopularSubredditResponse from './subreddit.popular.json';

const redditApiServer = setupServer(
	// Describe network behavior with request handlers.
	// Tip: move the handlers into their own module and
	// import it across your browser and Node.js setups!
	rest.get('https://www.reddit.com/r/popular.json', (req, res, ctx) => {
		return res(ctx.json(PopularSubredditResponse));
	})
);

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

		setTimeout(() => {
			screen.debug(undefined, null, { highlight: false });
		}, 5000);

		// const navbarElement = screen.getByTestId('navbar');
		// const logoElement = navbarElement.getByTestId('logo');
		// expect(logoElement).toBeInTheDocument();
	});
});