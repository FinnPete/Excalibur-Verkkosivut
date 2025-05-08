// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGJUt0fXW2dWzxbcnid4E_WGiIMmEfG2Q",
    authDomain: "excalibur-tuni.fi",
    databaseURL: "https://excalibur-newsfeed-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "excalibur-newsfeed",
    storageBucket: "excalibur-newsfeed.firebasestorage.app",
    messagingSenderId: "536000260271",
    appId: "1:536000260271:web:9e03f81fddbc30d0280c5a",
    measurementId: "G-LND78P6TXG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});
// Track the login status
let isLoggedIn = false;

auth.onAuthStateChanged(user => {
    if (user) {
        isLoggedIn = true;
        // User is logged in, show the delete buttons
        document.getElementById('addNewsButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block';
        fetchNews(); // Re-fetch news with delete buttons shown
    } else {
        isLoggedIn = false;
        // User is logged out, hide the delete buttons
        document.getElementById('addNewsButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'none';
        fetchNews(); // Re-fetch news with delete buttons hidden
    }
});

// Login
async function login(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;

    const email = "excaliburry@gmail.com"

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert('Login successful!');
        document.getElementById('newsfeedsect').style.display = 'flex';
        document.getElementById('addNewsButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'block';

        // Show the "Delete News" button in each news item
        const deleteButtons = document.querySelectorAll('.news-item button');
        deleteButtons.forEach(button => {
            button.style.display = 'block';
        });
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}


// Add news
async function addNews(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const link = document.getElementById('link').value;
    const pubDate = document.getElementById('pubDate').value;

    const newsRef = db.ref('news');
    const newNewsRef = newsRef.push();
    await newNewsRef.set({ title, description, link, pubDate });

    alert('News added successfully!');

    document.getElementById('newsForm').reset();

    closeNewsForm();
}

// Fetch the news items after authentication is confirmed
async function fetchNews() {
    const newsFeed = document.getElementById('newsFeed'); // The container for news items
    const newsRef = db.ref('news'); // Reference to the 'news' node in the database

    // Listen for changes in the 'news' node
    newsRef.on('value', (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            newsFeed.innerHTML = '<p>No news available.</p>';
            return;
        }

        const sortedNews = Object.entries(data)
            .map(([newsId, item]) => ({ newsId, ...item }))
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // Clear the current content
        newsFeed.innerHTML = '';

        // Loop through the news items and display them
        sortedNews.forEach(({ newsId, title, link, pubDate, description }) => {
            const item = data[newsId]; // Get the news item using the newsId

            // Conditionally show or hide delete button based on login status
            const deleteButtonHTML = isLoggedIn ? `
                <button onclick="deleteNews('${newsId}')" class="delete-button" style="display: block;">Delete News</button>
                ` : '';

            // Convert Markdown to HTML using marked.js
            let formattedDescription = marked.parse(item.description || "");

            const newsItemHTML = `
                <div class="news-item" id="newsItem_${newsId}">
                <a href="${item.link || '#'}" target="_blank" class="news-link">
                <div class="news-title">${item.title}</div>
                </a>
                <div class="news-date">${new Date(item.pubDate).toLocaleDateString()}</div>
                <div class = "news-description">${formattedDescription}</div>
                ${deleteButtonHTML}
                </div>
                `;

            newsFeed.innerHTML += newsItemHTML;
        });
    }, (error) => {
        console.error('Error fetching news:', error);
        newsFeed.innerHTML = '<p>Error loading news.</p>';
    });
}


// Logout
function logout() {
    auth.signOut().then(() => {
        alert('Logged out!');
        document.getElementById('newsForm').style.display = 'none';
    });
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('addNewsButton').style.display = 'none';

    // Hide the "Delete News" button in each news item
    const deleteButtons = document.querySelectorAll('.news-item button');
    deleteButtons.forEach(button => {
        button.style.display = 'none';
    });
}


// Show the login form when the "Log In" button is clicked
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
}

// Function to close the login form
function closeLoginForm() {
    document.getElementById('loginForm').style.display = 'none'; // Hide the login form
    document.getElementById('overlay').style.display = 'none';   // Hide the overlay if it's shown
}

function showNewsForm(){
    document.getElementById('newsForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeNewsForm() {
    document.getElementById('newsForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function deleteNews(newsId) {
    // 1. Delete the news item from Firebase Database
    const newsRef = db.ref('news/' + newsId); // Reference to the specific news item
    newsRef.remove()
        .then(() => {
            // 2. Successfully deleted from Firebase, now remove it from the website
            const newsElement = document.getElementById('newsItem_' + newsId); // Find the specific news item in the DOM
            if (newsElement) {
                newsElement.remove(); // Only remove the specific news item
            }
            alert('News item removed successfully!');
        })
        .catch((error) => {
            console.error('Error removing news:', error);
            alert('Failed to remove news item.');
        });
}
