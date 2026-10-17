import type { CSSProperties } from 'react';
import { systemsDemo } from '@/data/alpha-premier';

const copy = systemsDemo.viber;
const step = (n: number) => ({ '--s': n }) as CSSProperties;

// A neutral chat window (page tokens, no Viber chrome) showing one run of create_client_gc:
// the template becomes a named group chat, the listing goes in with everything below the
// dashed line held back. The on-view sequence lives in systems.css; without script, or under
// reduced motion, the final state below is what shows.
export function ViberFragment() {
  return (
    <div data-ui className="ap-viber">
      <div className="ap-viber-head">
        <span className="ap-viber-from" aria-hidden="true">
          <span className="ap-viber-avatar">A</span>
          <span className="ap-viber-name">{copy.templatesChat}</span>
        </span>
        <span className="ap-viber-to" data-step style={step(1)}>
          <span className="ap-viber-avatar ap-viber-avatar--group" aria-hidden="true">
            A
          </span>
          <span className="ap-viber-name">{copy.groupName}</span>
        </span>
      </div>
      <ol className="ap-viber-log">
        <li className="ap-viber-note" data-step style={step(1)}>
          {copy.created}
        </li>
        <li className="ap-viber-msg" data-step style={step(0)}>
          {copy.template}
        </li>
        <li className="ap-viber-msg ap-viber-doc" data-step style={step(2)}>
          <span className="ap-viber-doc-title">{copy.listingTitle}</span>
          {copy.listingLines.map((line) => (
            <span key={line} className="ap-viber-doc-line">
              {line}
            </span>
          ))}
          <span className="ap-viber-cut" aria-hidden="true" />
          <span className="ap-viber-redact" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="ap-viber-held">{copy.heldBack}</span>
        </li>
        <li className="ap-viber-msg ap-viber-hello" data-step style={step(3)}>
          {copy.hello}
        </li>
      </ol>
    </div>
  );
}
