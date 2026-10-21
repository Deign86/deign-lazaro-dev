// Pure pricing rules of the front-desk kiosk (alpha-premier-attendance, policy V2_NO_GRACE):
// on time through 08:00:59; from 08:01:00 every started hour since 08:00 costs `lateCostPerHour`,
// minimum 1; a day pays `dailyRate` and never goes below ₱0. The page passes sample rates, not
// the office's. No imports, so it can be checked on its own.

export type KioskRules = {
  dailyRate: number;
  lateCostPerHour: number;
  dayStart: { hour: number; minute: number };
  repeatTapSeconds: number;
};

const HOUR_S = 3600;
const LATE_FROM_S = 60; // late starts at 08:01:00, one minute after the day starts

/** Started hours late for a time-in at hour:minute:second local time. */
export function lateHours(rules: KioskRules, hour: number, minute: number, second = 0): number {
  const start = rules.dayStart.hour * HOUR_S + rules.dayStart.minute * 60;
  const sinceStart = hour * HOUR_S + minute * 60 + second - start;
  if (sinceStart < LATE_FROM_S) return 0;
  return Math.max(1, Math.ceil(sinceStart / HOUR_S));
}

/** The day's pay after late hours, never below zero. */
export function todaysPay(rules: KioskRules, late: number): number {
  return Math.max(0, rules.dailyRate - rules.lateCostPerHour * late);
}

/** The kiosk's greeting: morning before 12:00, afternoon before 18:00, evening after. */
export function greetingFor(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function statusFor(late: number): string {
  if (late === 0) return 'On time';
  return `Late by ${late} ${late === 1 ? 'hour' : 'hours'}`;
}

export const peso = (amount: number) => `₱${amount}`;

const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Time between two taps, the way a person would say it. */
export function formatStay(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / HOUR_S);
  const m = Math.floor((total % HOUR_S) / 60);
  const s = total % 60;
  if (h > 0) return `${unit(h, 'hour')} ${unit(m, 'minute')}`;
  if (m > 0) return `${unit(m, 'minute')} ${unit(s, 'second')}`;
  return unit(s, 'second');
}
