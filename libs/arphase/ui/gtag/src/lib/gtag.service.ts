import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';

import { CustomParams, EventParams, Gtag } from './gtag-definitions';

export const GTAG = new InjectionToken<Gtag>('wizdm.gtag.instance');

@Injectable()
export class GtagService {
  constructor(
    @Inject(GTAG) private gtag: Gtag,
    private zone: NgZone,
  ) {}

  /** @see: https://developers.google.com/analytics/devguides/collection/gtagjs/setting-values */
  public set(params: CustomParams): void {
    return this.gtag('set', params);
  }

  /** @see: https://developers.google.com/analytics/devguides/collection/gtagjs/events */
  public event(action: string, params?: EventParams): Promise<void> {
    if (!this.gtag) {
      return;
    }
    // Wraps the event call into a Promise
    return this.zone.runOutsideAngular(
      () =>
        new Promise((resolve, reject) => {
          try {
            // Triggers a 1s time-out timer
            const tmr = setTimeout(() => reject(new Error('gtag call timed-out')), 3000);
            // Performs the event call resolving with the event callback
            this.gtag('event', action, {
              ...params,
              event_callback: () => {
                clearTimeout(tmr);
                resolve();
              },
            });
          } catch (e) {
            // Rejects the promise on errors
            reject(e);
          }
        }),
    );
  }

  /** @see: https://developers.google.com/analytics/devguides/collection/gtagjs/pages */
  public pageView(page_title?: string, page_path?: string, page_location?: string) {
    return this.event('page_view', { page_title, page_location, page_path });
  }
}
