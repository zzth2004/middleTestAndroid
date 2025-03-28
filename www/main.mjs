import { CameraUtils, ShareAPI, Notification, LocationUtils } from "./utils.mjs";

// Chờ DOM tải xong
document.addEventListener("DOMContentLoaded", function () {
  // ✅ Phần camera
  const cameraUtils = new CameraUtils();
  const takePictureBtn = document.getElementById("takePictureBtn");
  const photoEl = document.getElementById("photo");

  cameraUtils.apply(
    takePictureBtn,
    (image) => {
      console.log(image);
      photoEl.src = image.webPath;
      photoEl.style.display = "block";
    },
    (errors) => {
      console.error(errors);
    }
  );

  // ✅ Phần ScreenShot

  // ✅ Phần thông báo
  const notification = new Notification();
  const notificationBtn = document.getElementById("notificationBtn");
  notificationBtn.onclick = async () => {
    await notification.sendNotification("My Middle App", "QThuanDtryNo1 xin chào các bạn", "");
  };

  // ✅ Phần chia sẻ
  const share = new ShareAPI();
  const shareBtn = document.getElementById("shareBtn");
  shareBtn.onclick = async () => {

    const currentTime = timeDisplay.innerText;
    await share.shareContent(
           "Chia sẻ thời gian hiện tại",
           `QThuan đang chia sẻ với bạn: ${currentTime}`,
           "https://www.facebook.com/quang.thuan.38061/?locale=vi_VN"
       );
  };
// ✅ Phần show time
    const showTimeBtn = document.getElementById("showTimeBtn");
    const timePopup = document.getElementById("timePopup");
    const timeDisplay = document.getElementById("timeDisplay");
    const closePopup = document.getElementById("closePopup");

    let updateTimeInterval = null;

    if (showTimeBtn && timePopup && timeDisplay && closePopup) {
        showTimeBtn.onclick =  () => {
            timePopup.classList.remove("hidden");
            timePopup.style.opacity = "0";
            setTimeout(() => (timePopup.style.opacity = "1"), 50);

            const updateTime = async () => {
                const now = new Date();
                const currentTime = `⏰ Giờ hiện tại: ${now.toLocaleTimeString()}`;
                timeDisplay.innerText = `⏰ Giờ hiện tại: ${now.toLocaleTimeString()}`;
                await notification.sendNotification("My Middle App", currentTime, "");
            };

            updateTime();
            if (!updateTimeInterval) {
                updateTimeInterval = setInterval(updateTime, 1000);
            }
        };

        closePopup.onclick = () => closePopupFunc();
        timePopup.onclick = (event) => {
            if (event.target === timePopup) closePopupFunc();
        };
    }

    function closePopupFunc() {
        timePopup.style.opacity = "0";
        setTimeout(() => timePopup.classList.add("hidden"), 200);
        clearInterval(updateTimeInterval);
        updateTimeInterval = null;
    };

//

        const locationUtils = new LocationUtils();
        const getLocationBtn = document.getElementById("getLocationBtn");
        const locationResult = document.getElementById("locationResult");
        const locationResult2 = document.getElementById("locationResult2");
        const mapContainer = document.getElementById("mapContainer");
        const mapFrame = document.getElementById("mapFrame");

        getLocationBtn.onclick = () => {
          locationResult.textContent = "📡 Đang lấy vị trí...";
          mapContainer.classList.add("hidden");

          locationUtils.getCurrentLocation(
            (coords) => {
              // Lấy tọa độ từ đối tượng coords
              const { latitude, longitude } = coords;
              console.log("✅ Lấy vị trí thành công:", latitude, longitude);

              // Hiển thị tọa độ
              locationResult.innerHTML = `📍 Vị trí của bạn: ${latitude}, ${longitude}`;
              locationResult2.innerHTML = `📍 Vị trí: ${latitude}, ${longitude}`;

              // Cập nhật bản đồ
              mapFrame.src = `https://www.google.com/maps/embed/v1/view?key=AIzaSyCzRtQBnGX5_eeZNxsUtTj94WuOZZKzSr4&center=${latitude},${longitude}&zoom=15`;

              // Hiển thị bản đồ
              mapContainer.classList.remove("hidden");
            },
            (error) => {
              console.error("❌ Lỗi khi lấy vị trí:", error);
              locationResult.textContent = "❌ Không thể lấy vị trí!";
              mapContainer.classList.add("hidden"); // Ẩn bản đồ nếu lỗi
            }
          );
        };


});

