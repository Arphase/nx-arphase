import { of } from 'rxjs';

export class LoadingServiceMock {
  loading$ = of(false);
  show = jest.fn();
  hide = jest.fn();
}
