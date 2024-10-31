import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ExactLengthValidator {
  static exactLengthValidator(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.toString().length !== length) {
        return {
          exactLength: {
            requiredLength: length,
            actualLength: value.toString().length,
          },
        };
      }
      return null;
    };
  }
}
