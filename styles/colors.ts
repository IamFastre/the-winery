import type { Theme } from "./themes/types";

const c = <S extends string>(s:S) => `var(--color-${s})` as const

const colors:Theme['palette'] = {
  none:       c('none'),

  primary:    c('primary'),
  secondary:  c('secondary'),
  tertiary:   c('tertiary'),
  quaternary: c('quaternary'),
  quinary:    c('quinary'),

  accent:     c('accent'),
  highlight:  c('highlight'),

  hot:        c('hot'),
  cold:       c('cold'),

  gold:       c('gold'),
  wine:       c('wine'),
  orange:     c('orange'),
  pink:       c('pink'),
  purple:     c('purple'),

  red:        c('red'),
  green:      c('green'),
  blue:       c('blue'),

  cyan:       c('cyan'),
  yellow:     c('yellow'),
  magenta:    c('magenta'),
}

export default colors;