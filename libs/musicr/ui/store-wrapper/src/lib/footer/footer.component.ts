import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'mrl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  year = new Date().getFullYear();
  form = new FormGroup({
    name: new FormControl<string>(null, Validators.required),
    phone: new FormControl<string>(null, Validators.required),
    email: new FormControl<string>(null, [Validators.required, Validators.email]),
    message: new FormControl<string>(null, Validators.required),
  });

  constructor(private http: HttpClient, private messageService: NzMessageService) {}

  submit(): void {
    if (!this.form.valid) {
      this.messageService.error('Los campos en la forma están incompletos.');
    } else {
      this.loadingSubject.next(true);
      this.http
        .post(`/mrlApi/contact`, this.form.getRawValue())
        .pipe(
          take(1),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(() => window.open(`${window.location.origin}/contact-success`, '_blank'));
    }
  }
}
