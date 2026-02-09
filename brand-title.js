<script>
document.addEventListener('DOMContentLoaded', function() {
  // Green-accented brand title
  document.querySelectorAll('.navbar-title').forEach(function(el) {
    if (el.textContent.trim() === 'MyYearInData') {
      el.innerHTML =
        '<span class="brand-prefix">My</span>' +
        '<span class="brand-mid">Year</span>' +
        '<span class="brand-link">In</span>' +
        '<span class="brand-data">Data</span>';
    }
  });

  // Hide page title on listing pages (keep description visible)
  if (document.querySelector('.quarto-listing')) {
    var title = document.querySelector('.quarto-title > h1.title');
    if (title) title.classList.add('listing-page-title-hidden');
  }

  // Announcement banner — inject above navbar
  if (!sessionStorage.getItem('site-banner-dismissed')) {
    var banner = document.createElement('div');
    banner.id = 'site-banner';
    banner.innerHTML =
      '<div id="site-banner-content">' +
        '<span class="banner-emoji">&#x1F525;</span>' +
        '<span class="banner-text">Get your inside track @ <a href="https://databricks.news">Databricks.News</a></span>' +
        '<span class="banner-emoji">&#x1F525;</span>' +
      '</div>' +
      '<button id="site-banner-dismiss" aria-label="Dismiss">&times;</button>';
    document.body.insertBefore(banner, document.body.firstChild);
    document.getElementById('site-banner-dismiss').addEventListener('click', function() {
      banner.style.display = 'none';
      sessionStorage.setItem('site-banner-dismissed', '1');
    });
  }
});
</script>
