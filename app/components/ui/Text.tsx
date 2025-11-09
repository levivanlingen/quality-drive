import React from 'react';
import styles from './Text.module.css';

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right';
type TextColor = 'default' | 'primary' | 'accent' | 'white' | 'gray' | 'muted';

interface TextProps {
  /** HTML element to render */
  as?: 'p' | 'span' | 'div' | 'label';
  /** Text size */
  size?: TextSize;
  /** Font weight */
  weight?: TextWeight;
  /** Text alignment */
  align?: TextAlign;
  /** Text color */
  color?: TextColor;
  /** Additional CSS classes */
  className?: string;
  /** Child content */
  children: React.ReactNode;
}

/**
 * Text component voor consistente tekst styling door de hele website
 *
 * @example
 * <Text>Standaard paragraph tekst</Text>
 * <Text size="lg" weight="medium">Grote, medium tekst</Text>
 * <Text color="primary" align="center">Gecentreerde primary kleur tekst</Text>
 */
export function Text({
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  align = 'left',
  color = 'default',
  className = '',
  children,
}: TextProps) {
  const classes = [
    styles.text,
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    styles[`color-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
