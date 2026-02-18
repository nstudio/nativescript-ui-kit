import { Color, View } from '@nativescript/core';

export interface MenuSelectedEvent<T = MenuAction> {
  eventName: 'menuSelected';
  object: View;
  data: {
    option: T;
  };
}

export type SystemIcon =
  | string
  | {
      systemIcon: string;
      color?: Color | string;
    };

export interface ImageIcon {
  src: string;
  color?: Color | string;
}

export interface FontIcon {
  fontFamily: string;
  text: string;
  fontWeight?: number;
  color?: Color | string;
}

export interface MenuAction<T = any> {
  id?: number;
  name?: string;
  icon?: SystemIcon | ImageIcon | FontIcon;
  iconColor?: Color | string;
  destructive?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  keepsMenuOpen?: boolean;
  value?: T;
  subtitle?: string;
  children?: Array<MenuAction>;
  childrenStyle?: 'inline' | 'dropdown' | 'palette';
  /** When true, only one child can be selected at a time (radio behavior) */
  singleSelection?: boolean;
  preferredSize?: 'small' | 'medium' | 'large';
  action?: (action: MenuAction<T>) => void;

  state?: 'on' | 'off' | 'mixed';
}
