import { InjectionToken } from '@angular/core';

import { ConfigParams, CustomParams, Gtag } from './gtag-definitions';

export interface GtagConfig {
  targetId: string;
  production: boolean;
  configInfo?: ConfigParams;
  setParams?: CustomParams;
  moreIds?: string[];
}

export const GtagConfigToken = new InjectionToken<GtagConfig>('wizdm.gtag.config');

/** Reproduces the standard code snippet we would paste in index.html
 * @see: https://developers.google.com/analytics/devguides/collection/gtagjs */
export function gtagFactory(config: GtagConfig): Gtag {
  const { targetId, setParams, production, moreIds, configInfo } = config;

  if (!production) {
    return null;
  }
  if (window['gtag']) {
    return window['gtag'];
  }

  const script = document.createElement('script');

  script.src = `https://www.googletagmanager.com/gtag/js?id=${targetId}`;
  script.type = 'text/javascript';
  script.async = true;

  document.head.appendChild(script);

  window['dataLayer'] = window['dataLayer'] || [];

  function gtag(...args: (string | Date | CustomParams)[]) {
    window['dataLayer'].push(args);
  }

  gtag('js', new Date());

  gtag('config', targetId, { send_page_view: false, ...configInfo });

  if (setParams) {
    gtag('set', setParams);
  }

  if (moreIds) {
    moreIds.forEach(id => gtag('config', id));
  }

  return (window['gtag'] = gtag);
}
