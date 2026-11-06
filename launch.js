/* ==========================================================================
   Starry Break v3 - launch.js
   5s initial countdown + dynamic 10s auto-launch timer (Always Active)
   Maintains strict compliance with the PS4 WebKit Referrer Guard
   ========================================================================== */

(function () {
  "use strict";

  // معلمات الاستهداف المتوافقة مع صفحة التنفيذ jb.html
  var TARGET = {
    hen: "log=1&afterglow=run&payload=hen.bin",
    goldhen: "log=1&afterglow=run&mode=goldhen",
  };

  var AUTOSTART_SECONDS = 5;
  var AUTO_LAUNCH_SECONDS = 10;
  var CIRCUMFERENCE = 427.26; // 2 * Math.PI * 68
  var STORE_KEY = "starry.payload";
  var CACHE_WAIT_MS = 4000;

  var ARABIC_DIGITS = {
    5: "٥",
    4: "٤",
    3: "٣",
    2: "٢",
    1: "١",
    0: "٠",
  };

  // عناصر الواجهة
  var countdownBox = document.getElementById("countdownBox");
  var readyBox = document.getElementById("readyBox");
  var timerCircle = document.getElementById("timerCircle");
  var timerNum = document.getElementById("timerNum");
  var timerLabel = document.getElementById("timerLabel");
  var cacheStatus = document.getElementById("cacheStatus");
  var startBtn = document.getElementById("startBtn");
  var autoNotice = document.getElementById("autoNotice");
  var countdownNum = document.getElementById("countdownNum");
  var payloadSelector = document.getElementById("payloadSelector");

  // عناصر نافذة الحقوق
  var creditsBtn = document.getElementById("creditsBtn");
  var creditsModal = document.getElementById("creditsModal");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var dismissModalBtn = document.getElementById("dismissModalBtn");

  var initialTicker = null;
  var autoLaunchTicker = null;
  var initialSecondsLeft = AUTOSTART_SECONDS;
  var autoSecondsLeft = AUTO_LAUNCH_SECONDS;
  var waitingForCache = false;
  var cacheTimer = null;
  var gone = false;

  // مرجع الـ Application Cache
  var appCache = (function () {
    try {
      return window.applicationCache || null;
    } catch (e) {
      return null;
    }
  })();

  function isCacheBusy() {
    if (!appCache) return false;
    try {
      return (
        appCache.status === appCache.CHECKING ||
        appCache.status === appCache.DOWNLOADING
      );
    } catch (e) {
      return false;
    }
  }

  function updateCacheNote() {
    if (!cacheStatus || !appCache) return;
    var msg = "";
    try {
      if (appCache.status === appCache.CHECKING) {
        msg = "جاري التحقق من التحديثات...";
      } else if (appCache.status === appCache.DOWNLOADING) {
        msg = "جاري تحميل الملفات للعمل دون إنترنت...";
      } else if (appCache.status === appCache.UPDATEREADY) {
        msg = "تم حفظ نسخة أحدث - أعد فتح الصفحة لاستخدامها";
      } else if (appCache.status === appCache.CACHED) {
        msg = "تم التخزين المؤقت بنجاح (جاهز دون اتصال)";
      }
    } catch (e) {}
    cacheStatus.textContent = msg;
  }

  function onCacheChange() {
    updateCacheNote();
    if (waitingForCache && !isCacheBusy()) {
      waitingForCache = false;
      start();
    }
  }

  if (appCache) {
    var events = [
      "checking",
      "downloading",
      "progress",
      "cached",
      "noupdate",
      "updateready",
      "error",
      "obsolete",
    ];
    for (var i = 0; i < events.length; i++) {
      try {
        appCache.addEventListener(events[i], onCacheChange, false);
      } catch (err) {}
    }
  }

  // إدارة الحمولة المختارة
  function getSelectedPayload() {
    var radio = document.querySelector('input[name="payload"]:checked');
    return radio ? radio.value : "goldhen";
  }

  function savePayloadChoice() {
    try {
      localStorage.setItem(STORE_KEY, getSelectedPayload());
    } catch (e) {}
  }

  function restorePayloadChoice() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved && TARGET[saved]) {
        var radio = document.querySelector(
          'input[name="payload"][value="' + saved + '"]'
        );
        if (radio) radio.checked = true;
      }
    } catch (e) {}
  }

  // مغادرة الصفحة وتمرير الـ Referrer الصحيح لـ jb.html
  function go() {
    if (gone) return;
    gone = true;
    stopAllTimers();
    if (cacheTimer !== null) {
      clearTimeout(cacheTimer);
      cacheTimer = null;
    }
    var targetParams = TARGET[getSelectedPayload()] || TARGET.goldhen;
    location.href = "jb.html?" + targetParams;
  }

  function isOffline() {
    try {
      return navigator.onLine === false;
    } catch (e) {
      return false;
    }
  }

  function start() {
    stopAutoLaunchTimer();
    if (!isOffline() && isCacheBusy()) {
      waitingForCache = true;
      if (timerLabel) timerLabel.textContent = "بانتظار اكتمال التخزين المؤقت...";
      updateCacheNote();
      if (cacheTimer === null) {
        cacheTimer = setTimeout(function () {
          cacheTimer = null;
          if (!gone) {
            go();
          }
        }, CACHE_WAIT_MS);
      }
      return;
    }
    go();
  }

  // دوال إيقاف العدادات
  function stopInitialCountdown() {
    if (initialTicker !== null) {
      clearInterval(initialTicker);
      initialTicker = null;
    }
  }

  function stopAutoLaunchTimer() {
    if (autoLaunchTicker !== null) {
      clearInterval(autoLaunchTicker);
      autoLaunchTicker = null;
    }
  }

  function stopAllTimers() {
    stopInitialCountdown();
    stopAutoLaunchTimer();
  }

  // دورة العداد الأولي (5 ثوانٍ)
  function updateInitialTimerUI(sec) {
    if (timerNum) {
      timerNum.textContent = ARABIC_DIGITS[sec] || sec;
    }
    if (timerCircle) {
      var fraction = (AUTOSTART_SECONDS - sec) / AUTOSTART_SECONDS;
      var offset = fraction * CIRCUMFERENCE;
      timerCircle.style.strokeDashoffset = offset;
    }
  }

  // دورة عداد الإطلاق التلقائي (10 ثوانٍ)
  function startAutoLaunchTimer() {
    stopAutoLaunchTimer();
    autoSecondsLeft = AUTO_LAUNCH_SECONDS;

    if (countdownNum) {
      countdownNum.textContent = autoSecondsLeft;
    }
    if (autoNotice) {
      autoNotice.classList.add("visible");
    }

    autoLaunchTicker = setInterval(function () {
      autoSecondsLeft -= 1;

      if (countdownNum) {
        countdownNum.textContent = autoSecondsLeft;
      }

      // عند الوصول إلى الصفر -> إطلاق تلقائي
      if (autoSecondsLeft <= 0) {
        stopAutoLaunchTimer();
        start();
      }
    }, 1000);
  }

  function finishInitialCountdown() {
    stopInitialCountdown();

    if (countdownBox) {
      countdownBox.classList.add("hidden");
    }

    if (readyBox) {
      readyBox.style.display = "flex";
      setTimeout(function () {
        readyBox.classList.add("active");
        // بدء عداد الـ 10 ثوانٍ التلقائي دائماً
        startAutoLaunchTimer();
      }, 30);
    }
  }

  function runInitialCountdown() {
    initialSecondsLeft = AUTOSTART_SECONDS;
    updateInitialTimerUI(initialSecondsLeft);

    initialTicker = setInterval(function () {
      initialSecondsLeft -= 1;
      if (initialSecondsLeft <= 0) {
        updateInitialTimerUI(0);
        finishInitialCountdown();
        return;
      }
      updateInitialTimerUI(initialSecondsLeft);
    }, 1000);
  }

  // التحكم في نافذة الحقوق
  function openModal() {
    if (creditsModal) {
      creditsModal.style.display = "flex";
      setTimeout(function () {
        creditsModal.classList.add("open");
      }, 20);
    }
  }

  function closeModal() {
    if (creditsModal) {
      creditsModal.classList.remove("open");
      setTimeout(function () {
        creditsModal.style.display = "none";
      }, 300);
    }
  }

  // ربط أحداث النقر
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      // إلغاء عداد الإطلاق التلقائي والتشغيل فوراً
      stopAutoLaunchTimer();
      start();
    });
  }

  if (payloadSelector) {
    payloadSelector.addEventListener("change", function () {
      savePayloadChoice();
    });
  }

  if (creditsBtn) {
    creditsBtn.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (dismissModalBtn) {
    dismissModalBtn.addEventListener("click", closeModal);
  }

  if (creditsModal) {
    creditsModal.addEventListener("click", function (e) {
      if (e.target === creditsModal) {
        closeModal();
      }
    });
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      closeModal();
    }
  });

  // التهيئة الأولية
  restorePayloadChoice();
  updateCacheNote();
  runInitialCountdown();
})();
