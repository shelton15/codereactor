document.addEventListener('DOMContentLoaded', function() {
    try {
        const searchBar = document.getElementById('search-bar');
        const searchForm = document.getElementById('search-form');
        const searchResults = document.getElementById('search-results');

        if (!searchBar || !searchForm || !searchResults) {
            throw new Error('Required elements are not found in the DOM.');
        }

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = searchBar.value.trim();

            if (query) {
                fetch('search.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: query })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        displayResults(data.files);
                    } else {
                        searchResults.innerHTML = '<p>No results found.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    searchResults.innerHTML = '<p>An error occurred. Please try again later.</p>';
                });
            }
        });

        function displayResults(files) {
            searchResults.innerHTML = '';

            if (!Array.isArray(files) || files.length === 0) {
                searchResults.innerHTML = '<p>No results found.</p>';
                return;
            }

            files.forEach(file => {
                const link = document.createElement('a');
                link.href = file.url;
                link.download = file.name;
                link.textContent = `Download ${file.name}`;
                link.classList.add('d-block', 'mt-2');
                searchResults.appendChild(link);
            });
        }
    } catch (error) {
        console.error('Initialization error:', error);
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.innerHTML = '<p>An error occurred. Please refresh the page and try again.</p>';
        }
    }
});