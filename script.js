document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true
  });

  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.querySelector('.toggle-btn');

  // Overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  // Hamburger button for mobile
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn d-lg-none';
  mobileMenuBtn.innerHTML = '<i class="lni lni-menu"></i>';
  document.body.appendChild(mobileMenuBtn);

  // Toggle sidebar collapsed (desktop/tablet)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      
      // Change icon based on state
      const icon = this.querySelector('i');
      if (sidebar.classList.contains('collapsed')) {
        icon.classList.remove('lni-grid-alt');
        icon.classList.add('lni-menu');
      } else {
        icon.classList.remove('lni-menu');
        icon.classList.add('lni-grid-alt');
      }
    });
  }

  // Toggle sidebar overlay (mobile)
  function toggleSidebarMobile() {
    sidebar.classList.toggle('active');
    overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }

  mobileMenuBtn.addEventListener('click', toggleSidebarMobile);
  overlay.addEventListener('click', toggleSidebarMobile);

  // Close sidebar on link click (mobile)
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth < 992 && sidebar.classList.contains('active')) {
        toggleSidebarMobile();
      }
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});