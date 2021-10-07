import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'mrl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent extends ApsFormComponent {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: NzMessageService) {
    super();
    this.form = this.fb.group({
      name: [null, ApsValidators.required],
      phone: [null, ApsValidators.required],
      email: [null, [ApsValidators.required, ApsValidators.email]],
      message: [null, ApsValidators.required],
    });
  }

  submit(): void {
    if (!this.form.valid) {
      this.messageService.error('Los campos en la forma están incompletos.');
    } else {
      this.loadingSubject.next(true);
      this.http
        .post(`/mrlApi/contact`, this.values)
        .pipe(
          take(1),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(() => {
          this.messageService.success(
            'Se ha enviado un correo a Music Revolution, cuanto antes nos pondremos en contacto con usted.'
          );
        });
    }
  }
}
