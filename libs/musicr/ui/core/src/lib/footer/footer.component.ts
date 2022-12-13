import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}

@Component({
  selector: 'mrl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends ApsFormComponent<ContactPayload> {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  year = new Date().getFullYear();
  form = new FormGroup({
    name: new FormControl(null, ApsValidators.required),
    phone: new FormControl(null, ApsValidators.required),
    email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
    message: new FormControl(null, ApsValidators.required),
  });

  constructor(private http: HttpClient, private messageService: NzMessageService) {
    super();
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
        .subscribe(() => window.open(`${window.location.origin}/contact-success`, '_blank'));
    }
  }
}
