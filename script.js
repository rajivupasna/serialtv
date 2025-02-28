// Fetch YouTube Playlist Videos with Debugging
async function fetchPlaylistVideos() {
    const apiKey = 'AIzaSyDyo7FVtsQjXylNBteVlbyxfxzVeMjs7QQ'; // Replace with your actual API key
    const playlistId = 'PL0Z67tlyTaWphlJ8dod2fSFGmBlUW_KJJ'; // Replace with your playlist ID
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=4&playlistId=${playlistId}&key=${apiKey}`;

    const episodeGrid = document.getElementById('episode-grid');

    try {
        console.log('Fetching data from:', url); // Log the URL for debugging
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Log the raw response

        if (!data.items || data.items.length === 0) {
            throw new Error('No items found in the playlist.');
        }

        // Clear existing content
        episodeGrid.innerHTML = '';

        // Populate videos with animation
        data.items.forEach((item, index) => {
            const videoId = item.snippet.resourceId.videoId;
            const title = item.snippet.title;
            const thumbnail = item.snippet.thumbnails.high.url;

            const card = document.createElement('div');
            card.className = 'card';
            card.style.setProperty('--order', index); // For staggered animation
            card.innerHTML = `
                <div class="image-container" data-title="${title}">
                    <img src="${thumbnail}" alt="${title}" class="card-img" loading="lazy">
                </div>
                <div class="card-content">
                    <p>${title.slice(0, 50)}${title.length > 50 ? '...' : ''}</p>
                    <button class="cta-button" onclick="playVideo('${videoId}')">Watch Now</button>
                </div>
            `;
            episodeGrid.appendChild(card);
        });

        console.log('Videos successfully loaded into the grid.');
    } catch (error) {
        console.error('Error fetching playlist:', error.message || error);
        episodeGrid.innerHTML = `<p>Failed to load videos: ${error.message || 'Unknown error'}. Check console for details.</p>`;
    }
}

// Call the fetch function when the page loads
document.addEventListener('DOMContentLoaded', fetchPlaylistVideos);