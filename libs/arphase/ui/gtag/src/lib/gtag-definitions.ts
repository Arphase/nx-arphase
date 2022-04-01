export interface Gtag {
  (cmd: 'set', params: CustomParams): void;

  (cmd: 'config', targetId: string, config?: ConfigParams): void;

  (cmd: 'event', action: string, params?: EventParams): void;
}

export interface CustomParams {
  [key: string]: any;
}

//@see: https://developers.google.com/gtagjs/reference/parameter#control_parameters
export interface ConfigParams extends CustomParams {
  groups?: string | string[];
  send_to?: string | string[];
  event_callback?: () => void;
  event_timeout?: number;

  //@see: https://developers.google.com/analytics/devguides/collection/gtagjs#disable_pageview_measurement
  send_page_view?: boolean;

  //@see: https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-link-attribution
  link_attribution?: boolean;

  //@see: https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization
  anonymize_ip?: boolean;

  //@see: https://developers.google.com/analytics/devguides/collection/gtagjs/display-features
  allow_ad_personalization_signals?: boolean;
}

export interface EventParams extends CustomParams {
  items?: Partial<Item>[];
  transaction_id?: string;
  value?: number;
  currency?: string;
}

export interface Item {
  item_id: string;
  item_name: string;
  affiliation: string;
  coupon: string;
  currency: string;
  discount: number;
  index: number;
  item_brand: string;
  item_category: string;
  item_category2: string;
  item_category3: string;
  item_category4: string;
  item_category5: string;
  item_list_id: string;
  item_list_name: string;
  item_variant: string;
  location_id: string;
  price: number;
  quantity: number;
}
