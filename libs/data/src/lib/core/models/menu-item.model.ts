export interface MenuItem {
  icon?: string;
  header?: string;
  display?: boolean;
  enabled?: boolean;
  path?: string | string[];
  children?: ChildMenuItem[];
}

export interface ChildMenuItem {
  label?: string;
  display?: boolean;
  enabled?: boolean;
  path?: string[];
}
