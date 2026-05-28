// portfolio.js - JavaScript para agregar interatividade ao seu portfólio
// Adicione <script src='portfolio.js'></script> antes de </body> no HTML

// 1. MENU ATIVO: Destaca botão atual ao rolar
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const buttons = document.querySelectorAll('nav button');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.querySelector('a').getAttribute('href') === `#${current}`) {
      btn.classList.add('active');
    }
  });
});

// 2. GALERIA MODAL: Clique em img abre lightbox grande
document.querySelectorAll('.galeria img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:999; display:flex; align-items:center; justify-content:center;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.maxWidth = '90%'; bigImg.style.maxHeight = '90%'; bigImg.style.borderRadius = '10px';
    const close = document.createElement('span');
    close.innerHTML = '&times;'; close.style.cssText = 'position:absolute; top:20px; right:20px; color:white; font-size:40px; cursor:pointer;';
    close.onclick = () => document.body.removeChild(modal);
    modal.append(bigImg, close);
    document.body.appendChild(modal);
  });
});

// 3. ANIMAÇÃO SCROLL (AOS-like): Fade-in seções ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0'; section.style.transform = 'translateY(50px)'; section.style.transition = '0.6s';
  observer.observe(section);
});

// 4. CONTADOR HOBBIES (exemplo dinâmico)
function contarHobbies() {
  const hobbies = ['Cozinhar', 'Jogar', 'Crochê', 'Desenhar'];
  const contador = document.createElement('div');
  contador.id = 'contador';
  contador.innerHTML = `Total de Hobbies: <span id='num'>0</span>`;
  contador.style.cssText = 'position:fixed; bottom:20px; right:20px; bg:#680303; color:white; padding:10px; border-radius:10px;';
  document.body.appendChild(contador);
  let i = 0;
  const timer = setInterval(() => {
    if (i <= hobbies.length) {
      document.getElementById('num').textContent = i;
      i++;
    } else clearInterval(timer);
  }, 300);
}
contarHobbies();

// 5. DARK/LIGHT MODE TOGGLE (botão no header)
const toggleBtn = document.createElement('button');
toggleBtn.innerHTML = '☀️'; toggleBtn.id = 'theme-toggle';
toggleBtn.style.cssText = 'position:fixed; top:20px; right:20px; z-index:1000;';
document.body.appendChild(toggleBtn);
toggleBtn.onclick = () => {
  document.body.classList.toggle('light-mode');
  toggleBtn.innerHTML = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
};

// CSS extra pra JS (adicione no polio.css)
/*
#theme-toggle { padding:10px; bg:#ff6600; border:none; border-radius:50%; cursor:pointer; font-size:20px; }
body.light-mode { background:#f0e8d0 !important; }
body.light-mode section { background:rgba(255,255,255,0.9) !important; }
body.light-mode h1 { color:#333 !important; }
body.light-mode p { color:#333 !important; }
nav button.active { background:#ff4400 !important; box-shadow:0 0 20px #ff4400; }

