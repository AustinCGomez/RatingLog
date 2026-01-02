const SAVE_BUTTON = document.getElementById("save-btn");


// Not yet refactored

    // === Save button ===
SAVE_BUTTON.addEventListener("click", () => {
    const { start, end, date, description } = getFormValues();
    NewEntry(start, end, date, description);
});
// Not yet refactored
// === Delete logs button ===
    delBtn.addEventListener("click", () => {
        document.getElementById("logs-dashboard").classList.add("hidden");
        document.getElementById("warning-dashboard").classList.remove("hidden");
    });
// Not yet refactored
    // === Warning view - No button ===
    noBtn.addEventListener("click", () => {
        document.getElementById("warning-dashboard").classList.add("hidden");
        document.getElementById("logs-dashboard").classList.remove("hidden");
    });
// Not yet refactored
    // === Warning view - Yes button ===
    yesBtn.addEventListener("click", () => {
        chrome.storage.local.set({ tasks: [] }, () => {
            tasks = [];
            console.log("All tasks deleted!");
            document.getElementById("warning-dashboard").classList.add("hidden");
            document.getElementById("mainView").classList.remove("hidden");
            alert("All logs deleted successfully!");
        });
    });
// Not yet refactored
    // === View Hours Worked Button ===
    viewsHrsBtn.addEventListener("click", ()=> {
        document.getElementById("homeView").classList.add("hidden");
        document.getElementById("mainView").classList.remove("hidden");


    });
// Not yet refactored
    settingsBtn.addEventListener("click", ()=> {
        document.getElementById("settings-dashboard").classList.remove("hidden");
        document.getElementById("homeView").classList.add("hidden");
    });



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

   
// HOME - this will be for our home button 
// BACK - this will be for our back button 
// DELETE - this will be for our DELETE button 
    function RemoveBackPageSelector() {
    // We will do .remove from all pages when the back button is pressed.
        switch("SAVE", "VIEW-LOGS", "VIEW-HOURS", "DELETE-BUTTON", "SHOW-OUTPUT", "NO-INPUT", "YES-INPUT", "BACK-BUTTON", "SETTINGS-BUTTON") {
        case "SAVE":
            break;
        case "VIEW-LOGS":
             // === View logs button ===
        document.getElementById("homeView").classList.add("hidden");
        document.getElementById("logs-dashboard").classList.remove("hidden");
        displayLogs();
            break;
        case "DELETE-BUTTON":
            break;
        case "SHOW-OUTPUT":
            break;
        case "NO-INPUT":
            break;
        case "YES-INPUT":
            break;
        case "BACK-BUTTON":
            break;
        case "SETTINGS-BUTTON":
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
        if (!start || !end || !date || !description) {
            alert("All fields must be entered prior to submission");
            return;
        }

        if (date < FormattedDate) {
            //alert("The date cannot be in the past!")
            alert("ERROR: You cannot pick a date that is before today!");
            return;
        }

        const TASKS = {start, end, date, description,  timestamp: Date.now() };
        tasks.push(TASKS);
        alert("Hours have been saved.", tasks);
        ResetField(start, end, date, description, TodayDate, FormattedDate);
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
                .map(t => `Date: ${t.date} | Start Time: ${t.start}– End Time ${t.end}\n Task Overview: ${t.description}\n`)
                .join("\n" + "—".repeat(40) + "\n");
        });
    }




