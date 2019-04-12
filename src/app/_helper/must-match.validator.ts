import { FormGroup, FormControl } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: FormControl, matchingControlName: FormControl) {
    return (formGroup: FormGroup) => {
        // const control = formGroup.controls[controlName];
        // const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControlName.errors && !matchingControlName.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        
        var controlValue: any;
        var matchValue: any;
        
        controlValue = controlName.value;
        matchValue = matchingControlName.value;
        
        console.log(controlValue);
        console.log(matchValue);
        // set error on matchingControl if validation fails
        // if (controlName.value !== matchingControlName.value) {
        if (controlValue !== matchValue) {
            matchingControlName.setErrors({ mustMatch: true });
        } else {
            matchingControlName.setErrors(null);
        }
    }
}