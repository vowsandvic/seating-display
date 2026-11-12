import type { Dictionary } from './types';

const en: Dictionary = {
  docTitle: 'Find your seat',
  heroTitle: 'Find your seat',
  heroDesc: 'Type your name, then tap it to see your table and seat on the floor plan.',
  searchPlaceholder: 'Type your name',
  chipsLabel: 'Or choose a table',
  legRound: 'Round table',
  legLong: 'Long table',
  legStage: 'Stage',
  legDoor: 'Door',
  planTitle: 'Floor plan',
  hintTag: 'Drag to move around. Scroll or pinch to zoom.',
  zoomInTitle: 'Zoom in',
  zoomOutTitle: 'Zoom out',
  homeTitle: 'Show the whole room',
  gpCloseLabel: 'Close',
  gpBackBtn: 'Back to the whole room',
  gpShowAll: (n) => `Show everyone at this table (${n})`,
  gpShowLess: 'Show less',
  tableWordPrefix: 'Table ',
  seatsSuffix: (n) => `${n} seat${n === 1 ? '' : 's'}`,
  seatInline: (seat) => `Seat ${seat}`,
  capacityFraction: (a, b) => `${a} / ${b} seats`,
  emptySeatLabel: 'Empty',
  noGuestForTable: 'No one is seated at this table yet.',
  searchEmpty: 'No guest with that name. Check the spelling, or try just your first name.',
  location: (side, depth) => {
    const d = { front: 'front, near the stage', middle: 'middle of the room', back: 'back of the room' }[depth];
    const s = { left: 'Left side', center: 'Centre', right: 'Right side' }[side];
    return side === 'center' && depth === 'middle' ? 'Middle of the room' : `${s} · ${d}`;
  },
  viewOnPlan: 'View plan',
  toastTableNotFound: (table) => `Table "${table}" isn't on the floor plan. Please ask a member of staff.`,
  langToggleTitle: 'Switch language / เปลี่ยนภาษา',
  qrBtnTitle: 'Show this page as a QR code',
  qrTitle: 'Scan to find your seat',
  qrDesc: 'Let the people with you scan this code to open the seat finder on their own phone.',
  qrAlt: 'QR code for the seat finder',
  qrLinkLabel: 'Seat finder link',
  qrShare: 'Share link',
  qrCopy: 'Copy link',
  qrCopied: 'Link copied',
  qrDownload: 'Save QR image',
};

export default en;
