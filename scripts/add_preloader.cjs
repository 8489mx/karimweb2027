const fs = require('fs');

let path = 'index.html';
let content = fs.readFileSync(path, 'utf8');

const preloaderHTML = `
    <!-- Preloader -->
    <style>
      #app-preloader {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), visibility 0.6s cubic-bezier(0.65, 0, 0.35, 1);
      }
      .app-preloader-spinner {
        width: 44px;
        height: 44px;
        border: 3px solid rgba(15, 23, 42, 0.1);
        border-top-color: #0f172a;
        border-radius: 50%;
        animation: app-preloader-spin 0.8s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85);
      }
      @keyframes app-preloader-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .app-preloader-hidden {
        opacity: 0;
        visibility: hidden;
      }
    </style>
    <div id="app-preloader">
      <div class="app-preloader-spinner"></div>
    </div>
    <script>
      window.addEventListener('load', function() {
        var preloader = document.getElementById('app-preloader');
        if (preloader) {
          // slight delay so it doesn't flash instantly on fast connections
          setTimeout(function() {
            preloader.classList.add('app-preloader-hidden');
            setTimeout(function() {
              if (preloader.parentNode) {
                preloader.remove();
              }
            }, 600); // match transition duration
          }, 200); 
        }
      });
    </script>
`;

if (!content.includes('app-preloader')) {
  content = content.replace('<body>', '<body>' + preloaderHTML);
  fs.writeFileSync(path, content);
}
