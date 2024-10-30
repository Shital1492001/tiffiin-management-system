import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";

export class CustomValidators {
  static valueMatch3(formControl1: string, formControl2:string): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null=>{
          const val1=control.get(formControl1)?.value
          const val2=control.get(formControl2)?.value
          if(val1!==val2)
              return {match : true}
          else
              return null
    }
  }
}
