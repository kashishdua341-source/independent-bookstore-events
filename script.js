const EVENTS = [
  {
    id: 1,
    title: "An Evening with Mira Sen",
    author: "Mira Sen",
    bookstore: "The Reading Room",
    city: "Jaipur",
    date: "2026-10-03",
    time: "18:30",
    category: "author",
    description: "A conversation about contemporary fiction, craft, and the stories that connect communities."
  },
  {
    id: 2,
    title: "Saturday Poetry Reading",
    author: "Local Poets Collective",
    bookstore: "Paper & Spine",
    city: "Delhi",
    date: "2026-10-10",
    time: "17:00",
    category: "reading",
    description: "An open reading featuring emerging poets and a short audience discussion."
  },
  {
    id: 3,
    title: "Build Your First Short Story",
    author: "Aarav Mehta",
    bookstore: "Chapter One",
    city: "Mumbai",
    date: "2026-10-17",
    time: "11:00",
    category: "workshop",
    description: "A beginner-friendly workshop covering characters, conflict, structure, and revision."
  },
  {
    id: 4,
    title: "Community Book Swap",
    author: "Bookstore Community Team",
    bookstore: "The Reading Room",
    city: "Jaipur",
    date: "2026-10-24",
    time: "16:00",
    category: "community",
    description: "Bring a book you have enjoyed and discover another title from the local reading community."
  },
  {
    id: 5,
    title: "Author Q&A: The Future of Reading",
    author: "Nadia Kapoor",
    bookstore: "Paper & Spine",
    city: "Delhi",
    date: "2026-11-01",
    time: "18:00",
    category: "author",
    description: "A discussion about publishing, reading habits, and independent bookselling."
  }
];

const grid = document.getElementById("events-grid");
const loading = document.getElementById("loading");
const emptyState = document.getElementById("empty-state");
const eventCount = document.getElementById("event-count");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const clearButton = document.getElementById("clear-filters");

let searchText = "";
let selectedCategory = "all";

function sanitizeText(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.textContent.trim();
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function showLoading() {
  loading.hidden = false;
  emptyState.hidden = true;
  grid.hidden = true;
}

function hideLoading() {
  loading.hidden = true;
  grid.hidden = false;
}

function getFilteredEvents() {
  const query = searchText.toLowerCase().trim();

  return EVENTS.filter(function (event) {

    const searchableText = (
      event.title + " " +
      event.author + " " +
      event.bookstore + " " +
      event.city + " " +
      event.description
    ).toLowerCase();

    const matchesSearch =
      query === "" || searchableText.includes(query);

    const matchesCategory =
      selectedCategory === "all" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function createEventCard(event) {

  const article = document.createElement("article");
  article.className = "event-card";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = event.category;

  const title = document.createElement("h3");
  title.textContent = event.title;

  const author = document.createElement("p");
  author.className = "event-meta";
  author.textContent = "With " + event.author;

  const location = document.createElement("p");
  location.className = "event-meta";
  location.textContent =
    event.bookstore + " · " + event.city;

  const date = document.createElement("p");
  date.className = "event-meta";
  date.textContent =
    formatDate(event.date) + " · " + event.time;

  const description = document.createElement("p");
  description.className = "event-description";
  description.textContent = event.description;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "button button-primary";
  button.textContent = "RSVP";
  button.setAttribute(
    "aria-label",
    "RSVP for " + event.title
  );

  button.addEventListener("click", function () {
    console.info(
      "[Analytics] User interacted with Independent Bookstore Events Page"
    );

    alert("RSVP selected for " + event.title);
  });

  article.appendChild(tag);
  article.appendChild(title);
  article.appendChild(author);
  article.appendChild(location);
  article.appendChild(date);
  article.appendChild(description);
  article.appendChild(button);

  return article;
}

function renderEvents() {

  const filteredEvents = getFilteredEvents();

  grid.innerHTML = "";

  if (filteredEvents.length === 0) {

    emptyState.hidden = false;
    eventCount.textContent = "0 events";

    return;
  }

  emptyState.hidden = true;

  eventCount.textContent =
    filteredEvents.length +
    (filteredEvents.length === 1 ? " event" : " events");

  const fragment = document.createDocumentFragment();

  filteredEvents.forEach(function (event) {
    fragment.appendChild(createEventCard(event));
  });

  grid.appendChild(fragment);
}

function loadEvents() {

  showLoading();

  // Simulate slow network / asynchronous operation
  setTimeout(function () {

    renderEvents();
    hideLoading();

  }, 500);
}

searchForm.addEventListener("submit", function (event) {

  event.preventDefault();

  searchText = sanitizeText(searchInput.value);
  selectedCategory = categorySelect.value;

  console.info(
    "[Analytics] User interacted with Independent Bookstore Events Page"
  );

  loadEvents();
});

categorySelect.addEventListener("change", function () {

  selectedCategory = categorySelect.value;

  console.info(
    "[Analytics] User interacted with Independent Bookstore Events Page"
  );

  loadEvents();
});

clearButton.addEventListener("click", function () {

  searchInput.value = "";
  categorySelect.value = "all";

  searchText = "";
  selectedCategory = "all";

  console.info(
    "[Analytics] User cleared Independent Bookstore Events Page"
  );

  loadEvents();
});

// Initial page load
loadEvents();