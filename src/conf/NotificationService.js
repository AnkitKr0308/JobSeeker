// src/conf/NotificationService.js
import * as signalR from "@microsoft/signalr";

let connection = null;

export function createConnection(token) {
  if (!token) {
    console.warn("⚠️ No JWT token provided for SignalR connection");
    return null;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/notifications", {
      accessTokenFactory: () => token,
      transport: signalR.HttpTransportType.WebSockets,
      withCredentials: true,
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000]) // retry delays
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return connection;
}

export async function startConnection(onReceiveNotification) {
  if (!connection) {
    console.error(
      "❌ SignalR connection has not been created. Call createConnection(token) first."
    );
    return;
  }

  // Register event listener
  if (onReceiveNotification) {
    connection.on("ReceiveNotification", (notification) => {
      console.log("📩 New Notification:", notification);
      onReceiveNotification(notification);
    });
  }

  try {
    await connection.start();
    console.log("✅ SignalR Connected to NotificationHub");
  } catch (err) {
    console.error("❌ SignalR connection failed:", err);
    setTimeout(() => startConnection(onReceiveNotification), 5000); // retry
  }
}

export function stopConnection() {
  if (connection) {
    connection.stop();
    console.log("🔌 SignalR Disconnected");
  }
}

export function getConnection() {
  return connection;
}
