import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'mrl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends ApsFormComponent {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  year = new Date().getFullYear();

  constructor(private fb: UntypedFormBuilder, private http: HttpClient, private messageService: NzMessageService) {
    super();
    this.form = this.fb.group({
      name: [null, ApsValidators.required],
      phone: [null, ApsValidators.required],
      email: [null, [ApsValidators.required, ApsValidators.email]],
      message: [null, ApsValidators.required],
    });
  }

  submit(): void {
    console.log(`${window.location.origin}/contact-success`);
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
