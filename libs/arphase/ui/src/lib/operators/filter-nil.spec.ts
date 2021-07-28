import { addMatchers, cold, initTestScheduler } from 'jasmine-marbles';

import { filterNil } from './filter-nil';

describe('FilterNil Operator', () => {
  beforeEach(() => {
    initTestScheduler();
    addMatchers();
  });
  it('should filter null and/or undefined values out of the stream', () => {
    const values = { a: null, b: 0, c: '', d: undefined, e: true };

    const stream$ = cold('-a-b-c-d-e|', values);
    const result$ = cold('---b-c---e|', values);

    expect(stream$.pipe(filterNil())).toBeObservable(result$);
  });
});
