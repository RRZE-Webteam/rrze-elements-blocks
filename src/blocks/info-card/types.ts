import { CSSProperties } from "react";

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface InfoCardAttributes {
  className?: string;
  cardHeight?: number;
  title: string;
  subtitle: string;
  desktopImageId: number;
  desktopImageUrl: string;
  tabletImageId: number;
  tabletImageUrl: string;
  mobileImageId: number;
  mobileImageUrl: string;
  textShadowEnabled?: boolean;
  backgroundOverlayEnabled?: boolean;
  backgroundOverlayGradient?: string;
  imageObjectFit?: 'cover' | 'contain';
  desktopTextColor: string;
  tabletTextColor: string;
  mobileTextColor: string;
  desktopCustomTextColor: string;
  tabletCustomTextColor: string;
  mobileCustomTextColor: string;
  backgroundColor: string;
  desktopFocusPoint: { x: number; y: number };
  tabletFocusPoint: { x: number; y: number };
  mobileFocusPoint: { x: number; y: number };
  alt: string;
  url: string;
  scientificText: string;
  desktopContentWidth?: number;
  cardTextAlignment?: string;
}

export interface InfoCardCustomStyles extends CSSProperties {
  '--card-height'?: string;
  '--desktop-text-color'?: string;
  '--tablet-text-color'?: string;
  '--mobile-text-color'?: string;
  '--desktop-object-position'?: string;
  '--tablet-object-position'?: string;
  '--mobile-object-position'?: string;
  '--background-color'?: string;
  '--image-object-fit'?: string;
  '--card-text-shadow'?: string;
  '--rrze-card-overlay-gradient'?: string;
  '--rrze-card-size'?: string;
}

/** Optional layout defaults provided by containers without coupling to their block names. */
export interface InfoCardContext {
  'rrze-elements/card-height'?: number;
  'rrze-elements/card-container-style'?: string;
  'rrze-elements/card-list-layout'?: boolean;
}
