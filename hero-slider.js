/* =========================================================
   HERO-SLIDER.JS – ẢNH BÊN PHẢI HERO TỰ CHUYỂN
   Cách dùng: đặt file cạnh index.html, thêm dòng sau
   ngay trước </body> (sau script.js):
       <script src="hero-slider.js"></script>
   (thêm vào cả index.html và en.html)
========================================================= */

/* ---------- DANH SÁCH ẢNH: thêm / bớt / đổi tên ở đây ---------- */
const HERO_SLIDES = [
  "images/hero.jpg",
  "images/hero-2.jpg",
  "images/hero-3.jpg",
];
const HERO_DELAY = 5000;   // thời gian mỗi ảnh (mili giây): 5000 = 5 giây

(function () {
  const hero = document.querySelector(".hero");
  const bg = hero && hero.querySelector(".hero__bg");
  if (!bg) return;

  /* CSS */
  document.head.insertAdjacentHTML("beforeend", `<style>
    .hero__bg.has-slider { background: none !important; overflow: hidden; }
    .hs-slide {
      position: absolute; inset: 0;
      background-position: 0% 30%; background-size: cover; background-repeat: no-repeat;
      opacity: 0; transform: scale(1.08);
      transition: opacity 1.2s ease, transform 6s ease-out;
    }
    .hs-slide.is-on { opacity: 1; transform: scale(1); }
    .hs-dots {
      position: absolute; right: 64px; bottom: 210px; z-index: 4;
      display: flex; gap: 10px;
    }
    .hs-dots button {
      width: 10px; height: 10px; padding: 0; border: 0; border-radius: 999px;
      background: rgba(255,255,255,.7); box-shadow: 0 1px 4px rgba(0,0,0,.25);
      cursor: pointer; transition: width .3s, background .3s;
    }
    .hs-dots button.is-on { width: 30px; background: var(--imp-green, #8cc241); }
    .hs-nav {
      position: absolute; right: 64px; bottom: 240px; z-index: 4;
      display: flex; gap: 10px;
    }
    .hs-nav button {
      width: 44px; height: 44px; border: 0; border-radius: 50%;
      display: grid; place-items: center;
      background: rgba(255,255,255,.85); color: var(--imp, #0a538e);
      font-size: 22px; line-height: 1; cursor: pointer;
      box-shadow: 0 4px 14px rgba(10,83,142,.18);
      transition: background .2s, color .2s, transform .2s;
    }
    .hs-nav button:hover { background: var(--imp, #0a538e); color: #fff; transform: scale(1.06); }
    .hero.hs-drag-zone { cursor: grab; }
    .hero.hs-dragging { cursor: grabbing; user-select: none; }
    @media (max-width: 768px) {
      .hs-dots { left: 50%; right: auto; bottom: 70px; transform: translateX(-50%); }
      .hs-nav { display: none; }   /* điện thoại: dùng vuốt */
    }
    @media (prefers-reduced-motion: reduce) {
      .hs-slide { transition: opacity .3s; transform: none !important; }
    }
  </style>`);

  /* Chỉ giữ ảnh tải được (ảnh sai tên / chưa có thì tự bỏ qua) */
  const load = src => new Promise(ok => {
    const img = new Image();
    img.onload = () => ok(src);
    img.onerror = () => ok(null);
    img.src = src;
  });

  Promise.all(HERO_SLIDES.map(load)).then(list => {
    const srcs = list.filter(Boolean);
    if (srcs.length < 2) return;              // chỉ 1 ảnh thì giữ như cũ

    bg.classList.add("has-slider");
    const slides = srcs.map((src, i) => {
      const s = document.createElement("div");
      s.className = "hs-slide" + (i === 0 ? " is-on" : "");
      s.style.backgroundImage = `url("${src}")`;
      bg.appendChild(s);
      return s;
    });

    const dots = document.createElement("div");
    dots.className = "hs-dots";
    const btns = srcs.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ảnh " + (i + 1));
      if (i === 0) b.classList.add("is-on");
      b.addEventListener("click", () => { go(i); restart(); });
      dots.appendChild(b);
      return b;
    });
    hero.appendChild(dots);

    /* Nút mũi tên trái / phải */
    const isEN = document.documentElement.lang === "en";
    const nav = document.createElement("div");
    nav.className = "hs-nav";
    nav.innerHTML = `<button type="button" aria-label="${isEN ? "Previous image" : "Ảnh trước"}">‹</button>` +
                    `<button type="button" aria-label="${isEN ? "Next image" : "Ảnh sau"}">›</button>`;
    const [prevBtn, nextBtn] = nav.querySelectorAll("button");
    prevBtn.addEventListener("click", () => { go(cur - 1); restart(); });
    nextBtn.addEventListener("click", () => { go(cur + 1); restart(); });
    hero.appendChild(nav);

    let cur = 0, timer;
    function go(i) {
      i = (i + slides.length) % slides.length;
      slides[cur].classList.remove("is-on");
      btns[cur].classList.remove("is-on");
      cur = i;
      slides[cur].classList.add("is-on");
      btns[cur].classList.add("is-on");
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(() => go(cur + 1), HERO_DELAY);
    }

    /* Kéo chuột (máy tính) hoặc vuốt (điện thoại) trên vùng ảnh */
    const inImage = x => {
      const r = bg.getBoundingClientRect();
      return innerWidth <= 768 || x >= r.left + r.width * 0.15;   // bỏ dải mờ bên trái
    };
    const isUI = el => el.closest("a, button, input");
    let x0 = null;
    hero.addEventListener("pointermove", e => {
      if (x0 === null && e.pointerType === "mouse")
        hero.classList.toggle("hs-drag-zone", inImage(e.clientX) && !isUI(e.target));
    });
    hero.addEventListener("pointerdown", e => {
      if (isUI(e.target) || !inImage(e.clientX)) return;
      x0 = e.clientX;
      hero.classList.add("hs-dragging");
    });
    addEventListener("pointerup", e => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 50) { go(cur + (dx < 0 ? 1 : -1)); restart(); }
      x0 = null;
      hero.classList.remove("hs-dragging");
    });
    hero.addEventListener("dragstart", e => e.preventDefault());

    /* Phím mũi tên trái / phải khi hero đang hiện trên màn hình */
    addEventListener("keydown", e => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const r = hero.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      go(cur + (e.key === "ArrowRight" ? 1 : -1)); restart();
    });

    /* Rê chuột vào ảnh thì tạm dừng tự chạy */
    hero.addEventListener("mouseleave", restart);

    /* Tạm dừng khi tab bị ẩn */
    document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : restart());

    restart();
  });
})();