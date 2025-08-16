import * as signalR from "@microsoft/signalr";

class NotificationService {
  constructor() {
    if (!NotificationService.instance) {
      this.connection = null;
      NotificationService.instance = this;
    }
    return NotificationService.instance;
  }

  async startConnection(token, onReceiveNotification) {
    if (this.connection && this.connection.state !== signalR.HubConnectionState.Disconnected) {
      return; // already connected or connecting
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:20099/hubs/notifications", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this.connection.on("ReceiveNotification", (notification) => {
      if (onReceiveNotification) onReceiveNotification(notification);
    });

    this.connection.onclose((error) => {
      console.error("SignalR disconnected", error);
    });

    try {
      await this.connection.start();
      console.log("SignalR connected");
    } catch (err) {
      console.error("SignalR connection error:", err);
    }
  }

  async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      console.log("SignalR stopped");
    }
  }
}


const notificationService = new NotificationService();
export default notificationService;
