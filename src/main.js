import { ViewManager } from './components/ViewManager.js';
import { TimeEntryForm } from './components/TimeEntryForm.js';

document.addEventListener('DOMContentLoaded', async () => {
    const viewManager = new ViewManager();
    const timeEntryForm = new TimeEntryForm();
    
    // Initialize navigation elements
    const BTN_NAV_LOGGER = document.getElementById("btn-open-logger");
    const BTN_NAV_HISTORY = document.getElementById("btn-open-logs");
    const BTN_NAV_SETTINGS = document.getElementById("btn-open-settings");
    const BTN_TRIGGER_DELETE = document.getElementById("btn-delete-all");
    const BTN_CONFIRM_DELETE = document.getElementById("btn-execute-delete");
    const BTN_CANCEL_DELETE = document.getElementById("btn-cancel-delete");
    const BTNS_BACK_NAVIGATION = document.querySelectorAll(".back-button");

    // Bind navigation events
    BTN_NAV_LOGGER.addEventListener("click", () => {
        viewManager.switchView("LOG-HOURS");
    });

    BTN_NAV_HISTORY.addEventListener("click", () => {
        viewManager.switchView("VIEW-LOGS");    
    });

    BTN_NAV_SETTINGS.addEventListener("click", () => { 
        viewManager.switchView("SETTINGS-BUTTON");
    });

    BTN_TRIGGER_DELETE.addEventListener("click", () => {
        viewManager.switchView("DELETE-BUTTON");
    });

    BTN_CONFIRM_DELETE.addEventListener("click", () => {
        viewManager.switchView("YES-INPUT");
    });

    BTN_CANCEL_DELETE.addEventListener("click", () => {
        viewManager.switchView("NO-INPUT");
    });

    BTNS_BACK_NAVIGATION.forEach(button => {
        button.addEventListener("click", () => {
            viewManager.switchView("BACK-BUTTON");
        });
    });

    // Load initial data
    const { StorageManager } = await import('./utils/storage.js');
    const tasks = await StorageManager.getTasks();
    console.log('Application initialized with', tasks.length, 'tasks');
});
