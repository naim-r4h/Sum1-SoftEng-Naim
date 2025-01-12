/***************************
 * EXISTING FUNCTIONALITY
 **************************/
const savedName = localStorage.getItem('userName');
const nameSpan = document.getElementById('user-name');
const popup = document.getElementById('popup');

if (savedName) {
  nameSpan.textContent = savedName;
  popup.style.display = 'none';
}

function saveName() {
  const nameInput = document.getElementById('name-input');
  const userName = nameInput.value.trim();

  if (userName) {
    localStorage.setItem('userName', userName);
    nameSpan.textContent = userName;
    popup.style.display = 'none';
  } else {
    alert('Please enter a valid name!');
  }
}

function updateDates() {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formatDay = (date) => days[date.getDay()];
  const formatDate = (date) => date.getDate();
  const formatMonth = (date) => months[date.getMonth()];

  document.getElementById('yesterday-day').textContent = formatDay(yesterday);
  document.getElementById('yesterday-date').textContent = formatDate(yesterday);
  document.getElementById('yesterday-month').textContent = formatMonth(yesterday);

  document.getElementById('today-day').textContent = formatDay(now);
  document.getElementById('today-date').textContent = formatDate(now);
  document.getElementById('today-month').textContent = formatMonth(now);

  document.getElementById('tomorrow-day').textContent = formatDay(tomorrow);
  document.getElementById('tomorrow-date').textContent = formatDate(tomorrow);
  document.getElementById('tomorrow-month').textContent = formatMonth(tomorrow);
}

updateDates();

/***************************
 * NEW: QUOTE OF THE DAY
 **************************/
const quoteBanner = document.getElementById('quote-banner');
const quotePopup = document.getElementById('quote-popup');
const closeQuotePopupBtn = document.getElementById('close-quote-popup');
const appContainer = document.getElementById('app-container');

// When user clicks "Quote of the Day (press)"
quoteBanner.addEventListener('click', openQuotePopup);

// Close button in top-right corner of quote popup
closeQuotePopupBtn.addEventListener('click', closeQuotePopup);

function openQuotePopup() {
  // Blur the underlying app
  appContainer.classList.add('blurred');

  // Fetch the quote from the new API
  fetch('https://stoic.tekloon.net/stoic-quote')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract the quote and author from the API response
      const quoteText = data.data.quote; // Quote text
      const quoteAuthor = data.data.author; // Author

      // Update popup content
      document.getElementById('quote-text').textContent = quoteText;
      document.getElementById('quote-author').textContent = `— ${quoteAuthor}`;

      // Show the popup
      quotePopup.style.display = 'flex';
    })
    .catch((error) => {
      console.error('Error fetching the quote:', error);

      // Handle errors gracefully
      document.getElementById('quote-text').textContent =
        'Oops, something went wrong fetching the quote.';
      document.getElementById('quote-author').textContent = '';
      quotePopup.style.display = 'flex';
    });
}



function closeQuotePopup() {
  // Un-blur the app
  appContainer.classList.remove('blurred');
  // Hide the popup
  quotePopup.style.display = 'none';
}
