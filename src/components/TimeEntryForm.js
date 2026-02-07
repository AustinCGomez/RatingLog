/**
 * Form component for time entry
 */
export class TimeEntryForm {
  constructor() {
    this.initializeElements();
    this.bindEvents();
  }

  initializeElements() {
    this.btnSave = document.getElementById("btn-save-data");
    this.startTime = document.getElementById("StartTime");
    this.endTime = document.getElementById("EndTime");
    this.date = document.getElementById("Date");
    this.description = document.getElementById("TasksCompleted");
    
    this.startError = document.getElementById("StartTime-error");
    this.endError = document.getElementById("EndTime-error");
    this.dateError = document.getElementById("Date-error");
    this.descError = document.getElementById("TasksCompleted-error");
  }

  bindEvents() {
    this.btnSave.addEventListener("click", () => this.handleSubmit());
  }

  getFormValues() {
    return {
      start: this.startTime.value,
      end: this.endTime.value,
      date: this.date.value,
      description: this.description.value
    };
  }

  async validateForm() {
    const { Validator } = await import('../utils/validator.js');
    
    const isStartValid = Validator.validateField(this.startTime, this.startError);
    const isEndValid = Validator.validateField(this.endTime, this.endError);
    const isDateValid = Validator.validateField(this.date, this.dateError);
    const isDescValid = Validator.validateField(this.description, this.descError);

    return isStartValid && isEndValid && isDateValid && isDescValid;
  }

  async handleSubmit() {
    const formData = this.getFormValues();
    const isValid = await this.validateForm();
    
    if (!isValid) {
      return;
    }

    await this.saveEntry(formData);
  }

  async saveEntry(formData) {
    const { StorageManager } = await import('../utils/storage.js');
    const tasks = await StorageManager.getTasks();
    
    const newEntry = {
      ...formData,
      timestamp: Date.now()
    };
    
    tasks.push(newEntry);
    await StorageManager.setTasks(tasks);
    
    this.showSaveSuccess();
    this.resetForm();
  }

  showSaveSuccess() {
    this.btnSave.textContent = "Entry has been saved!";
    this.btnSave.style.backgroundColor = "green";
    setTimeout(() => {
      this.btnSave.textContent = "Save a new timesheet";
      this.btnSave.style.backgroundColor = "white";
    }, 2000);
  }

  resetForm() {
    this.startTime.value = "";
    this.endTime.value = "";
    this.date.value = "";
    this.description.value = "";
  }
}