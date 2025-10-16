// Bookmarks functionality
(function() {
  'use strict';

  function loadBookmarks() {
    fetch("/api/bookmarks")
      .then((res) => res.json())
      .then((bookmarks) => {
        const container = document.getElementById("bookmarks-container");
        if (bookmarks.length === 0) {
          container.innerHTML = "<p>No bookmarks yet.</p>";
          return;
        }

        let html = "";
        bookmarks.forEach((bookmark) => {
          html += '<a href="' + bookmark.link + '" target="_blank" class="bookmark-card">';

          if (bookmark.cover && bookmark.cover !== '' && bookmark.cover !== 'null') {
            html += '<img src="' + bookmark.cover + '" alt="' + bookmark.title + '">';
          } else {
            html += '<div style="width:100%;height:120px;background:#000080;display:flex;align-items:center;justify-content:center;color:white;font-size:48px;border-bottom:1px solid #808080;">📄</div>';
          }

          html += '<div class="bookmark-info">';
          html += '<div class="bookmark-title">' + bookmark.title + '</div>';

          if (bookmark.excerpt) {
            html += '<div class="bookmark-excerpt">' + bookmark.excerpt.substring(0, 80) + (bookmark.excerpt.length > 80 ? '...' : '') + '</div>';
          }

          if (bookmark.tags && bookmark.tags.length > 0) {
            html += '<div class="bookmark-tags">[' + bookmark.tags.slice(0, 3).join(', ') + ']</div>';
          }

          html += '</div>';
          html += '</a>';
        });

        container.innerHTML = html;
      })
      .catch((err) => {
        console.error("Failed to load bookmarks:", err);
        document.getElementById("bookmarks-container").innerHTML =
          "<p>Failed to load bookmarks.</p>";
      });
  }

  // Load bookmarks when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBookmarks);
  } else {
    loadBookmarks();
  }
})();
