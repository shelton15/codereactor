$(document).ready(function() {
    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        let query = $('#search-bar').val();
        if (query) {
            $.post('search.php', { query: query }, function(data) {
                if (data.file) {
                    removeMinVh100Class();
                    displayResults(data.file);
                } else {
                    displayNoResults();
                }
            }, 'json')
            .fail(function() {
                $('#search-results').html('<p>An error occurred. Please try again later.</p>');
            });
        } else {
            $('#search-results').html('<p>Please enter a search query.</p>');
        }
    });

    function displayResults(file) {
        let fileName = file.split('/').pop();
        let fileSize = (Math.random() * (700 - 300) + 300).toFixed(1); // Random file size for demo purposes

        $('#search-results').html(`
            <div class="mt-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card-box">
                            <div class="col-lg-12 col-xl-12">
                                <div class="file-man-box">
                                    <div class="file-img-box">
                                        <img src="assets/img/pdf.svg" alt="icon">
                                    </div>
                                    <a href="${file}" class="file-download" target="_blank" download>
                                        <i class="fa fa-download"></i>
                                    </a>
                                    <div class="file-man-title">
                                        <h5 class="mb-0 text-overflow">${fileName}</h5>
                                        <p class="mb-0"><small>${fileSize} kb</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        `);
    }

    function displayNoResults() {
        $('#search-results').html(`
            <div class="mt-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card-box">
                            <div class="col-lg-12 col-xl-12">
                                <div class="file-man-box">
                                    No results. Try again (check your spellings).
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        `);
    }
});

function removeMinVh100Class() {
    const elements = document.querySelectorAll('.this.min-vh-100');
    elements.forEach(element => {
        element.classList.remove('min-vh-100');
    });
}
