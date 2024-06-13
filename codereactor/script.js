document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchBar.value;

        if (query) {
            fetch('search.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: query })
            })
            .then(response => response.json())
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

        files.forEach(file => {
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            link.textContent = `Download ${file.name}`;
            link.classList.add('d-block', 'mt-2');
            searchResults.appendChild(link);
        });
    }
});
