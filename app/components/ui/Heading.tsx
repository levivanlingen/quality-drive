import React from 'react';
import styles from './Heading.module.css';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type HeadingAlign = 'left' | 'center' | 'right';
type HeadingColor = 'default' | 'primary' | 'accent' | 'white' | 'gray';

interface HeadingProps {
  /** HTML heading level (h1-h6) */
  as?: HeadingLevel;
  /** Visual size (independent of semantic level) */
  size?: HeadingSize;
  /** Text alignment */
  align?: HeadingAlign;
  /** Text color */
  color?: HeadingColor;
  /** Additional CSS classes */
  className?: string;
  /** Child content */
  children: React.ReactNode;
}

/**
 * Heading component voor consistente koppen door de hele website
 *
 * @example
 * <Heading as="h1" size="xl">Welkom bij Quality Drive</Heading>
 * <Heading as="h2" size="lg" color="primary">Onze Services</Heading>
 * <Heading as="h3" size="md" align="center">In 4 Stappen</Heading>
 */
export function Heading({
  as: Tag = 'h2',
  size = 'lg',
  align = 'left',
  color = 'default',
  className = '',
  children,
}: HeadingProps) {
  const classes = [
    styles.heading,
    styles[`size-${size}`],
    styles[`align-${align}`],
    styles[`color-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
