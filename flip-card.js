/* =========================================================
   FLIP-CARD.JS – LẬT THẺ "NHỮNG CON SỐ ẤN TƯỢNG"
   Cách dùng: đặt file cạnh index.html, thêm dòng sau
   ngay trước </body> (trên hoặc dưới dòng script.js đều được):

       <script src="flip-card.js"></script>

   - Máy tính: rê chuột vào thẻ là thẻ lật.
   - Điện thoại: chạm "Xem chi tiết" để lật, chạm "Quay lại" để lật về.
   - Muốn mặt sau có nội dung riêng: thêm data-back="..." vào thẻ
     <article class="stat-card" data-back="Nội dung mặt sau">
========================================================= */

(function () {
  /* ---------- CSS cho hiệu ứng lật ---------- */
  const css = `
  .stat-card.flip {
    padding: 0 !important;
    background: none !important;
    box-shadow: none !important;
    perspective: 1400px;
    transform: none !important;          /* tắt hiệu ứng nghiêng cũ để không xung đột */
    cursor: pointer;
  }
  .flip__inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform .8s cubic-bezier(.3,.7,.2,1);
  }
  .stat-card.flip.is-flipped .flip__inner { transform: rotateY(180deg); }
  @media (hover: hover) {
    .stat-card.flip:hover .flip__inner { transform: rotateY(180deg); }
  }

  .flip__face {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    padding: 19px 28px 0;
    border-radius: 7px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
  }

  /* Mặt trước */
  .flip__front {
    background: var(--card-grad);
    box-shadow: var(--shadow);
    color: var(--imp);
  }
  .flip__front .stat-card__value { margin-top: 10px; }

  /* Mặt sau */
  .flip__back {
    transform: rotateY(180deg);
    justify-content: center;
    padding: 32px 30px;
    color: #fff;
    background:
      radial-gradient(circle at 85% 10%, rgba(140,194,65,.35), transparent 45%),
      linear-gradient(155deg, #0a538e 0%, #0b6fb8 55%, #00a6e0 100%);
    box-shadow: 0 10px 28px rgba(10,83,142,.35);
  }
  .flip__back .stat-card__title { color: #fff; }
  .flip__back .stat-card__title::after { background: var(--imp-green); }
  .flip__back-value {
    margin-top: 18px;
    font-weight: 900;
    font-size: 44px;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .flip__back-value small { display: block; font-size: 18px; font-weight: 400; opacity: .9; }
  .flip__back .stat-card__text {
    margin: 18px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: rgba(255,255,255,.95);
  }
  .flip__back-icon {
    position: absolute;
    right: -30px;
    bottom: -20px;
    width: 170px;
    opacity: .14;
    filter: brightness(0) invert(1);
    pointer-events: none;
  }

  /* Nút lật */
  .flip__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: auto 0 18px 14px;
    padding-top: 8px;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.6;
    color: inherit;
    background: none;
    border: 0;
    cursor: pointer;
  }
  .flip__btn img { width: 22px; transition: transform .3s; }
  .flip__btn:hover img { transform: translateX(6px); }
  .flip__back .flip__btn { margin: 26px 0 0; color: #fff; }
  .flip__back .flip__btn span { transition: transform .3s; }
  .flip__back .flip__btn:hover span { transform: translateX(-6px); }

  /* Gợi ý lật ở góc thẻ */
  .flip__hint {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(10,83,142,.08);
    font-size: 15px;
    color: var(--imp);
    animation: flipHint 2.4s ease-in-out infinite;
  }
  @keyframes flipHint { 0%,100% { transform: rotateY(0); } 50% { transform: rotateY(180deg); } }

  @media (max-width: 768px) {
    .stat-card.flip { height: 440px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .flip__inner { transition: none; }
    .flip__hint { animation: none; }
  }
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  /* ---------- Dựng mặt trước / mặt sau cho từng thẻ ---------- */
  document.querySelectorAll(".stat-card").forEach(card => {
    if (card.classList.contains("flip")) return;

    const title = card.querySelector(".stat-card__title");
    const icon  = card.querySelector(".stat-card__icon");
    const value = card.querySelector(".stat-card__value");
    const unit  = card.querySelector(".stat-card__unit");
    const text  = card.querySelector(".stat-card__text");
    const link  = card.querySelector(".stat-card__link");
    const arrow = link ? link.querySelector("img") : null;

    const inner = document.createElement("div");
    inner.className = "flip__inner";

    /* Mặt trước: tiêu đề, icon, con số, đơn vị, nút "Xem chi tiết" */
    const front = document.createElement("div");
    front.className = "flip__face flip__front";
    front.innerHTML = `<span class="flip__hint" aria-hidden="true">↻</span>`;
    [title, icon, value, unit].forEach(el => el && front.appendChild(el));

    const btnMore = document.createElement("button");
    btnMore.type = "button";
    btnMore.className = "flip__btn";
    btnMore.innerHTML = `Xem chi tiết ${arrow ? `<img src="${arrow.getAttribute("src")}" alt="" />` : "→"}`;
    front.appendChild(btnMore);

    /* Mặt sau: tiêu đề, con số (đồng bộ khi đếm), mô tả, nút "Quay lại" */
    const back = document.createElement("div");
    back.className = "flip__face flip__back";

    const backTitle = document.createElement("h3");
    backTitle.className = "stat-card__title";
    backTitle.textContent = title ? title.textContent : "";

    const backValue = document.createElement("p");
    backValue.className = "flip__back-value";
    const syncValue = () => {
      backValue.innerHTML = `${value ? value.textContent : ""}<small>${unit ? unit.textContent : ""}</small>`;
    };
    syncValue();
    if (value) new MutationObserver(syncValue).observe(value, { childList: true, characterData: true, subtree: true });

    const backText = document.createElement("p");
    backText.className = "stat-card__text";
    backText.textContent = card.dataset.back || (text ? text.textContent : "");

    const btnBack = document.createElement("button");
    btnBack.type = "button";
    btnBack.className = "flip__btn";
    btnBack.innerHTML = `<span>←</span> Quay lại`;

    back.append(backTitle, backValue, backText, btnBack);
    if (icon) {
      const ghost = icon.cloneNode();
      ghost.className = "flip__back-icon";
      ghost.alt = "";
      back.appendChild(ghost);
    }

    /* Bỏ phần cũ, gắn cấu trúc mới */
    if (text) text.remove();
    if (link) link.remove();
    inner.append(front, back);
    card.appendChild(inner);
    card.classList.add("flip");
    card.setAttribute("tabindex", "0");

    /* Lật bằng nút / chạm / phím Enter */
    btnMore.addEventListener("click", e => { e.stopPropagation(); card.classList.add("is-flipped"); });
    btnBack.addEventListener("click", e => { e.stopPropagation(); card.classList.remove("is-flipped"); });
    card.addEventListener("click", () => {
      if (!matchMedia("(hover: hover)").matches) card.classList.toggle("is-flipped");
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.classList.toggle("is-flipped"); }
    });
    card.addEventListener("mouseleave", () => card.classList.remove("is-flipped"));
  });
})();