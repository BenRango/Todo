import { Component, computed, ElementRef, inject, model, signal, viewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otp-input.html',
  styleUrl: './otp-input.scss' 
})
export class OtpInputComponent {

  inputs = viewChildren<ElementRef<HTMLInputElement>>('otpInput');
  fullcode = model('')
  otpValid = model<boolean>()
  otpForm = new FormGroup({
    controls: new FormArray([
      new FormControl(''), new FormControl(''), new FormControl(''),
      new FormControl(''), new FormControl(''), new FormControl('')
    ])
  });
  auth = inject(AuthService)
  get otpControls() {
    return this.otpForm.controls.controls.controls;
  }

  onInput(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
        console.log({index, value})


    value = value.replace(/\D/g, '');


    this.otpControls[index].setValue(value, { emitEvent: false });
    inputElement.value = value;

   
    if (value && index < 5) {
      this.inputs()[index + 1].nativeElement.focus();
    }


    if (value && index === 5) {
      this.submitOtp();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpControls[index].value && index > 0) {
      this.inputs()[index - 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault(); 
    const data = event.clipboardData?.getData('text');

    if (data && /^\d+$/.test(data)) {

    const digits = data.substring(0, 6).split('');
    digits.forEach((digit, i) => {
    if (this.otpControls[i]) {
    this.otpControls[i].setValue(digit);
    }
    });

    const lastIndex = Math.min(digits.length - 1, 5);
    this.inputs()[lastIndex].nativeElement.focus();

    if (digits.length === 6) {
      this.submitOtp();
      }
    }
  }
  checkOTP = ()=>{
    const fullCode = this.otpForm.value.controls?.join('');
    const result =  fullCode !== undefined && fullCode?.length === 6
    if(result)
    {
    this.fullcode.set(fullCode)
    }
    return result
  }


  submitOtp = () =>{
    this.checkOTP()
    const code = this.fullcode(); 
    this.auth.checkOTP(code).subscribe({
    next: (res) => {
    console.log("Succès :", res);
    this.otpValid.set(true)
    return true
    },
    error: (err) => {
    console.error("Erreur capturée dans le composant :", err);
    return false
    }
    });
  }
}
