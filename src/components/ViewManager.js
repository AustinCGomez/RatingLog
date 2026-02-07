/**
 * View manager for handling navigation and display
 */
export class ViewManager {
  constructor() {
    this.currentView = 'view-home';
    this.tasks = [];
  }

  switchView(viewName) {
    this.hideAllViews();
    
    switch(viewName) {
      case "LOG-HOURS":
        document.getElementById("view-home").classList.add("hidden");
        document.getElementById("view-logger").classList.remove("hidden");  
        break;
      case "VIEW-LOGS":
        document.getElementById("view-home").classList.add("hidden");
        document.getElementById("view-logs-list").classList.remove("hidden");
        this.displayLogs();
        break;
      case "DELETE-BUTTON":
        document.getElementById("view-logs-list").classList.add("hidden");
        document.getElementById("view-confirm-delete").classList.remove("hidden");
        document.getElementById("view-settings").classList.add("hidden");    
        break;
      case "NO-INPUT":
        document.getElementById("view-confirm-delete").classList.add("hidden");
        document.getElementById("view-logs-list").classList.remove("hidden");
        break;
      case "YES-INPUT":
        this.deleteAllTasks();
        break;
      case "BACK-BUTTON":
        document.getElementById("btn-save-data").textContent = 'Save a new timesheet';
        this.showHome();
        break;
      case "SETTINGS-BUTTON":
        document.getElementById("view-home").classList.add("hidden");
        document.getElementById("view-settings").classList.remove("hidden");
        break;
    }
  }

  hideAllViews() {
    const views = ["view-home", "view-logger", "view-logs-list", "view-confirm-delete", "view-settings"];
    views.forEach(view => {
      document.getElementById(view).classList.add("hidden");
    });
  }

  showHome() {
    this.hideAllViews();
    document.getElementById("view-home").classList.remove("hidden");
  }

  async deleteAllTasks() {
    this.tasks = [];
    const { StorageManager } = await import('../utils/storage.js');
    await StorageManager.clearTasks();
    console.log("All tasks deleted!");
    
    document.getElementById("view-confirm-delete").textContent = "Deleted..";
    setTimeout(() => {
      this.showHome();
      document.getElementById("view-confirm-delete").classList.add("hidden");
      document.getElementById("view-confirm-delete").textContent = "Confirm Deletion";
    }, 2000);
  }

  async displayLogs() {
    const { StorageManager } = await import('../utils/storage.js');
    this.tasks = await StorageManager.getTasks();
    const output = document.getElementById("output");
    
    if (this.tasks.length === 0) {
      output.textContent = "You have not submitted any hours at this time.";
      return;
    }

    output.textContent = this.tasks
         .map(t => `Date: ${t.date}\nStart Time: ${t.start}\nEnd Time: ${t.end}\nTask Overview: ${t.description}\n`)
        .join("\n" + "—".repeat(40) + "\n");
  }
}