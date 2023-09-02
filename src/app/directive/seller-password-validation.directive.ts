import { Directive , Input } from '@angular/core';
import { AbstractControl,NG_VALIDATORS,Validator } from '@angular/forms';

@Directive({
  selector: '[appSellerPasswordValidation]' , 
  providers : [{
    provide: NG_VALIDATORS,
    useExisting:SellerPasswordValidationDirective,
    multi: true
  }]
})
export class SellerPasswordValidationDirective implements Validator {

  constructor() { }
  @Input() appSellerPasswordValidation = "";
  validate(control: AbstractControl<any, any>): {[key : string]:any} | null {
    let passwordcontrol = control.parent.get(this.appSellerPasswordValidation);
    if(passwordcontrol .value!= control.value && passwordcontrol)
    return {'notEqual' : true};
    else{
    return  null;
    }
}
}
