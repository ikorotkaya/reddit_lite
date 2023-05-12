export default async function fetchSubreddit(name) {
	const url = `https://www.reddit.com/r/${name}/about.json`;

	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};

	const response = await fetch(url, requestOptions);
	const jsondata = await response.json();

	return jsondata;
}