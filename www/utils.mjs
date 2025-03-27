export class CameraUtils {
  constructor() {}
  /**
   *
   * @param {HTMLElement} takePictureBtn
   * @param {HTMLElement} photoEl
   * @param {Function} callbackFn - Hàm callback được gọi khi xử lý thành công (image) => {}
   * @param {Function} errorFn - Hàm callback được gọi khi có lỗi xảy ra (error) => {}
   */
  apply(takePictureBtn, callbackFn, errorFn) {
    takePictureBtn.addEventListener("click", async () => {
      // Kiểm tra xem Capacitor và plugin Camera có sẵn không
      if (
        window.Capacitor &&
        window.Capacitor.Plugins &&
        window.Capacitor.Plugins.Camera
      ) {
        try {
          const image = await window.Capacitor.Plugins.Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: "uri", // Trả về URL của ảnh
            source: "CAMERA", // Mở camera
          });
          callbackFn(image);
        } catch (error) {
          console.error("Error taking picture", error);
          errorFn(error);
        }
      } else {
        console.warn("Capacitor hoặc plugin Camera không khả dụng");
        errorFn("Capacitor hoặc plugin Camera không khả dụng");
      }
    });
  }
}
const { LocalNotifications } = Capacitor.Plugins;
export class Notification {
  constructor() {}

  /**
   * Gửi thông báo cục bộ bằng Capacitor
   * @param {string} title - Tiêu đề của thông báo
   * @param {string} body - Nội dung của thông báo
   * @param {string} smallIcon - Biểu tượng nhỏ (Android)
   * @returns {Promise<void>}
   */
  async sendNotification(title, body, smallIcon) {
    try {
      // Yêu cầu quyền nếu chưa cấp
      const permission = await LocalNotifications.requestPermissions();
      if (permission.display !== "granted") {
        alert("Bạn cần cấp quyền thông báo để sử dụng tính năng này.");
        return;
      }

      // Lên lịch thông báo ngay lập tức
      await LocalNotifications.schedule({
        notifications: [
          {
            id:  Math.floor(Date.now() / 1000),
            title: title,
            body: body,
            smallIcon: smallIcon, // Icon cho Android
            sound: "default",
            extra: { key: "value" },
          },
        ],
      });
      console.log("Thông báo đã được gửi!");
    } catch (error) {
      console.error("Lỗi khi gửi thông báo:", error);
    }
  }
}

const { Share } = Capacitor.Plugins;
export class ShareAPI {
  constructor() {}

  /**
   * Chia sẻ nội dung bằng Capacitor Share API
   * @param {string} title - Tiêu đề nội dung chia sẻ
   * @param {string} text - Nội dung chia sẻ
   * @param {string} url - Đường dẫn URL cần chia sẻ
   * @returns {Promise<void>}
   */
  async shareContent(title, text, url) {
    try {
      await Share.share({
        title: title,
        text: text,
        url: url,
        dialogTitle: "Chia sẻ với...",
      });
      console.log("Chia sẻ thành công!");
    } catch (error) {
      console.error("Lỗi khi chia sẻ:", error);
    }
  }
}
