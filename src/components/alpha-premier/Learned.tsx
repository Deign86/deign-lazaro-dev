import type { CSSProperties } from 'react';
import { learned } from '@/data/alpha-premier';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// The reflection: heading and lead on the left, the lessons as a reading list on the right,
// on the same 12-column grid as the internship record.
export function Learned() {
  return (
    <section id="learned" className="ap-learned" aria-labelledby="ap-learned-title">
      <div className="ap-learned__head">
        <h2 id="ap-learned-title" className="ap-head" data-reveal style={i(0)}>
          {learned.heading}
        </h2>
        <p className="ap-lead" data-reveal style={i(1)}>
          {learned.lead}
        </p>
      </div>
      <ul className="ap-learned__list">
        {learned.lessons.map((lesson, k) => (
          <li key={lesson.name} className="ap-learned__item" data-reveal style={i(k + 2)}>
            <h3 className="ap-learned__name">{lesson.name}</h3>
            <p>{lesson.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
