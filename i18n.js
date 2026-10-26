/* =========================================================
   I18N.JS – ĐỔI CHỮ DO JAVASCRIPT TẠO RA SANG TIẾNG ANH
   - Chỉ chạy khi trang là <html lang="en"> (en.html).
   - Trên index.html (tiếng Việt) file này không làm gì.
   - Gọi file này CUỐI CÙNG, sau script.js, flip-card.js, video-autoplay.js.
========================================================= */
(function () {
  if (document.documentElement.lang !== "en") return;

  /* ---------- 1. Từ điển: chức vụ trong phần Lời tri ân ---------- */
  const ROLES = {
    "Nhân viên truyền thông": "Communications Officer",
    "Dược sĩ R&D": "R&D Pharmacist",
    "Quản lý sản xuất": "Production Manager",
    "Chuyên viên chất lượng": "Quality Specialist",
    "Kỹ sư nhà máy": "Plant Engineer",
    "Nhân viên kinh doanh": "Sales Executive",
    "Trưởng phòng nhân sự": "HR Manager",
    "Chuyên viên xuất khẩu": "Export Specialist",
  };
  const years = s => s.replace(/(\d+)\s*năm/, (m, n) => n + (n === "1" ? " year" : " years"));

  /* Sửa dữ liệu slider (biến thanksData trong script.js) để các thẻ sau cũng là tiếng Anh */
  if (typeof thanksData !== "undefined" && Array.isArray(thanksData)) {
    thanksData.forEach(d => {
      if (ROLES[d.role]) d.role = ROLES[d.role];
      if (d.years) d.years = years(d.years);
    });
  }
  /* Sửa thẻ đang hiện */
  const role = document.querySelector(".quote-card__role");
  if (role && ROLES[role.textContent.trim()]) role.textContent = ROLES[role.textContent.trim()];
  const yr = document.querySelector(".quote-card__years b");
  if (yr) yr.textContent = years(yr.textContent);

  /* ---------- 2. Thẻ lật (flip-card.js) ---------- */
  document.querySelectorAll(".flip__btn").forEach(btn => {
    btn.childNodes.forEach(node => {
      if (node.nodeType !== 3) return;               // chỉ sửa phần chữ, giữ nguyên icon
      node.textContent = node.textContent
        .replace("Xem chi tiết", "View details")
        .replace("Quay lại", "Back");
    });
  });

  /* ---------- 3. Nút lên đầu trang, popup video ---------- */
  const toTop = document.querySelector(".to-top");
  if (toTop) toTop.setAttribute("aria-label", "Back to top");
  const closeBtn = document.querySelector(".video-modal__close");
  if (closeBtn) closeBtn.setAttribute("aria-label", "Close");

  /* ---------- 4. Chữ xuất hiện sau (video tự phát, popup, dấu mốc) ---------- */
  const fix = el => {
    if (el.matches?.(".video__mute-tip")) el.textContent = "🔇 Tap the speaker icon to unmute";
    if (el.matches?.(".video__inline")) el.title = "Imexpharm 50-year film";
    if (el.matches?.(".video-modal__msg"))
      el.textContent = "No video yet. Paste a YouTube link into VIDEO_URL at the top of script.js";
  };
  new MutationObserver(list => {
    list.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType !== 1) return;
      fix(n);
      n.querySelectorAll?.("*").forEach(fix);
    }));
  }).observe(document.body, { childList: true, subtree: true });

  /* Mô tả mặc định khi bấm dấu mốc Hành trình (khi chưa có data-text) */
  document.querySelectorAll(".milestone").forEach(m => {
    m.addEventListener("click", () => {
      if (m.dataset.text) return;
      const title = m.querySelector("b")?.textContent || "";
      const text = document.querySelector(".journey__detail-text");
      if (text) text.textContent = `“${title}” – a key milestone in Imexpharm’s journey of growth.`;
    });
  });
})();