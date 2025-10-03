- console.log('menu-2.js loaded');
- document.addEventListener('DOMContentLoaded', () => {
-   const menuToggle = document.querySelector('.menu-toggle');
-   const mainNav = document.querySelector('.main-nav');
-   if (menuToggle && mainNav) {
-     menuToggle.addEventListener('click', () => {
-       mainNav.classList.toggle('active');
-       menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
-     });
-     // Handle submenu toggling on mobile
-     document.querySelectorAll('.main-nav li > a + .submenu').forEach(submenu => {
-       const parentLink = submenu.previousElementSibling;
-       parentLink.addEventListener('click', e => {
-         if (window.innerWidth <= 900) {
-           e.preventDefault();
-           submenu.classList.toggle('active');
-         }
-       });
-     });
-   }
- });
+ console.log('menu-2.js loaded (revised)');
+
+document.addEventListener('DOMContentLoaded', () => {
+  const menuToggle = document.querySelector('.menu-toggle');
+  const mainNav    = document.querySelector('.main-nav');
+
+  // -----------------------------------------------------------------
+  // 1️⃣ Mobile hamburger – show / hide the whole navigation
+  // -----------------------------------------------------------------
+  if (menuToggle && mainNav) {
+    menuToggle.addEventListener('click', () => {
+      mainNav.classList.toggle('active');
+      const expanded = mainNav.classList.contains('active');
+      menuToggle.setAttribute('aria-expanded', expanded);
+    });
+  }
+
+  // -----------------------------------------------------------------
+  // 2️⃣ Sub‑menu toggling – only on screens ≤ 900 px
+  // -----------------------------------------------------------------
+  const isMobile = () => window.innerWidth <= 900;
+
+  // Remove any stray “open” classes that might be cached
+  document.querySelectorAll('.submenu.open').forEach(sm => sm.classList.remove('open'));
+
+  // Attach click handler to each parent link that has a submenu
+  document.querySelectorAll('.main-nav li > a + .submenu').forEach(submenu => {
+    const parentLink = submenu.previousElementSibling;
+    parentLink.addEventListener('click', e => {
+      if (!isMobile()) return;          // desktop – let CSS hover do its job
+      e.preventDefault();               // stop navigation
+      submenu.classList.toggle('open'); // toggle our new class
+    });
+  });
+
+  // Close all open submenus when the viewport grows to desktop size
+  window.addEventListener('resize', () => {
+    if (!isMobile()) {
+      document.querySelectorAll('.submenu.open')
+        .forEach(sm => sm.classList.remove('open'));
+    }
+  });
+});