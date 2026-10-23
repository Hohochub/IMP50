/* =========================================================
   SCRIPT.JS – HIỆU ỨNG CHO LANDING PAGE 50 NĂM IMEXPHARM
   Cách dùng: đặt file này cạnh index.html rồi thêm dòng sau
   ngay trước thẻ </body> trong index.html:

       <script src="script.js"></script>
========================================================= */

/* ---------- CẤU HÌNH NHANH ---------- */
// Dán link nhúng YouTube vào đây để nút Play mở video
// Ví dụ: "https://www.youtube.com/embed/xxxxxxxxxxx"
const VIDEO_URL = "https://www.youtube.com/embed/L6rtmqkmjUs";

/* =========================================================
   0. CSS CHO HIỆU ỨNG (tự chèn vào trang, không cần sửa style.css)
========================================================= */
const effectCSS = `
/* --- Header dính khi cuộn --- */
.header { transition: background .35s, box-shadow .35s, height .35s; }
.header.is-sticky {
  position: fixed;
  height: 76px;
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(10,83,142,.10);
}
.header.is-sticky .header__logo img { height: 64px; width: 200px; transition: all .35s; }
.header__nav a { position: relative; }
.header__nav a::after {
  content: ""; position: absolute; left: 0; bottom: -4px;
  width: 100%; height: 2px; background: var(--imp-green);
  transform: scaleX(0); transform-origin: left; transition: transform .3s;
}
.header__nav a:hover::after,
.header__nav a.is-active::after { transform: scaleX(1); }

/* --- Hiện dần khi cuộn tới --- */
.reveal { opacity: 0; transition: opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1); }
.reveal[data-anim="up"]    { transform: translateY(50px); }
.reveal[data-anim="down"]  { transform: translateY(-40px); }
.reveal[data-anim="left"]  { transform: translateX(-60px); }
.reveal[data-anim="right"] { transform: translateX(60px); }
.reveal[data-anim="zoom"]  { transform: scale(.88); }
.reveal.is-visible { opacity: 1; transform: none; }

/* --- Hero: chữ trượt lên từng dòng --- */
.hero__title span { overflow: hidden; }
.hero__title span > i {
  display: inline-block; font-style: normal;
  transform: translateY(110%); animation: lineUp .9s cubic-bezier(.2,.7,.2,1) forwards;
}
@keyframes lineUp { to { transform: translateY(0); } }
.hero__bg { animation: heroIn 1.6s ease-out both; }
@keyframes heroIn { from { opacity: 0; transform: translateX(80px) scale(1.04); } }

/* --- Nút: vệt sáng lướt qua --- */
.btn { position: relative; overflow: hidden; }
.btn::before {
  content: ""; position: absolute; top: 0; left: -120%;
  width: 60%; height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,.6), transparent);
  transition: left .6s;
}
.btn:hover::before { left: 140%; }

/* --- Cuốn sách nổi nhẹ --- */
.book__img { animation: floatY 6s ease-in-out infinite; }
@keyframes floatY { 50% { transform: translateY(-12px); } }

/* --- Dấu mốc hành trình --- */
.journey__river path {
  stroke-dasharray: 3000; stroke-dashoffset: 3000;
  transition: stroke-dashoffset 3s ease;
}
.journey.is-visible .journey__river path { stroke-dashoffset: 0; }
.milestone { opacity: 0; transform: translateY(20px) scale(.9); }
.journey.is-visible .milestone {
  opacity: 1; transform: none;
  transition: opacity .5s, transform .5s, box-shadow .3s;
}
.milestone.is-active { box-shadow: 0 0 0 2px var(--imp-green), 0 10px 24px rgba(10,83,142,.25); }
.milestone.is-active .milestone-num { background: var(--imp-green); }
.milestone .milestone-num::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid var(--imp); animation: pulse 2s infinite; opacity: 0;
}
.milestone-num { position: relative; }
@keyframes pulse { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.9); opacity: 0; } }
.journey__detail.is-changing { animation: swapIn .5s ease; }
@keyframes swapIn { from { opacity: 0; transform: translateY(16px); } }

/* --- Thẻ con số: nghiêng 3D theo chuột --- */
.stat-card { transform-style: preserve-3d; will-change: transform; }
.stat-card__icon { transition: transform .4s; }
.stat-card:hover .stat-card__icon { transform: translateZ(30px) scale(1.08); }
.stat-card__link img { transition: transform .3s; }
.stat-card__link:hover img { transform: translateX(6px); }

/* --- Video --- */
.video__thumb { transition: transform 1.2s ease; }
.video__player:hover .video__thumb { transform: scale(1.05); }
.video__play::before {
  content: ""; position: absolute; inset: -14px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,.7); animation: pulse 2.2s infinite;
}
.video-modal {
  position: fixed; inset: 0; z-index: 999; display: grid; place-items: center;
  background: rgba(5,25,50,.82); opacity: 0; visibility: hidden; transition: .35s;
}
.video-modal.is-open { opacity: 1; visibility: visible; }
.video-modal__box {
  position: relative; width: min(1100px, 92vw); aspect-ratio: 16/9;
  background: #000; border-radius: 12px; overflow: hidden;
  transform: scale(.9); transition: transform .35s;
}
.video-modal.is-open .video-modal__box { transform: scale(1); }
.video-modal__box iframe { width: 100%; height: 100%; border: 0; }
.video-modal__msg { color: #fff; display: grid; place-items: center; height: 100%; padding: 24px; text-align: center; font-size: 18px; }
.video-modal__close {
  position: absolute; top: -48px; right: 0; color: #fff; font-size: 34px; line-height: 1;
}

/* --- Slider lời tri ân --- */
.quote-stack { cursor: grab; user-select: none; }
.quote-stack.is-dragging { cursor: grabbing; }
.quote-card { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.quote-stack:hover .quote-card--back1 { transform: rotate(5deg) translate(50px, -6px); }
.quote-stack:hover .quote-card--back2 { transform: rotate(-5deg) translate(-10px, 34px); }
.quote-card--front.is-out-left  { transform: rotate(-8deg) translate(-120px, 40px); opacity: 0; transition: .4s; }
.quote-card--front.is-out-right { transform: rotate(10deg) translate(120px, 40px); opacity: 0; transition: .4s; }
.slider-ctrl__btn { transition: transform .2s; }
.slider-ctrl__btn:hover { transform: scale(1.1); }
.slider-ctrl__dots span { transition: width .3s, background .3s; cursor: pointer; }
.slider-ctrl__dots span.is-active { width: 28px; }
.thanks__thumbs img { transition: transform .3s, outline-color .3s; outline: 1px solid transparent; }
.thanks__thumbs img:hover { transform: translateY(-6px); }
.thanks__thumbs img.is-active { outline: 2px solid var(--imp); }
.thanks__hint img { animation: swipe 1.6s ease-in-out infinite; }
@keyframes swipe { 50% { transform: translateX(10px); } }
.thanks__script p {
  clip-path: inset(0 100% 0 0); transition: clip-path 2.2s ease;
}
.thanks__script.is-visible p { clip-path: inset(0 0 0 0); }

/* --- Sự kiện --- */
.event-card { transition: transform .35s, box-shadow .35s; }
.event-card:hover { transform: translateY(-8px); box-shadow: 0 16px 30px rgba(102,150,214,.3); }
.event-card__img { transition: transform .6s; }
.event-card { overflow: hidden; }
.event-card:hover .event-card__img { transform: scale(1.05); }
.badge--live { position: relative; padding-left: 10px; }
.badge--live::before {
  content: ""; position: absolute; left: 9px; width: 6px; height: 6px; border-radius: 50%;
  background: #348e0a; animation: blink 1.2s infinite;
}
@keyframes blink { 50% { opacity: .2; } }
.events__grid.is-sliding { animation: slideGrid .45s ease; }
@keyframes slideGrid { from { opacity: .3; transform: translateX(var(--dir, 40px)); } }
.events__nav { transition: transform .2s; }
.events__nav--next:hover { transform: translateY(-50%) scale(1.12); }
.events__nav--prev:hover { transform: translateY(-50%) rotate(180deg) scale(1.12); }

/* --- Footer: sóng trôi nhẹ --- */
.footer__wave { animation: wave 14s ease-in-out infinite alternate; }
@keyframes wave { to { transform: rotate(-4.18deg) translateX(-80px); } }
.footer__timeline i { transform-origin: left; transform: scaleX(0); transition: transform 1.2s ease .3s; }
.footer.is-visible .footer__timeline i { transform: scaleX(1); }

/* --- Nút lên đầu trang --- */
.to-top {
  position: fixed; right: 24px; bottom: 24px; z-index: 60;
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--btn-grad); color: #fff; font-size: 22px;
  box-shadow: 0 6px 16px rgba(10,83,142,.3);
  opacity: 0; transform: translateY(20px); pointer-events: none; transition: .3s;
}
.to-top.is-show { opacity: 1; transform: none; pointer-events: auto; }

/* --- Thanh tiến trình cuộn --- */
.scroll-progress {
  position: fixed; top: 0; left: 0; z-index: 100; height: 3px; width: 0;
  background: linear-gradient(90deg, var(--imp-green), #00c5fc);
}

/* Người dùng bật "giảm chuyển động" thì tắt hiệu ứng */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .reveal, .milestone { opacity: 1 !important; transform: none !important; }
  .hero__title span > i { transform: none !important; }
  .thanks__script p { clip-path: none !important; }
}
`;
document.head.insertAdjacentHTML("beforeend", `<style>${effectCSS}</style>`);

/* Hàm tiện ích */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* =========================================================
   1. HEADER DÍNH + THANH TIẾN TRÌNH + NÚT LÊN ĐẦU
========================================================= */
const header = $(".header");
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.appendChild(progress);

const toTop = document.createElement("button");
toTop.className = "to-top";
toTop.setAttribute("aria-label", "Lên đầu trang");
toTop.textContent = "↑";
toTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(toTop);

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (y / max) * 100 + "%";
  if (header && innerWidth > 768) header.classList.toggle("is-sticky", y > 120);
  toTop.classList.toggle("is-show", y > 800);

  // Parallax nhẹ cho ảnh hero
  const heroBg = $(".hero__bg");
  if (heroBg && y < 1000) heroBg.style.translate = `0 ${y * 0.25}px`;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* =========================================================
   2. MENU: TÔ SÁNG MỤC ĐANG XEM
========================================================= */
const navLinks = $$(".header__nav a");
const sections = navLinks
  .map(a => $(a.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a =>
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id)
    );
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => navObserver.observe(s));

/* =========================================================
   3. HERO: CHỮ TRƯỢT LÊN TỪNG DÒNG
========================================================= */
$$(".hero__title span").forEach((line, i) => {
  line.innerHTML = `<i style="animation-delay:${0.2 + i * 0.15}s">${line.textContent}</i>`;
});

/* =========================================================
   4. HIỆN DẦN KHI CUỘN TỚI (gắn tự động, không cần sửa HTML)
========================================================= */
const revealMap = [
  [".hero__eyebrow, .hero__desc, .hero__actions", "up"],
  [".section-kicker, .section-title, .book__title, .journey__title, .thanks__kicker, .thanks__title", "up"],
  [".section-desc, .footer__desc", "up"],
  [".book__visual", "zoom"],
  [".journey__detail", "left"],
  [".stat-card", "up"],
  [".video__player", "zoom"],
  [".quote-stack", "right"],
  [".slider-ctrl, .thanks__hint, .thanks__thumbs", "up"],
  [".event-card", "up"],
  [".footer__title, .footer .btn", "left"],
  [".footer__bottom > *", "up"],
];
revealMap.forEach(([selector, anim]) => {
  $$(selector).forEach(el => {
    el.classList.add("reveal");
    el.dataset.anim = anim;
  });
});

// Các thẻ trong cùng 1 lưới hiện so le nhau
[".numbers__grid", ".events__grid", ".footer__bottom"].forEach(g => {
  $$(g + " > *").forEach((el, i) => (el.style.transitionDelay = (i % 4) * 0.12 + "s"));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("is-visible");
    revealObserver.unobserve(el);
    // xóa độ trễ sau khi hiện xong để hiệu ứng hover phản hồi ngay
    setTimeout(() => {
      el.style.transitionDelay = "";
      if (el.classList.contains("journey")) $$(".milestone").forEach(m => (m.style.transitionDelay = ""));
    }, 3000);
  });
}, { threshold: 0.15 });

$$(".reveal, .journey, .thanks__script, .footer").forEach(el => revealObserver.observe(el));

/* =========================================================
   5. HÀNH TRÌNH: CÁC DẤU MỐC HIỆN LẦN LƯỢT + BẤM ĐỂ XEM CHI TIẾT
========================================================= */
const milestones = $$(".milestone").sort(
  (a, b) => +$(".milestone-num", a).textContent - +$(".milestone-num", b).textContent
);
milestones.forEach((m, i) => (m.style.transitionDelay = 0.6 + i * 0.12 + "s"));

const detail = $(".journey__detail");
if (detail) {
  const detailNum   = $(".milestone-num", detail);
  const detailYears = $(".journey__years", detail);
  const detailTitle = $(".journey__detail-title", detail);
  const detailText  = $(".journey__detail-text", detail);

  milestones.forEach(m => {
    m.addEventListener("click", () => {
      milestones.forEach(x => x.classList.remove("is-active"));
      m.classList.add("is-active");

      const num   = $(".milestone-num", m).textContent;
      const years = $("small", m).textContent.split("-").map(s => s.trim());
      const title = $("b", m).textContent;

      detailNum.textContent = num;
      detailYears.innerHTML = years.length > 1
        ? `<span>${years[0]}</span><span class="journey__arrow">→</span><span>${years[1]}</span>`
        : `<span>${years[0]}</span>`;
      detailTitle.textContent = title;
      // Nội dung chi tiết từng mốc: thêm thuộc tính data-text="..." vào thẻ .milestone trong HTML
      detailText.textContent = m.dataset.text ||
        `Giai đoạn "${title}" – một dấu mốc quan trọng trên hành trình phát triển của Imexpharm.`;

      detail.classList.remove("is-changing");
      void detail.offsetWidth;            // khởi động lại animation
      detail.classList.add("is-changing");
    });
  });
}

/* =========================================================
   6. NHỮNG CON SỐ: ĐẾM TĂNG DẦN + NGHIÊNG 3D THEO CHUỘT
========================================================= */
function countUp(el) {
  const raw = el.textContent.trim();          // vd "2.035", "40+", "157"
  const suffix = raw.replace(/[\d.]/g, "");   // "+"
  const target = parseInt(raw.replace(/\D/g, ""), 10);
  const useDot = raw.includes(".");
  const duration = 1800;
  const start = performance.now();

  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(target * eased);
    el.textContent = (useDot ? val.toLocaleString("de-DE") : val) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    countUp(entry.target);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });
$$(".stat-card__value").forEach(el => countObserver.observe(el));

if (matchMedia("(hover: hover)").matches) {
  $$(".stat-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "transform .1s";
      card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform .5s";
      card.style.transform = "";
    });
  });
}

/* =========================================================
   7. VIDEO: BẤM PLAY MỞ POPUP
========================================================= */
const modal = document.createElement("div");
modal.className = "video-modal";
modal.innerHTML = `
  <div class="video-modal__box">
    <button class="video-modal__close" aria-label="Đóng">×</button>
    <div class="video-modal__content"></div>
  </div>`;
document.body.appendChild(modal);

function openVideo() {
  $(".video-modal__content", modal).innerHTML = VIDEO_URL
    ? `<iframe src="${VIDEO_URL}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`
    : `<div class="video-modal__msg">Chưa có video. Hãy dán link YouTube vào biến VIDEO_URL ở đầu file script.js</div>`;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeVideo() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => ($(".video-modal__content", modal).innerHTML = ""), 350);
}
$(".video__play")?.addEventListener("click", openVideo);
$(".video__player")?.addEventListener("click", e => { if (!e.target.closest(".video__play")) openVideo(); });
$(".video-modal__close", modal).addEventListener("click", closeVideo);
modal.addEventListener("click", e => { if (e.target === modal) closeVideo(); });
addEventListener("keydown", e => { if (e.key === "Escape") closeVideo(); });

/* =========================================================
   8. LỜI TRI ÂN: SLIDER (nút, chấm, ảnh nhỏ, kéo chuột/vuốt, tự chạy)
========================================================= */
// Sửa nội dung các lời tri ân tại đây
const thanksData = [
  { name: "Nguyen Van A", role: "Nhân viên truyền thông", years: "10 năm", photo: "images/avatar.png" },
  { name: "Tran Thi B",   role: "Dược sĩ R&D",             years: "15 năm", photo: "images/thumb-1.png" },
  { name: "Le Van C",     role: "Quản lý sản xuất",        years: "20 năm", photo: "images/thumb-2.png" },
  { name: "Pham Thi D",   role: "Chuyên viên chất lượng",  years: "8 năm",  photo: "images/thumb-3.png" },
  { name: "Hoang Van E",  role: "Kỹ sư nhà máy",           years: "12 năm", photo: "images/thumb-4.png" },
  { name: "Vo Thi F",     role: "Nhân viên kinh doanh",    years: "6 năm",  photo: "images/thumb-5.png" },
  { name: "Dang Van G",   role: "Trưởng phòng nhân sự",    years: "18 năm", photo: "images/avatar.png" },
  { name: "Bui Thi H",    role: "Chuyên viên xuất khẩu",   years: "9 năm",  photo: "images/thumb-1.png" },
];

const front = $(".quote-card--front");
if (front) {
  const total = thanksData.length;
  const dots = $$(".slider-ctrl__dots span");
  const thumbs = $$(".thanks__thumbs img");
  const counter = $(".slider-ctrl__count");
  let current = 0;
  let timer;

  function render(i) {
    const d = thanksData[i];
    $(".quote-card__photo", front).src = d.photo;
    $(".quote-card__photo", front).alt = d.name;
    $(".quote-card__name", front).textContent = d.name;
    $(".quote-card__role", front).textContent = d.role;
    $(".quote-card__years b", front).textContent = d.years;
    if (d.text) $(".quote-card__text", front).textContent = d.text;
    counter.innerHTML = `<b>${String(i + 1).padStart(2, "0")}/</b>${String(total).padStart(2, "0")}`;
    dots.forEach((dot, k) => dot.classList.toggle("is-active", k === i % dots.length));
    thumbs.forEach((t, k) => t.classList.toggle("is-active", k === i));
  }

  function goTo(i, dir = 1) {
    i = (i + total) % total;
    if (i === current) return;
    front.classList.add(dir > 0 ? "is-out-left" : "is-out-right");
    setTimeout(() => {
      current = i;
      render(current);
      front.classList.remove("is-out-left", "is-out-right");
    }, 400);
    restartAuto();
  }

  function restartAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1, 1), 6000);
  }

  $(".slider-ctrl__btn--next")?.addEventListener("click", () => goTo(current + 1, 1));
  $(".slider-ctrl__btn--prev")?.addEventListener("click", () => goTo(current - 1, -1));
  dots.forEach((dot, k) => dot.addEventListener("click", () => goTo(k, k > current ? 1 : -1)));
  thumbs.forEach((t, k) => t.addEventListener("click", () => goTo(k, k > current ? 1 : -1)));
  $(".thanks__more")?.addEventListener("click", () => goTo(current + 1, 1));

  // Kéo chuột / vuốt để đổi thẻ
  const stack = $(".quote-stack");
  let startX = null;
  stack.addEventListener("pointerdown", e => { startX = e.clientX; stack.classList.add("is-dragging"); });
  addEventListener("pointerup", e => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    startX = null;
    stack.classList.remove("is-dragging");
  });
  stack.addEventListener("mouseenter", () => clearInterval(timer));
  stack.addEventListener("mouseleave", restartAuto);

  render(0);
  restartAuto();
}

/* =========================================================
   9. SỰ KIỆN: NÚT TRÁI/PHẢI XOAY VÒNG CÁC THẺ
========================================================= */
const grid = $(".events__grid");
function slideEvents(dir) {
  if (!grid) return;
  if (dir > 0) grid.appendChild(grid.firstElementChild);
  else grid.prepend(grid.lastElementChild);
  grid.style.setProperty("--dir", dir > 0 ? "40px" : "-40px");
  grid.classList.remove("is-sliding");
  void grid.offsetWidth;
  grid.classList.add("is-sliding");
}
$(".events__nav--next")?.addEventListener("click", () => slideEvents(1));
$(".events__nav--prev")?.addEventListener("click", () => slideEvents(-1));