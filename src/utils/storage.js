/**
 * Storage utilities for Chrome extension
 */
export class StorageManager {
  static async getTasks() {
    return new Promise((resolve) => {
      chrome.storage.local.get("tasks", (result) => {
        resolve(result.tasks || []);
      });
    });
  }

  static async setTasks(tasks) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ tasks }, resolve);
    });
  }

  static async clearTasks() {
    return new Promise((resolve) => {
      chrome.storage.local.set({ tasks: [] }, resolve);
    });
  }
}