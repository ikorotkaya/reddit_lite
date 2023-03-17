export default function timeDifference(current, previous) {

  var secPerMinute = 60;
  var secPerHour = secPerMinute * 60;
  var secPerDay = secPerHour * 24;
  var secPerMonth = secPerDay * 30;
  var secPerYear = secPerDay * 365;

  var postTime = Math.abs(current - previous);

  if (postTime < secPerMinute) {
    return Math.round(postTime / 1000) + ' seconds ago';
  }

  else if (postTime < secPerHour) {
    return Math.round(postTime / secPerMinute) + ' minutes ago';
  }

  else if (postTime < secPerDay) {
    return Math.round(postTime / secPerHour) + ' hours ago';
  }

  else if (postTime < secPerMonth) {
    return 'approximately ' + Math.round(postTime / secPerDay) + ' days ago';
  }

  else if (postTime < secPerYear) {
    return 'approximately ' + Math.round(postTime / secPerMonth) + ' months ago';
  }

  else {
    return 'approximately ' + Math.round(postTime / secPerYear) + ' years ago';
  }
}