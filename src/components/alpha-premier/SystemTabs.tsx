'use client';

import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';

type Tab = { id: string; label: string };

type Props = {
  /** id of the section heading that names the tab list */
  labelledBy: string;
  tabs: Tab[];
  /** server-rendered panel contents, in the same order as `tabs` */
  panels: ReactNode[];
};

const tabId = (id: string) => `ap-sys-tab-${id}`;
const panelId = (id: string) => `ap-sys-panel-${id}`;

// ARIA tabs with automatic activation and a roving tabindex. Every panel is rendered on the server and
// stays in the DOM: with script the inactive ones are faded out by CSS (data-active), and without script
// systems.css (@media (scripting: none)) hides the tab row and stacks all four panels.
export function SystemTabs({ labelledBy, tabs, panels }: Props) {
  const [active, setActive] = useState(0);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className="ap-sys">
      <div
        className="ap-sys-tablist"
        role="tablist"
        aria-labelledby={labelledBy}
        data-reveal
        style={{ '--i': 1 } as CSSProperties}
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId(tab.id)}
              className="ap-sys-tab"
              data-label={tab.label}
              aria-selected={selected}
              aria-controls={panelId(tab.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={panelId(tab.id)}
          aria-labelledby={tabId(tab.id)}
          className="ap-sys-panel"
          data-system={tab.id}
          data-active={index === active}
        >
          {panels[index]}
        </div>
      ))}
    </div>
  );
}
