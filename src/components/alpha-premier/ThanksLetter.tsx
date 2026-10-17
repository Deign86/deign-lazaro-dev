import type { CSSProperties, ReactNode } from 'react';
import { closing, thanks } from '@/data/alpha-premier';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// The one marker phrase on the page, set on a flat accent ground.
function withMarker(text: string, phrase: string): ReactNode {
  const at = phrase ? text.indexOf(phrase) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className="ap-letter__mark">{phrase}</mark>
      {text.slice(at + phrase.length)}
    </>
  );
}

// "Ma’am Jean, our HR supervisor, gave…": a line that opens on a determiner is an apposition.
const joiner = (text: string) => (/^(our|the|my)\b/i.test(text) ? ', ' : ' ');

// Blueprint "Founder's letter": a centred 520px column on empty ground, no visible heading.
export function ThanksLetter() {
  const last = thanks.people.length + 1;

  return (
    <section id="thanks" className="ap-letter" aria-labelledby="ap-thanks-title">
      <h2 id="ap-thanks-title" className="ap-sr-only">
        {closing.thanksHeading}
      </h2>
      <div className="ap-letter__column">
        <div className="ap-letter__body">
          <p data-reveal style={i(0)}>
            {thanks.opening}
          </p>
          {thanks.people.map((person, k) => (
            <p key={person.name} data-reveal style={i(k + 1)}>
              <strong className="ap-letter__name">{person.name}</strong>
              {joiner(person.text)}
              {person.text}
            </p>
          ))}
          <p data-reveal style={i(last)}>
            {withMarker(thanks.closing, closing.thanksMarker)}
          </p>
        </div>
        <p className="ap-letter__sign" data-reveal style={i(last + 1)}>
          <span className="ap-letter__signature">{thanks.signature}</span>
          <span className="ap-letter__role ap-small ap-muted">{thanks.role}</span>
        </p>
      </div>
    </section>
  );
}
