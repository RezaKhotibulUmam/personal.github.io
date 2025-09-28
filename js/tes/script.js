document.addEventListener('DOMContentLoaded', () => {
  const navbarNav = document.querySelector('.navbar-nav');
  const searchForm = document.querySelector('.search-form');
  const searchBox = document.querySelector('#search-box');
  const hm = document.querySelector('#hamburger-menu');
  const sb = document.querySelector('#search-button');

  // Toggle class active untuk hamburger menu
  hm.addEventListener('click', (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
    e.stopPropagation(); // Menghentikan penyebaran event
  });

  // Toggle class active untuk tombol search
  sb.addEventListener('click', (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
    e.stopPropagation(); // Menghentikan penyebaran event
  });

  // Event listener untuk menutup dropdown saat klik di luar elemen
  document.addEventListener('click', closeDropdowns);

  // Event listener hp
  document.addEventListener('touchstart', closeDropdowns);

  function closeDropdowns(e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
      searchForm.classList.remove('active');
    }

    // Klik di luar elemen navbar dan search form
    if (!navbarNav.contains(e.target) && !searchForm.contains(e.target) && !hm.contains(e.target) && !sb.contains(e.target)) {
      navbarNav.classList.remove('active');
      searchForm.classList.remove('active');
    }
  }

  // ======================= Highlight & Navigasi Search =======================
  // Buat tombol navigasi panah (atas/bawah)
  const navDiv = document.createElement('div');
  navDiv.className = 'search-nav';
  navDiv.innerHTML = `
    <button id="prev-result" type="button">↑</button>
    <button id="next-result" type="button">↓</button>
  `;
  searchForm.appendChild(navDiv);

  const prevBtn = document.getElementById('prev-result');
  const nextBtn = document.getElementById('next-result');

  let results = [];
  let currentIndex = -1;

  function clearHighlights() {
    const marks = document.querySelectorAll('span.marked');
    marks.forEach(mark => mark.replaceWith(document.createTextNode(mark.textContent)));
    results = [];
    currentIndex = -1;
  }

  function highlightText(word) {
    if (!word) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      if (!node.nodeValue.trim()) continue;
      if (node.parentNode.tagName === "SCRIPT" || node.parentNode.tagName === "STYLE") continue;

      const regex = new RegExp(`(${word})`, 'gi');
      if (regex.test(node.nodeValue)) {
        const span = document.createElement('span');
        span.className = 'marked';
        span.innerHTML = node.nodeValue.replace(regex, '<mark>$1</mark>');
        node.parentNode.replaceChild(span, node);
        results.push(span);
      }
    }
  }

  function scrollToCurrent() {
    if (currentIndex >= 0 && results[currentIndex]) {
      results[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      results.forEach(r => r.classList.remove('active'));
      results[currentIndex].classList.add('active');
    }
  }

  // Input search untuk highlight
  searchBox.addEventListener('input', () => {
    clearHighlights();
    const value = searchBox.value.trim();
    if (value) highlightText(value);
    currentIndex = 0;
    scrollToCurrent();
  });

  // Tombol navigasi highlight
  nextBtn.addEventListener('click', () => {
    if (results.length === 0) return;
    currentIndex = (currentIndex + 1) % results.length;
    scrollToCurrent();
  });

  prevBtn.addEventListener('click', () => {
    if (results.length === 0) return;
    currentIndex = (currentIndex - 1 + results.length) % results.length;
    scrollToCurrent();
  });
});

// ==================================== class active scrol===================================================================
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav a');

  window.onscroll = () => {
    sections.forEach(section => {
      const top = window.scrollY;
      const offset = section.offsetTop - 150;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          document.querySelector('.navbar-nav a[href*=' + id + ']').classList.add('active');
        });
      }
    });
  };
});

// ============================================= scroll reveal ===============================================*//
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home-content h3, .home-content h1',  { origin: 'top' });
ScrollReveal().reveal('.social-media', { origin: 'bottom' });
ScrollReveal().reveal('.home-content p', { origin: 'left' });
ScrollReveal().reveal('.z', '.navbar-extra', { origin: 'right' });

// ============================================= typed js ===============================================*//
const typed = new Typed('.multiple-text', {
  strings: ['Abcd Efghi.'],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

// ============================================== search google ==========================================
function search() {
  let { value } = document.getElementById('search-box');
  console.log('searching', value);
  const baseUrl = "https://www.google.com/search?q=";

  if (!value) {
    value = "reza khotibul umam";
  }
  // tab baru
  window.open(baseUrl + value, '_blank');
}

// ============================================ smpt js ===============================================
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Menghentikan pengiriman formulir secara default

  // Ambil nilai dari inputan formulir
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Konfigurasi SMTPJS
  Email.send({
    SecureToken: "93d85d5c-82ed-4128-8338-ac82a012726a", 
    Username: "hajigebid22@gmail.com",
    Password: "2D94B08DA39F9788DBA801B454F824D6A2C9",
    To: 'hajigebid22@gmail.com',
    From: "hajigebid22@gmail.com",

    Subject: subject,
    Body: "Name: " + name + "<br>Email: " + email + "<br>Phone: " + phone + "<br>Message: " + message
  }).then(function (message) {
    if (message === "OK") {
      Swal.fire({
        title: "pesan terkirim!",
        text: "pesan anda telah terkirim, kami akan segera menanggapi, terimakasih",
        icon: "success"
      });
      // Atur formulir menjadi kosong setelah pengiriman berhasil
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
    }
    else {
      alert("Email gagal dikirim. Silakan coba lagi.")
    }
  });
});

// =========================== koneksi ========================================================================
let alerts = document.querySelectorAll('.alert');
alerts.forEach(item => {
  item.addEventListener('click', function (event) {
    if (event.target.classList.contains('close')) {
      item.style.display = 'none';
    }
  })
})
window.addEventListener('offline', function () {
  document.getElementById('success').style.display = 'none';
  document.getElementById('error').style.display = 'grid';
})
window.addEventListener('online', function () {
  document.getElementById('error').style.display = 'none';
  document.getElementById('success').style.display = 'grid';
});

// ================================== dark mode ==================================
document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('darkmode-toggle');
  const darkTheme = document.getElementById('dark-theme');

  // Pastikan dark mode aktif saat halaman pertama kali dimuat
  darkTheme.removeAttribute('disabled');

  darkModeToggle.addEventListener('change', function () {
      if (darkModeToggle.checked) {
          darkTheme.removeAttribute('disabled');
      } else {
          darkTheme.setAttribute('disabled', 'true');
      }
  });
});
