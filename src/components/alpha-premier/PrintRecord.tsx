'use client';

import type { CSSProperties } from 'react';

// One plain text link that prints the record. Hidden in the print itself.
// The reveal sits on the wrapper so the link keeps its own hover and press transitions.
export function PrintRecord({ label }: { label: string }) {
  return (
    <div className="ap-record__print-wrap ap-no-print" data-reveal style={{ '--i': 2 } as CSSProperties}>
      <button type="button" className="ap-link ap-record__print" onClick={() => window.print()}>
        {label}
      </button>
    </div>
  );
}
