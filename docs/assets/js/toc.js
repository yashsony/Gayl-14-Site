document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content-inner');
  const tocList = document.querySelector('.toc-list');
  
  if (!content || !tocList) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) return;

  const tocItems = [];

  headings.forEach((heading, index) => {
    // Generate ID if not present
    if (!heading.id) {
      heading.id = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    // Create TOC link
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    a.className = 'toc-link';
    
    if (heading.tagName.toLowerCase() === 'h3') {
      a.classList.add('toc-h3');
    }

    li.appendChild(a);
    tocList.appendChild(li);
    tocItems.push({ element: heading, link: a });
  });

  // Scroll spy
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80% 0px',
    threshold: 1.0
  };

  const observer = new IntersectionObserver(entries => {
    let activeFound = false;
    // Check all entries and highlight the active one
    // A simpler approach for scroll spy:
    const scrollPos = window.scrollY + 100; // offset for header
    
    let currentHeading = null;
    tocItems.forEach(item => {
      if (item.element.offsetTop <= scrollPos) {
        currentHeading = item;
      }
    });

    tocItems.forEach(item => item.link.classList.remove('active'));
    if (currentHeading) {
      currentHeading.link.classList.add('active');
    }
  });

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight/3;
    let currentHeading = null;
    tocItems.forEach(item => {
      if (item.element.offsetTop <= scrollPos) {
        currentHeading = item;
      }
    });

    tocItems.forEach(item => item.link.classList.remove('active'));
    if (currentHeading) {
      currentHeading.link.classList.add('active');
    } else if (tocItems.length > 0) {
      tocItems[0].link.classList.add('active');
    }
  });
});
