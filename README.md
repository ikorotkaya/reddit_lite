## Reddit Feed App
This is a React application that fetches and displays posts from different subreddits. It provides a user-friendly interface for browsing and exploring Reddit content.

### Getting Started:
To run this application, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running npm install in the project directory.
3. Start the development server with npm start.
4. Open your browser and navigate to http://localhost:3000 to view the app.

### Features:
- **Feed:** The main section of the app displays the posts from the selected subreddit. You can scroll through the feed to see more posts.

- **Sidebar:** The sidebar shows a list of popular subreddits. Clicking on a subreddit will load its posts in the feed.

- **Search:** You can search for specific posts by entering a search term in the navigation bar. The feed will update dynamically based on your search.

- **Lazy Loading:** As you scroll through the feed, more posts will be loaded automatically to provide a seamless browsing experience.

- **Page Loader:** When the app is first loaded, a page loader is displayed while the initial data is being fetched.

### Dependencies:
This project uses the following dependencies:

- **React:** A JavaScript library for building user interfaces.
- **Node.js:** A JavaScript runtime environment.
fetchSubreddit: A custom module for fetching subreddit data.
- **PageLoader:** A component that displays a loader animation while the page is loading.
- **FeedLoader:** A component that displays a loader animation while the feed is loading.
Contributing

This project is licensed under the MIT License. You can find the full license text in the LICENSE file.