/* ============================================================
   MOS365.info — main.js
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById("siteHeader");
  var backTop = document.getElementById("backTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 8);
    if (backTop) backTop.hidden = y < 600;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  var overlay = document.getElementById("navOverlay");

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    if (overlay) overlay.hidden = !open;
  }

  navToggle.addEventListener("click", function () {
    setNav(!document.body.classList.contains("nav-open"));
  });

  if (overlay) overlay.addEventListener("click", function () { setNav(false); });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setNav(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Count-up stats ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";

    if (reduceMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Software screenshot tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".screen-tab"));
  var screens = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var caption = document.getElementById("screenCaption");

  var captions = {
    word: "MOS Word 2019/365 — đề thi thật, đồng hồ đếm ngược, nút “Chấm điểm” và “Khuyến nghị” như phòng thi.",
    excel: "MOS Excel 2019/365 — làm bài trên bảng tính thật, hệ thống chấm điểm từng tác vụ ngay khi nộp bài.",
    powerpoint: "MOS PowerPoint 2019/365 — thao tác trên slide thật, kết quả và khuyến nghị năng lực dự thi hiển thị tức thì."
  };

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var key = tab.getAttribute("data-screen");

      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });

      screens.forEach(function (s) {
        s.classList.toggle("active", s.getAttribute("data-screen") === key);
      });

      if (caption && captions[key]) caption.textContent = captions[key];
    });
  });

  /* ---------- Video giới thiệu ---------- */
  var introVideo = document.getElementById("introVideo");
  var videoOverlay = document.getElementById("videoOverlay");

  if (introVideo && videoOverlay) {
    videoOverlay.addEventListener("click", function () {
      videoOverlay.hidden = true;
      introVideo.play();
    });

    introVideo.addEventListener("ended", function () {
      videoOverlay.hidden = false;
    });
  }

  /* ---------- Back to top ---------- */
  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Toast ---------- */
  var toast = document.getElementById("toast");
  var toastTitle = document.getElementById("toastTitle");
  var toastMsg = document.getElementById("toastMsg");
  var toastTimer = null;

  function showToast(title, msg) {
    if (!toast) return;
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 5000);
  }

  /* ---------- Register form ---------- */
  var form = document.getElementById("registerForm");

  if (form) {
    var phoneRe = /^[+]?[0-9][0-9\s.\-]{7,14}$/;
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("fname");
      var email = document.getElementById("femail");
      var phone = document.getElementById("fphone");
      var ok = true;

      [name, email, phone].forEach(function (input) { input.classList.remove("invalid"); });

      if (!name.value.trim()) { name.classList.add("invalid"); ok = false; }
      if (!emailRe.test(email.value.trim())) { email.classList.add("invalid"); ok = false; }
      if (!phoneRe.test(phone.value.trim())) { phone.classList.add("invalid"); ok = false; }

      if (!ok) {
        showToast("Thông tin chưa hợp lệ", "Vui lòng kiểm tra lại họ tên, email và số điện thoại.");
        return;
      }

      var courses = Array.prototype.slice
        .call(form.querySelectorAll('input[name="course"]:checked'))
        .map(function (c) { return c.value; });

      var versionInput = form.querySelector('input[name="version"]:checked');
      var version = versionInput ? versionInput.value : "";

      // Demo: chưa có backend — hiển thị xác nhận và ghi log dữ liệu.
      console.log("Đăng ký MOS365:", {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        version: version || "(chưa chọn)",
        courses: courses,
        message: document.getElementById("fnote").value.trim()
      });

      var details = [];
      if (version) details.push("Phiên bản MOS: " + version);
      if (courses.length) details.push("Khóa quan tâm: " + courses.join(", "));

      showToast(
        "Đăng ký thành công!",
        details.length
          ? details.join(" · ") + ". Chúng tôi sẽ liên hệ trong 24 giờ."
          : "Chúng tôi sẽ liên hệ tư vấn lộ trình trong vòng 24 giờ."
      );

      form.reset();
    });
  }
})();
