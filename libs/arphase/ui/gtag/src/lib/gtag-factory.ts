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
  if ((window as any).gtag) {
    return (window as any).gtag;
  }

  const script = document.createElement('script');

  script.src = `https://www.googletagmanager.com/gtag/js?id=${targetId}`;
  script.type = 'text/javascript';
  script.async = true;

  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];

  function gtag(...args) {
    (window as any).dataLayer.push(arguments);
  }

  gtag('js', new Date());

  gtag('config', targetId, { send_page_view: false, ...configInfo });

  if (setParams) {
    gtag('set', setParams);
  }

  if (moreIds) {
    moreIds.forEach(id => gtag('config', id));
  }

  return ((window as any).gtag = gtag);
}
