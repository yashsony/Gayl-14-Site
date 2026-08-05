document.addEventListener('DOMContentLoaded', () => {
  // Search state
  let searchIndex = [];
  let isIndexLoaded = false;

  const searchInput = document.getElementById('search-input');
  const searchModalInput = document.getElementById('search-modal-input');
  const searchOverlay = document.getElementById('search-overlay');
  const searchResults = document.getElementById('search-results');

  // Determine root URL dynamically so it works in any directory and locally
  let rootUrl = '';
  const scriptTag = document.querySelector('script[src$="search.js"]');
  if (scriptTag) {
    rootUrl = new URL('../../', new URL(scriptTag.src, window.location.href)).href;
  } else {
    rootUrl = window.location.pathname.includes('/free-gift/') ? '../' : './';
  }

  // Load search index
  async function loadSearchIndex() {
    if (isIndexLoaded) return;
    try {
      const response = await fetch(rootUrl + 'search-index.json');
      searchIndex = await response.json();
      isIndexLoaded = true;
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  }

  function openSearch() {
    searchOverlay.classList.add('active');
    searchModalInput.focus();
    loadSearchIndex();
  }

  function closeSearch() {
    searchOverlay.classList.remove('active');
    searchModalInput.value = '';
    searchResults.innerHTML = '';
  }

  if (searchInput) {
    searchInput.addEventListener('click', openSearch);
    searchInput.addEventListener('focus', openSearch);
  }

  // Handle keyboard shortcut (Cmd+K or Ctrl+K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  function renderResults(query) {
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }
    const lowerQuery = query.toLowerCase();
    const results = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(lowerQuery) ||
             item.description.toLowerCase().includes(lowerQuery) ||
             item.keywords.some(k => k.toLowerCase().includes(lowerQuery));
    });

    if (results.length === 0) {
      searchResults.innerHTML = '<div style="padding: 1rem; color: var(--color-text-muted);">No results found.</div>';
      return;
    }

    searchResults.innerHTML = results.map(r => `
      <a href="${rootUrl}${r.url}" class="search-result-item">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-desc">${r.description}</div>
      </a>
    `).join('');
  }

  if (searchModalInput) {
    searchModalInput.addEventListener('input', (e) => {
      renderResults(e.target.value);
    });
  }
});
