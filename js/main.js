AOS.init({duration: 1200,once: true});

// Smooth scroll for internal nav
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if(section) window.scrollTo({top: section.offsetTop-48, behavior:'smooth'});
  });
});

// Matrix Hacker Effect (only on home/index, include guard for #matrix-canvas)
const canvas = document.getElementById('matrix-canvas');
if(canvas){
  const ctx = canvas.getContext('2d');
  let w, h, cols, ypos;
  function resize() {
    w = canvas.width = document.getElementById('hero').offsetWidth;
    h = canvas.height = 330;
    cols = Math.floor(w/16);
    ypos = Array(cols).fill(0);
  }
  window.addEventListener('resize', resize); resize();
  function matrix() {
    ctx.fillStyle = '#13182119';
    ctx.fillRect(0,0,w,h);
    ctx.font = '18px Poppins, Arial, sans-serif'; // Font update for graphics
    for(let i=0; i<cols; i++) {
      let text = String.fromCharCode(0x30A0+Math.random()*97);
      ctx.fillStyle = '#00fff6cd';
      ctx.fillText(text, i*16, ypos[i]*18);
      if(Math.random() > 0.975) ypos[i]=0;
      ypos[i]++;
      if(ypos[i]*18 > h && Math.random() > 0.9) ypos[i]=0;
    }
  }
  setInterval(matrix, 45);
}
