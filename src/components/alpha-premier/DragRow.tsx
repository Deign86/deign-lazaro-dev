'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

type Props = { className: string; label: string; children: ReactNode };

// The gallery row: native sideways scroll (touch, trackpad, keyboard once focused), plus
// click-and-drag for a mouse. Drag state lives on the element, so React never re-renders mid-drag.
export function DragRow({ className, label, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; left: number } | null>(null);

  const start = (event: PointerEvent<HTMLDivElement>) => {
    const row = ref.current;
    if (!row || event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, left: row.scrollLeft };
    row.setPointerCapture(event.pointerId);
    row.dataset.dragging = 'true';
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const row = ref.current;
    const d = drag.current;
    if (!row || !d || d.id !== event.pointerId) return;
    row.scrollLeft = d.left - (event.clientX - d.x);
  };

  const end = (event: PointerEvent<HTMLDivElement>) => {
    const row = ref.current;
    if (!row || !drag.current) return;
    drag.current = null;
    if (row.hasPointerCapture(event.pointerId)) row.releasePointerCapture(event.pointerId);
    delete row.dataset.dragging;
  };

  return (
    <div
      ref={ref}
      className={className}
      role="region"
      aria-label={label}
      tabIndex={0}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      onLostPointerCapture={end}
    >
      {children}
    </div>
  );
}
