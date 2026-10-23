/* =========================================================
   VIDEO-AUTOPLAY.JS – TỰ PHÁT VIDEO KHI CUỘN TỚI
   Cách dùng: đặt file cạnh index.html, thêm dòng sau
   ngay trước </body>, BÊN DƯỚI dòng script.js:

       <script src="video-autoplay.js"></script>

   - Cuộn tới phần video: video tự chạy ngay trong khung (tắt tiếng,
     vì trình duyệt chỉ cho tự phát khi tắt tiếng).
   - Cuộn qua khỏi: video tự tạm dừng. Cuộn lại: chạy tiếp.
   - Người xem bấm biểu tượng loa của YouTube để bật tiếng.
========================================================= */

(function () {
  /* Lấy mã video từ biến VIDEO_URL trong script.js
     (hoặc điền trực tiếp mã video vào đây nếu muốn) */
  let videoId = "";
  if (typeof VIDEO_URL !== "undefined" && VIDEO_URL) {
    const m = VIDEO_URL.match(/(?:embed\/|v=|youtu\.be\/|shorts\/)([\w-]{11})/);
    if (m) videoId = m[1];
  }
  if (!videoId) videoId = "L6rtmqkmjUs";

  const player = document.querySelector(".video__player");
  if (!player) return;

  /* CSS */
  document.head.insertAdjacentHTML("beforeend", `<style>
    .video__player { position: relative; }
    .video__inline {
      position: absolute; inset: 0; width: 100%; height: 100%;
      border: 0; opacity: 0; transition: opacity .8s ease;
    }
    .video__player.is-playing .video__inline { opacity: 1; }
    .video__player.is-playing .video__play,
    .video__player.is-playing .video__thumb { opacity: 0; pointer-events: none; transition: opacity .8s; }
    .video__mute-tip {
      position: absolute; left: 16px; bottom: 16px; z-index: 3;
      padding: 8px 14px; border-radius: 999px;
      background: rgba(5,25,50,.75); color: #fff; font-size: 14px;
      pointer-events: none; opacity: 0; transform: translateY(8px);
      transition: opacity .4s, transform .4s;
    }
    .video__mute-tip.is-show { opacity: 1; transform: none; }
  </style>`);

  let iframe = null;

  function send(func) {
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args: [] }), "*"
    );
  }

  function createPlayer() {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",            // bắt buộc tắt tiếng thì trình duyệt mới cho tự phát
      loop: "1",
      playlist: videoId,    // cần cho loop hoạt động
      controls: "1",
      rel: "0",
      playsinline: "1",     // phát ngay trong trang trên iPhone
      modestbranding: "1",
      enablejsapi: "1",     // cho phép tạm dừng / chạy tiếp khi cuộn
    });
    iframe = document.createElement("iframe");
    iframe.className = "video__inline";
    iframe.src = `https://www.youtube.com/embed/${videoId}?${params}`;
    iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.title = "Thước phim 50 năm Imexpharm";
    player.appendChild(iframe);

    const tip = document.createElement("div");
    tip.className = "video__mute-tip";
    tip.textContent = "🔇 Bấm biểu tượng loa để bật tiếng";
    player.appendChild(tip);

    iframe.addEventListener("load", () => {
      player.classList.add("is-playing");
      setTimeout(() => tip.classList.add("is-show"), 600);
      setTimeout(() => tip.classList.remove("is-show"), 5000);
    });
  }

  /* Tự chạy khi thấy ≥ 50% khung video, tạm dừng khi cuộn đi */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!iframe) createPlayer();
        else send("playVideo");
      } else if (iframe) {
        send("pauseVideo");
      }
    });
  }, { threshold: 0.5 });

  observer.observe(player);
})();