document.addEventListener('DOMContentLoaded', () => {
  // 1. Heading anchors
  const content = document.querySelector('.content-inner');
  if (content) {
    const headings = content.querySelectorAll('h2, h3');
    headings.forEach(heading => {
      if (!heading.id) {
        heading.id = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      
      const anchor = document.createElement('a');
      anchor.href = `#${heading.id}`;
      anchor.className = 'heading-anchor';
      // Lucide link icon inline SVG
      anchor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
      
      heading.style.position = 'relative';
      heading.appendChild(anchor);
    });
  }

  // 2. Initialize GLightbox if included
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.screenshot-link',
      touchNavigation: true,
      loop: false
    });
  }
});
