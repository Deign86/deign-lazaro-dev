import Image from 'next/image';
import type { CSSProperties } from 'react';
import { systems, systemsDemo, type System } from '@/data/alpha-premier';
import { SystemTabs } from './SystemTabs';
import { TapCard } from './TapCard';
import { ViberFragment } from './ViberFragment';

const i = (n: number) => ({ '--i': n }) as CSSProperties;
const HEADING_ID = 'ap-systems-title';

function Plate({ system }: { system: System }) {
  if (system.id === 'attendance') {
    return (
      <>
        <div className="ap-sys-square ap-sys-square--ui">
          <TapCard />
        </div>
        <p className="ap-sys-note">{systemsDemo.kiosk.note}</p>
      </>
    );
  }
  if (system.id === 'viber') {
    return (
      <div className="ap-sys-square ap-sys-square--ui">
        <ViberFragment />
      </div>
    );
  }
  if (!system.image) return null;
  return (
    <div className="ap-sys-square">
      <Image
        src={system.image.src}
        alt={system.image.alt}
        fill
        sizes="(min-width: 1000px) calc(50vw - 80px), (min-width: 600px) 576px, calc(100vw - 24px)"
        className={`ap-sys-img ap-sys-img--${system.id}`}
      />
    </div>
  );
}

function Cell({ link, tone }: { link: System['primary']; tone: 'primary' | 'secondary' }) {
  const external = /^https?:\/\//.test(link.href);
  return (
    <a
      className={`ap-sys-cell ap-sys-cell--${tone}`}
      href={link.href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      <span className="ap-sys-cell-label">{link.label}</span>
      {external && <span className="ap-sr-only"> (opens in a new tab)</span>}
      <svg className="ap-sys-cell-mark" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
      </svg>
    </a>
  );
}

function Panel({ system }: { system: System }) {
  const titleId = `ap-sys-title-${system.id}`;
  return (
    <>
      <div className="ap-sys-plate" data-reveal style={i(0)}>
        <Plate system={system} />
      </div>
      <div className="ap-sys-body">
        <h3 id={titleId} className="ap-sys-title" data-reveal style={i(2)}>
          {system.title}
        </h3>
        <p className="ap-sys-desc" data-reveal style={i(3)}>
          {system.description}
        </p>
        <table className="ap-sys-specs" aria-labelledby={titleId} data-reveal style={i(4)}>
          <tbody>
            {system.specs.map((spec) => (
              <tr key={spec.label}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ap-sys-actions" data-reveal style={i(5)}>
        <Cell link={system.primary} tone="primary" />
        <Cell link={system.secondary} tone="secondary" />
      </div>
    </>
  );
}

/** Showcase "Square plate, spare text": the four systems as tabs, full width, breaking the split stage. */
export function Systems() {
  return (
    <section id="systems" aria-labelledby={HEADING_ID} className="ap-systems">
      <h2 id={HEADING_ID} className="ap-sr-only">
        Four systems
      </h2>
      <SystemTabs
        labelledBy={HEADING_ID}
        tabs={systems.map((system) => ({ id: system.id, label: system.tab }))}
        panels={systems.map((system) => (
          <Panel key={system.id} system={system} />
        ))}
      />
    </section>
  );
}
