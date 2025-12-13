import Notification from "../models/Notification.js";

export const notify = (title, message, type = "info") => {
  return Notification.create({ title, message, type });
};
