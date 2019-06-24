import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  validateForm: FormGroup;

  isValid:boolean = true;
  submitForm(): void {
    this.isValid = true;
    
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();

      let temp:boolean = this.validateForm.controls[i].valid;
      
      if(!temp) {
        this.isValid = false;
      }
    }

    if(this.isValid) {
      this.modalService.success({
        nzTitle: '提示',
        nzContent: '保存成功！',
        nzOnOk: () => this.router.navigate(['/table'])
      });
    }
  }

  updateConfirmValidator(): void {
    // 输入密码重新验证
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    // 再次输入密码，验证两次密码是否一致
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      agree: [false]
    });
  }

}
