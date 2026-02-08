const BTN_SAVE_ENTRY = document.getElementById("btn-save-data");
const BTN_NAV_LOGGER = document.getElementById("btn-open-logger");
const BTN_NAV_HISTORY = document.getElementById("btn-open-logs");
const BTN_NAV_SETTINGS = document.getElementById("btn-open-settings");
const BTN_TRIGGER_DELETE = document.getElementById("btn-delete-all");
const BTN_CONFIRM_DELETE = document.getElementById("btn-execute-delete");
const BTN_CANCEL_DELETE = document.getElementById("btn-cancel-delete");
const BTNS_BACK_NAVIGATION = document.querySelectorAll(".back-button");

// === Event Listeners ===

BTN_SAVE_ENTRY.addEventListener("click", () => {
    const { start, end, date, description } = getFormValues();
    NewEntry(start, end, date, description);
});

BTN_NAV_LOGGER.addEventListener("click", () => {
    ViewSelector("LOG-HOURS");
});

BTN_NAV_HISTORY.addEventListener("click", () => {
    ViewSelector("VIEW-LOGS");    
});

BTN_NAV_SETTINGS.addEventListener("click", () =>{ 
    ViewSelector("SETTINGS-BUTTON");
});

BTN_TRIGGER_DELETE.addEventListener("click", () => {
    ViewSelector("DELETE-BUTTON");
});

BTN_CONFIRM_DELETE.addEventListener("click", () => {
    ViewSelector("YES-INPUT");
});

BTN_CANCEL_DELETE.addEventListener("click", () => {
    ViewSelector("NO-INPUT");
});

BTNS_BACK_NAVIGATION.forEach(button => {
    button.addEventListener("click", () => {
        ViewSelector("BACK-BUTTON");
    });
});

// Add form data save listeners
document.getElementById("StartTime").addEventListener("input", saveFormData);
document.getElementById("EndTime").addEventListener("input", saveFormData);
document.getElementById("Date").addEventListener("input", saveFormData);
document.getElementById("TasksCompleted").addEventListener("input", saveFormData);

function getFormValues() {
    return {
        start: document.getElementById("StartTime").value,
        end: document.getElementById("EndTime").value,
        date: document.getElementById("Date").value,
        description: document.getElementById("TasksCompleted").value
    };
};

// Load tasks on startup
 chrome.storage.local.get("tasks", (result) => {
    tasks = result.tasks || [];
 });

 // Save form data to session storage
 function saveFormData() {
    const formData = getFormValues();
    chrome.storage.session.set({ tempFormData: formData }, () => {});
 }

 // Load form data from session storage
 function loadFormData() {
    chrome.storage.session.get("tempFormData", (result) => {
        if (result.tempFormData) {
            document.getElementById("StartTime").value = result.tempFormData.start || "";
            document.getElementById("EndTime").value = result.tempFormData.end || "";
            document.getElementById("Date").value = result.tempFormData.date || "";
            document.getElementById("TasksCompleted").value = result.tempFormData.description || "";
        }
    });
 }

 // Clear temporary form data
 function clearTempFormData() {
    chrome.storage.session.remove("tempFormData", () => {});
 }

function ViewSelector(page) {
    switch(page) {
        case "LOG-HOURS":
            document.getElementById("view-home").classList.add("hidden");
            document.getElementById("view-logger").classList.remove("hidden");
            loadFormData(); // Load saved form data
            break;
        case "VIEW-LOGS":
            document.getElementById("view-home").classList.add("hidden");
            document.getElementById("view-logs-list").classList.remove("hidden");
            displayLogs();
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
            tasks = [];
            chrome.storage.local.set({ tasks: [] }, () => { });
            console.log("All tasks deleted!");
            //document.getElementById("view-confirm-delete").classList.add("hidden");
            //document.getElementById("view-logger").classList.add("hidden");
            // Editing here at line 92
            document.getElementById("view-confirm-delete").textContent = "Deleted..";
            setTimeout(() => {
            document.getElementById("view-home").classList.remove("hidden");
            document.getElementById("view-confirm-delete").classList.add("hidden");
    }, 2000);
            break;
case "BACK-BUTTON":
            const BCK_BUTTON_DATA_SAVED = document.getElementById("btn-save-data").textContent = 'Save a new timesheet';
            document.getElementById("view-home").classList.remove("hidden");
            document.getElementById("view-logger").classList.add("hidden");
            document.getElementById("view-logs-list").classList.add("hidden");
            document.getElementById("view-confirm-delete").classList.add("hidden");
            document.getElementById("view-settings").classList.add("hidden");
            // Don't clear temp form data when going back - user might return
            break;
        case "SETTINGS-BUTTON":
            document.getElementById("view-home").classList.add("hidden");
            document.getElementById("view-settings").classList.remove("hidden");
            break;
    };
};

function ResetField(start, end, date, description, TodayDate, FormattedDate) {
    document.getElementById("StartTime").value = "";
    document.getElementById("EndTime").value = "";
    document.getElementById("Date").value = "";
    document.getElementById("TasksCompleted").value = "";  
};

function NewEntry(start, end, date, description, TodayDate, FormattedDate) {

const startError = document.getElementById("StartTime-error"); 
const endError = document.getElementById("EndTime-error");
const dateError = document.getElementById("Date-error");
const descError = document.getElementById("TasksCompleted-error");

    const isStartValid = validateTime(document.getElementById("StartTime"), startError);
    const isEndValid = validateTime(document.getElementById("EndTime"), endError);
    const isDateValid = validateTime(document.getElementById("Date"), dateError);
    const isDescValid = validateTime(document.getElementById("TasksCompleted"), descError);

    if (!isStartValid || !isEndValid || !isDateValid || !isDescValid) {
        return; // Stop here if validation fails
    }


function validateTime(inputElement, errorElement) {
    const value = inputElement.value.trim();
    
    // Check if the field is empty
    if (!value) {
        errorElement.style.display = 'block';
        errorElement.textContent = `${inputElement.id} is required`;
        return false;
    }
    
    // If validation passes, hide the error
    errorElement.style.display = 'none';
    return true;
}
  

const TASKS = {start, end, date, description, timestamp: Date.now() };
    tasks.push(TASKS);
    chrome.storage.local.set({ tasks: tasks }, () => {}); 
    BTN_SAVE_ENTRY.textContent = "Entry has been saved!";
    BTN_SAVE_ENTRY.style.backgroundColor = "green";
    setTimeout(() => {
        BTN_SAVE_ENTRY.textContent = "Save a new timesheet";
        BTN_SAVE_ENTRY.style.backgroundColor = "white";
    }, 2000);
    ResetField(start, end, date, description, TodayDate, FormattedDate);
    clearTempFormData(); // Clear temporary data after successful submission
    ViewSelector();
};

function displayLogs() {
    chrome.storage.local.get("tasks", (result) => {
        tasks = result.tasks || [];

        if (tasks.length === 0) {
            output.textContent = "You have not submitted any hours at this time.";
            return;
        }

        output.textContent = tasks
             .map(t => `Date: ${t.date}\nStart Time: ${t.start}\nEnd Time: ${t.end}\nTask Overview: ${t.description}\n`)
            .join("\n" + "—".repeat(40) + "\n");
    });
}
