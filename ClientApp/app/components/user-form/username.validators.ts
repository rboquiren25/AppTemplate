import { AbstractControl } from '@angular/forms';

export class UserNameValidators{
  
    static cannotContainSpace(control: AbstractControl){
        if((control.value as string ).indexOf(' ')>= 0)
            return {cannotContainSpace: true};
        return null;
    }

}