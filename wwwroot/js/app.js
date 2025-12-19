/* [site.js] 
   공통 기능: 모달, 알람 엔진(진동/소리), Toast 최적화
*/

// 효과음
const alarmSound = new Audio(
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
);

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();

  // 1초마다 알람 체크
  setInterval(checkAlarmTime, 1000);

  // Toast 스타일 주입
  injectToastStyle();
});

// === 1. 알람 엔진 (사용자별 데이터 연동 수정됨) ===
let alertedMinutes = [];

function checkAlarmTime() {
  // 현재 로그인한 유저 정보 확인
  const currentUser = localStorage.getItem("user");
  if (!currentUser) return; // 로그인 안했으면 알람 체크 안함

  // 유저별 키로 데이터 임포트
  const storageKey = "watchList_" + currentUser;
  const list = JSON.parse(localStorage.getItem(storageKey)) || [];

  if (list.length === 0) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const currentHM = `${hours}:${minutes}`;

  const todayKey = now.toDateString() + " " + currentHM;

  list.forEach((item) => {
    if (item.alarm === currentHM) {
      // 중복 방지 강화
      const uniqueKey = todayKey + "_" + currentUser + "_" + item.id;

      if (!alertedMinutes.includes(uniqueKey)) {
        // 1. Toast 알림
        showToast(
          `🔔 <b>${item.alarm}</b><br>${item.msg || "알람 시간입니다!"}`
        );

        // 2. 진동
        if (navigator.vibrate) {
          navigator.vibrate([500, 200, 500]);
        }

        // 3. 소리
        try {
          alarmSound.currentTime = 0;
          alarmSound.play().catch(() => console.log("브라우저 정책 차단"));
        } catch (e) {}

        alertedMinutes.push(uniqueKey);
      }
    }
  });

  if (alertedMinutes.length > 50) {
    alertedMinutes = alertedMinutes.slice(-20);
  }
}

// === 2. Toast UI ===
function injectToastStyle() {
  if (document.getElementById("toastStyle")) return;
  const style = document.createElement("style");
  style.id = "toastStyle";
  style.innerHTML = `
        @keyframes slideDown { from {top:-50px; opacity:0;} to {top:20px; opacity:1;} }
        @keyframes fadeOut { from {opacity:1;} to {opacity:0;} }
        .toast-box {
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: rgba(0,0,0,0.85); color: #fff; padding: 15px 25px;
            border-radius: 30px; font-weight: bold; z-index: 9999;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3); text-align: center;
            width: 80%; max-width: 300px;
            animation: slideDown 0.5s ease forwards;
            font-size: 0.95rem; line-height: 1.4;
        }
    `;
  document.head.appendChild(style);
}

function showToast(msg) {
  const oldToast = document.getElementById("toastAlert");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.id = "toastAlert";
  toast.className = "toast-box";
  toast.innerHTML = msg;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOut 0.5s ease forwards";
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 500);
  }, 3000);
}

// === 3. 공통 모달 및 인증 ===
function showModal(title, content, callback = null, showCancel = false) {
  const modal = document.getElementById("commonModal");
  if (!modal) return;
  const titleEl = document.getElementById("modalTitle");
  const bodyEl = document.getElementById("modalBody");
  const okBtn = document.getElementById("modalOkBtn");
  const cancelBtn = document.getElementById("modalCancelBtn");

  titleEl.innerText = title;
  bodyEl.innerHTML = content;
  cancelBtn.style.display = showCancel ? "block" : "none";

  const newOkBtn = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newOkBtn, okBtn);
  newOkBtn.addEventListener("click", () => {
    if (callback && callback() === false) return;
    closeModal();
  });
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("commonModal");
  if (modal) modal.style.display = "none";
}

function alertModal(msg, callback = null) {
  showModal("알림", msg, callback, false);
}

function checkAuth() {
  const user = localStorage.getItem("user");
  const path = window.location.pathname;
  if (!user && !path.toLowerCase().includes("login")) {
    window.location.href = "/Home/Login";
  }
}

function logout() {
  localStorage.removeItem("user");
  alertedMinutes = []; // 로그아웃 시 알람 기록 초기화
  alertModal("로그아웃 되었습니다.", () => {
    window.location.href = "/Home/Login";
  });
}
