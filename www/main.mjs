import { CameraUtils, ShareAPI,Notification } from "./utils.mjs";

// Chờ DOM được tải xong
document.addEventListener("DOMContentLoaded", function () {
  //Phần camera
  const cameraUtils = new CameraUtils();
  const takePictureBtn = document.getElementById("takePictureBtn");
  const photoEl = document.getElementById("photo");
  cameraUtils.apply(
    takePictureBtn,
    (image) => {
      console.log(image);
      // Gán đường dẫn ảnh và hiển thị ảnh
      photoEl.src = image.webPath;
      photoEl.style.display = "block";
    },
    (errors) => {
      console.log(image);
    }
  );
  //Phần thông báo
  const notification = new Notification();
  const notificationBtn = document.getElementById("notificationBtn");
  notificationBtn.onclick = async () => {
    console.log("hi");
    await notification.sendNotification("Xin chào Bích Thùy", "QTh mập", "");
  };
  // //Phần share
  const share = new ShareAPI();
  const shareBtn = document.getElementById("shareBtn");
  shareBtn.onclick = async () => {
    await share.shareContent("Xin chào Bích Thùy", "Qth mập", "https://www.facebook.com/ronial.04?locale=vi_VN");
  };
});
