document.addEventListener('DOMContentLoaded', () => {
    // Çok dilli metinler (TR ve EN)
    const lang = {
      tr: {
        title: "Benim hakkımda",
        loading: "Yükleniyor...",
        about: "Hakkımda",
        about_title: "Hakkımda",
        about_text: "Kendimden kısaca bahsedeyim... Yaratıcı, çözüm odaklı ve teknolojiyi yakından takip eden bir web geliştiricisiyim.",
        skills: "Yeteneklerim",
        skills_title: "Yetenekler",
        projects: "Projeler",
        projects_title: "Projeler",
        contact: "İletişim",
        contact_title: "İletişim",
        contact_name: "Adınız",
        contact_email: "Emailiniz",
        contact_message: "Mesajınız",
        contact_submit: "Gönder"
      },
      en: {
        title: "About me",
        loading: "Loading...",
        about: "About",
        about_title: "About",
        about_text: "Let me tell you about myself briefly... I am a creative, solution-oriented web developer who closely follows technology.",
        skills: "Skills",
        skills_title: "Skills",
        projects: "Projects",
        projects_title: "Projects",
        contact: "Contact",
        contact_title: "Contact",
        contact_name: "Your Name",
        contact_email: "Your Email",
        contact_message: "Your Message",
        contact_submit: "Send"
      }
    };
  
    let currentLang = 'tr';
  
    // Eleman seçimi
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtns = document.querySelectorAll('.menu-close');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const loader = document.querySelector('.matrix-loader');
    const langButtons = document.querySelectorAll('.lang-btn');
  
    // Dil değiştirme fonksiyonu (input/textarea placeholder'larını da güncelle)
    function updateTexts() {
      document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (lang[currentLang][key]) {
          if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
            el.placeholder = lang[currentLang][key];
          } else {
            el.textContent = lang[currentLang][key];
          }
        }
      });
    }
  
    function toggleLanguage() {
      currentLang = currentLang === 'tr' ? 'en' : 'tr';
      updateTexts();
      langButtons.forEach(btn => (btn.textContent = currentLang.toUpperCase()));
    }
  
    // Dil butonları
    langButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleLanguage();
      });
    });
  
    // Mobil menü açma/kapatma
    menuIcon.addEventListener('click', e => {
      e.stopPropagation();
      menuIcon.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  
    const closeMenu = () => {
      mobileMenu.classList.remove('active');
      menuIcon.classList.remove('active');
    };
  
    closeBtns.forEach(btn => btn.addEventListener('click', closeMenu));
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('click', e => {
      if (!mobileMenu.contains(e.target) && !menuIcon.contains(e.target)) {
        closeMenu();
      }
    });
  
    // Matrix Efekti: Daha temiz ve akıcı efekt için önce canvas'ı temizleyip sonra hafif opak siyah dolduruyoruz
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    let matrixAnimationFrame;
  
    function initMatrix() {
      if (matrixAnimationFrame) cancelAnimationFrame(matrixAnimationFrame);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ÇĞİÖŞÜçğıöşü';
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);
      function draw() {
        // Hafif opak siyah katman; bu, efektin yumuşak kalmasını sağlar
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px Fira Code';
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillText(text, x, y);
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        matrixAnimationFrame = requestAnimationFrame(draw);
      }
      draw();
    }
  
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 500);
        initMatrix();
      }, 2000);
    });
  
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
      initMatrix();
    });
  
    // Bölüm Navigasyonu – Neon form geçiş animasyonu
    const sections = ['about', 'skills', 'projects', 'contact'];
    const neonForm = document.querySelector('.neon-form');
  
    function showSection(sectionId) {
      neonForm.classList.add('transition-animation');
      setTimeout(() => {
        document.querySelectorAll('.form-content').forEach(el => el.classList.remove('active'));
        const target = document.getElementById(sectionId);
        if (target) {
          target.classList.add('active');
          document.querySelectorAll('.butonlar').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang-key') === sectionId);
          });
        }
        neonForm.classList.remove('transition-animation');
        window.location.hash = sectionId;
      }, 600);
    }
  
    window.addEventListener('hashchange', () => {
      const sectionId = window.location.hash.substring(1);
      if (sections.includes(sectionId)) showSection(sectionId);
    });
  
    // Header ve mobil menü butonları
    document.querySelectorAll('.butonlar').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSection = btn.getAttribute('data-lang-key');
        showSection(targetSection);
      });
    });
  
    updateTexts();
  });
  function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'github.com/ahmetapi';
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }
    setInterval(function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        ctx.fillText(text, i * fontSize, y);
        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 10);
  }
  