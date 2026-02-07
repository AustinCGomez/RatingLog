/**
 * Form validation utilities
 */
export class Validator {
  static validateField(inputElement, errorElement) {
    const value = inputElement.value.trim();
    
    if (!value) {
      errorElement.style.display = 'block';
      errorElement.textContent = `${this.getFieldName(inputElement.id)} is required`;
      return false;
    }
    
    errorElement.style.display = 'none';
    return true;
  }

  static getFieldName(fieldId) {
    const names = {
      'StartTime': 'Start time',
      'EndTime': 'End time', 
      'Date': 'Date',
      'TasksCompleted': 'Description'
    };
    return names[fieldId] || fieldId;
  }

  static async validateForm(formData) {
    const { start, end, date, description } = formData;
    
    if (!start || !end || !date || !description) {
      return false;
    }
    
    return true;
  }
}