import type { CSSProperties } from 'react';
import { closing, internship, record, type InternshipFact } from '@/data/alpha-premier';
import { PrintRecord } from './PrintRecord';
import { RecordList } from './RecordList';

// Optional facts (hours, supervisor, team) appear only when they are defined in the data file.
const FACTS: readonly InternshipFact[] = ['name', 'role', 'company', 'office', 'period', 'hours', 'supervisor', 'team'];

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// The formal record for evaluators. Prints on its own (see @media print in closing.css).
export function InternshipRecord() {
  const facts = FACTS.flatMap((key) => {
    const value = internship[key];
    return value ? [{ key, label: closing.recordLabels[key], value }] : [];
  });

  return (
    <section id="record" className="ap-record" aria-labelledby="ap-record-title">
      <div className="ap-record__head">
        <h2 id="ap-record-title" className="ap-head" data-reveal style={i(0)}>
          {closing.recordHeading}
        </h2>
        <dl className="ap-record__facts" data-reveal style={i(1)}>
          {facts.map((fact) => (
            <div key={fact.key} className="ap-record__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <PrintRecord label={closing.printLabel} />
      </div>
      <RecordList rows={record} />
    </section>
  );
}
