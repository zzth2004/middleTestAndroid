const { Camera, Geolocation, LocalNotifications, Share} = Capacitor.Plugins;



export class CameraUtils {
  constructor() {}

  /**
   *
   * @param {HTMLElement} takePictureBtn
   * @param {Function} callbackFn - Hàm callback khi chụp ảnh thành công (image) => {}
   * @param {Function} errorFn - Hàm callback khi có lỗi xảy ra (error) => {}
   */
  apply(takePictureBtn, callbackFn, errorFn) {
    takePictureBtn.addEventListener("click", async () => {
      if (Camera) {
        try {
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: "uri",
            source: "CAMERA",
          });
          callbackFn(image);
        } catch (error) {
          console.error("Lỗi khi chụp ảnh:", error);
          errorFn(error);
        }
      } else {
        console.warn("Capacitor hoặc plugin Camera không khả dụng");
        errorFn("Capacitor hoặc plugin Camera không khả dụng");
      }
    });
  }
}



export class Notification {
  constructor() {}

  /**
   * Gửi thông báo cục bộ bằng Capacitor
   * @param {string} title - Tiêu đề của thông báo
   * @param {string} body - Nội dung của thông báo
   * @param {string} smallIcon - Biểu tượng nhỏ (Android)
   */
  async sendNotification(title, body, smallIcon) {
    try {
      const permission = await LocalNotifications.requestPermissions();
      if (permission.display !== "granted") {
        alert("Bạn cần cấp quyền thông báo!");
        return;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Date.now() / 1000),
            title: title,
            body: body,
            smallIcon: smallIcon,
            sound: "default",
          },
        ],
      });
      console.log("Thông báo đã được gửi!");
    } catch (error) {
      console.error("Lỗi khi gửi thông báo:", error);
    }
  }
}

export class ShareAPI {
  constructor() {}

  /**
   * Chia sẻ nội dung bằng Capacitor Share API
   * @param {string} title - Tiêu đề chia sẻ
   * @param {string} text - Nội dung chia sẻ
   * @param {string} url - Đường dẫn URL
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

// ✅ Thêm class lấy vị trí
export class LocationUtils {
  constructor() {}

  /**
   * Lấy vị trí hiện tại của thiết bị
   * @param {Function} successFn - Callback khi lấy vị trí thành công (coords) => {}
   * @param {Function} errorFn - Callback khi lấy vị trí thất bại (error) => {}
   */
  async getCurrentLocation(successFn, errorFn) {
    try {
      // Kiểm tra quyền truy cập vị trí
      const permission = await Geolocation.requestPermissions();
      if (permission.location !== "granted") {
        errorFn("Bạn chưa cấp quyền truy cập vị trí.");
        return;
      }

      // Lấy vị trí
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      successFn({ latitude, longitude });
    } catch (error) {
      errorFn(error);
    }
  }
}


