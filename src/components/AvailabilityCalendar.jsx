import { useState, useMemo } from 'react';

/* ── AVAILABILITY CALENDAR ──
   A month-grid date picker for the onboarding flow's "when would you like
   to start" step. Visitors pick an actual date instead of a vague bucket,
   and dates the studio is already booked on (or otherwise unavailable)
   are greyed out and unclickable.

   NOTE ON REAL AVAILABILITY DATA
   There's no scheduling backend in this project yet, so `unavailableDates`
   below is mock data — a plain array of 'YYYY-MM-DD' strings. To wire this
   up to real availability later, replace the mock array with dates fetched
   from your backend (e.g. `GET /api/availability`) and pass the result into
   <AvailabilityCalendar unavailableDates={fetchedDates} />. The component
   itself doesn't care where the list comes from. */

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// How many months ahead a visitor is allowed to book.
const MONTHS_AHEAD_LIMIT = 6;

function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

// Demo "already booked" dates, generated relative to today so the mock
// data never goes stale. Swap this out for a real fetched list — see note
// above the component.
export function getMockUnavailableDates() {
  const offsets = [3, 4, 8, 9, 10, 15, 22, 23, 30, 38, 45, 46, 52];
  const today = new Date();
  return offsets.map(n => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return toISODate(d);
  });
}

function AvailabilityCalendar({ value, onChange, unavailableDates = [] }) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [y, m] = value.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const unavailableSet = useMemo(() => new Set(unavailableDates), [unavailableDates]);

  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD_LIMIT, 1);

  const canGoPrev = viewDate > minMonth;
  const canGoNext = viewDate < maxMonth;

  const cells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const out = [];
    for (let i = 0; i < startOffset; i++) out.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const iso = toISODate(date);
      const isPast = date < today;
      const isSunday = date.getDay() === 0; // studio closed Sundays
      const isUnavailable = unavailableSet.has(iso);
      // Track *why* a date is disabled, not just whether it is — a Sunday
      // and an already-booked weekday look identical to a visitor without
      // this, and there's no way to tell the two apart on sight.
      const disabledReason = isPast ? 'past' : isSunday ? 'sunday' : isUnavailable ? 'booked' : null;
      out.push({
        day,
        iso,
        isToday: iso === toISODate(today),
        isSelected: iso === value,
        isDisabled: Boolean(disabledReason),
        disabledReason,
      });
    }
    return out;
  }, [viewDate, today, value, unavailableSet]);

  const reasonLabel = {
    past: 'This date has already passed',
    sunday: 'Studio closed on Sundays',
    booked: 'Already booked on this date',
  };

  const goPrev = () => canGoPrev && setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNext = () => canGoNext && setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="onboard-calendar">
      <div className="onboard-cal-header">
        <button
          type="button"
          className="onboard-cal-nav"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Previous month"
        >←</button>
        <span className="onboard-cal-title" aria-live="polite">{MONTH_LABELS[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button
          type="button"
          className="onboard-cal-nav"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Next month"
        >→</button>
      </div>

      <div className="onboard-cal-weekdays">
        {DAY_LABELS.map((d, i) => <span key={i}>{d}</span>)}
      </div>

      <div className="onboard-cal-grid">
        {cells.map((cell, i) => cell === null ? (
          <span key={`pad-${i}`} className="onboard-cal-day empty" />
        ) : (
          <button
            type="button"
            key={cell.iso}
            className={
              'onboard-cal-day'
              + (cell.isDisabled ? ' disabled' : '')
              + (cell.isSelected ? ' selected' : '')
              + (cell.isToday ? ' today' : '')
            }
            disabled={cell.isDisabled}
            onClick={() => onChange(cell.iso)}
            title={cell.disabledReason ? reasonLabel[cell.disabledReason] : undefined}
            aria-label={
              formatDisplayDate(cell.iso)
              + (cell.disabledReason ? ` — ${reasonLabel[cell.disabledReason]}` : '')
              + (cell.isSelected ? ' (selected)' : '')
            }
            aria-pressed={cell.isSelected}
          >
            {cell.day}
          </button>
        ))}
      </div>

      <div className="onboard-cal-legend">
        <span><i className="dot available" /> Available</span>
        <span><i className="dot booked" /> Unavailable</span>
        <span><i className="dot selected" /> Selected</span>
      </div>
      <div className="onboard-cal-note">Studio closed Sundays. Hover a greyed-out date for the reason.</div>

      {value && (
        <div className="onboard-cal-selected-label">
          Start date: <strong>{formatDisplayDate(value)}</strong>
        </div>
      )}
    </div>
  );
}

export default AvailabilityCalendar;
