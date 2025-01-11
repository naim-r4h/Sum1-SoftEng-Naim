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
