// Uses native Date to parse and show the date in proper localized format
// You can pass locale attr ex. 'en-us', 'pl' or it will read it wrom window object on client side
export const formatDate = (timestamp, locale) => {
  if (locale) {
    return (
      new Date(timestamp).toLocaleDateString(
        locale,
        { year: 'numeric', month: 'long', day: 'numeric' },
      )
    );
  } else if (window && window.navigator.language) {
    return (
      new Date(timestamp).toLocaleDateString(
        window.navigator.language,
        { year: 'numeric', month: 'long', day: 'numeric' },
      )
    );
  }
  return timestamp;
};

// Uses native Date to parse and show the time in proper localized format
// You can pass locale attr ex. 'en-us', 'pl' or it will read it wrom window object on client side
export const formatTime = (timestamp, locale) => {
  if (locale) {
    return (
      new Date(timestamp).toLocaleTimeString(
        locale,
        { hour: 'numeric', minute: 'numeric' },
      )
    );
  } else if (window && window.navigator.language) {
    return (
      new Date(timestamp).toLocaleTimeString(
        window.navigator.language,
        { hour: 'numeric', minute: 'numeric' },
      )
    );
  }
  return timestamp;
};
