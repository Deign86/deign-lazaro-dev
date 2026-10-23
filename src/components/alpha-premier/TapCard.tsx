'use client';

import Image from 'next/image';
import { useRef, useState, useSyncExternalStore } from 'react';
import { kioskRules, systemsDemo } from '@/data/alpha-premier';
import { formatStay, greetingFor, lateHours, peso, statusFor, todaysPay } from './kiosk-rules';

// A small working slice of the front-desk kiosk. Nothing is stored and nothing is sent:
// every tap lives in this component's state and is gone on reload.

const copy = systemsDemo.kiosk;
const COOLDOWN_MS = kioskRules.repeatTapSeconds * 1000;

const clock = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
const timeOf = (ms: number) => clock.format(new Date(ms));
const hourOf = (ms: number) => new Date(ms).getHours();

// One shared second-resolution clock: null on the server, the local second in the browser.
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 250);
  return () => window.clearInterval(id);
};
const nowSecond = () => Math.floor(Date.now() / 1000);
const serverSecond = () => null;
const useSecond = () => useSyncExternalStore<number | null>(subscribe, nowSecond, serverSecond);

type Visit =
  | { phase: 'idle' }
  | { phase: 'in'; timeIn: number; late: number }
  | { phase: 'out'; timeIn: number; timeOut: number; late: number };

type KioskState = {
  visit: Visit;
  lastTap: number | null;
  cooldownUntil: number | null;
  complete: boolean;
  announce: string;
};

const initial: KioskState = { visit: { phase: 'idle' }, lastTap: null, cooldownUntil: null, complete: false, announce: '' };

const duplicateText = (seconds: number) => `Already recorded. Try again in ${seconds}s`;

function Clock() {
  const second = useSecond();
  return <span className="ap-kiosk-clock">{second === null ? '--:--:--' : timeOf(second * 1000)}</span>;
}

function LiveGreeting() {
  const second = useSecond();
  return <p className="ap-kiosk-greet">{second === null ? copy.brand : greetingFor(hourOf(second * 1000))}</p>;
}

function Countdown({ until, fallback }: { until: number; fallback: string }) {
  const second = useSecond();
  const left = second === null ? 0 : Math.ceil(until / 1000 - second);
  return <>{left > 0 ? duplicateText(left) : fallback}</>;
}

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="ap-kiosk-facts">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TapCard() {
  const [state, setState] = useState<KioskState>(initial);
  const cardRef = useRef<HTMLButtonElement>(null);
  const { visit } = state;

  const tap = () => {
    const now = Date.now();
    if (state.lastTap !== null && now - state.lastTap < COOLDOWN_MS) {
      const until = state.lastTap + COOLDOWN_MS;
      setState({ ...state, cooldownUntil: until, announce: `${duplicateText(Math.ceil((until - now) / 1000))}.` });
      return;
    }
    if (visit.phase === 'idle') {
      const at = new Date(now);
      const late = lateHours(kioskRules, at.getHours(), at.getMinutes(), at.getSeconds());
      setState({
        visit: { phase: 'in', timeIn: now, late },
        lastTap: now,
        cooldownUntil: null,
        complete: false,
        announce: `${greetingFor(at.getHours())}, ${copy.visitor}. ${copy.timeIn} at ${timeOf(now)}. ${statusFor(late)}. Today’s pay ${peso(todaysPay(kioskRules, late))}.`,
      });
      return;
    }
    if (visit.phase === 'in') {
      setState({
        visit: { phase: 'out', timeIn: visit.timeIn, timeOut: now, late: visit.late },
        lastTap: now,
        cooldownUntil: null,
        complete: false,
        announce: `${copy.timeOut} at ${timeOf(now)}. Hours stayed: ${formatStay(now - visit.timeIn)}.`,
      });
      return;
    }
    setState({ ...state, cooldownUntil: null, complete: true, announce: copy.complete });
  };

  const reset = () => {
    setState({ ...initial, announce: `${copy.reset}. ${copy.promptIn}.` });
    cardRef.current?.focus();
  };

  const prompt = visit.phase === 'idle' ? copy.promptIn : visit.phase === 'in' ? copy.promptOut : copy.promptDone;
  const readerText = state.complete ? copy.complete : prompt;
  const cardLabel = visit.phase === 'out' ? 'Tap the card' : prompt;

  return (
    <div data-ui className="ap-kiosk" data-phase={visit.phase} data-docked={visit.phase === 'in'}>
      <div className="ap-kiosk-inner">
        <div className="ap-kiosk-bar">
          <div className="ap-kiosk-brand">
            {/* drawn at 24px and up to about 55px on a wide plate (systems.css), so the source is 48 */}
            <Image src="/alpha-premier/brand/peacock.png" alt="" width={48} height={48} />
            <p>
              <span className="ap-kiosk-name">{copy.brand}</span>
              <span>{copy.place}</span>
            </p>
          </div>
          <Clock />
        </div>

        <div className="ap-kiosk-live">
          <div className="ap-kiosk-screen">
            {visit.phase === 'idle' ? (
              <LiveGreeting />
            ) : (
              <>
                <p className="ap-kiosk-greet">
                  {greetingFor(hourOf(visit.timeIn))}, {copy.visitor}
                </p>
                <div className="ap-kiosk-what">
                  <p>{visit.phase === 'in' ? copy.timeIn : copy.timeOut}</p>
                  <button type="button" className="ap-kiosk-reset" onClick={reset}>
                    {copy.reset}
                  </button>
                </div>
                {visit.phase === 'in' ? (
                  <Facts
                    rows={[
                      ['Time', timeOf(visit.timeIn)],
                      ['Status', statusFor(visit.late)],
                      ['Today’s pay', peso(todaysPay(kioskRules, visit.late))],
                    ]}
                  />
                ) : (
                  <Facts
                    rows={[
                      ['Time in', timeOf(visit.timeIn)],
                      ['Time out', timeOf(visit.timeOut)],
                      ['Hours stayed', formatStay(visit.timeOut - visit.timeIn)],
                    ]}
                  />
                )}
              </>
            )}
          </div>

          <div className="ap-kiosk-dock">
            <div className="ap-kiosk-slide">
              <button ref={cardRef} type="button" className="ap-kiosk-card" aria-label={cardLabel} onClick={tap}>
                <span className="ap-kiosk-chip" aria-hidden="true" />
                <span className="ap-kiosk-print" aria-hidden="true">
                  {copy.brand}
                </span>
              </button>
            </div>
            <div className="ap-kiosk-reader" aria-hidden="true">
              <svg viewBox="0 0 20 20" width="20" height="20" className="ap-kiosk-waves">
                <path d="M6 6.5a5 5 0 0 1 0 7M9.5 4a8.5 8.5 0 0 1 0 12M13 1.5a12 12 0 0 1 0 17" />
              </svg>
              <span>{state.cooldownUntil !== null && !state.complete ? <Countdown until={state.cooldownUntil} fallback={readerText} /> : readerText}</span>
            </div>
          </div>

          <p className="ap-sr-only" role="status" aria-live="polite">
            {state.announce}
          </p>
        </div>

        <noscript>
          <table className="ap-kiosk-table">
            <caption>{copy.examplesCaption}</caption>
            <thead>
              <tr>
                <th scope="col">Time in</th>
                <th scope="col">Status</th>
                <th scope="col">Today’s pay</th>
              </tr>
            </thead>
            <tbody>
              {copy.examples.map((row) => {
                const late = lateHours(kioskRules, row.hour, row.minute);
                return (
                  <tr key={row.time}>
                    <th scope="row">{row.time}</th>
                    <td>{statusFor(late)}</td>
                    <td>{peso(todaysPay(kioskRules, late))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </noscript>
      </div>
    </div>
  );
}
