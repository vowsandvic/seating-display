import { useEffect, useRef, useState } from 'react';
import { useT } from '../../i18n/I18nContext';
import { useToast } from '../../components/Toast';
import { QrCode, downloadQrPng } from '../../components/QrCode';

/** Canonical link to this page: origin + the base path the site was built under (which is
 * the event path when deployed with one), without any query string or hash. */
function pageUrl(): string {
  return new URL(import.meta.env.BASE_URL, window.location.origin).href;
}

function QrGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
    </svg>
  );
}

/** Top-bar button that opens a sheet with this page's QR code so a guest can let the person
 * next to them scan it, plus copy / share / download fallbacks. */
export function QrShareButton() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="qr-btn2" title={t('qrBtnTitle')} aria-label={t('qrBtnTitle')} onClick={() => setOpen(true)}>
        <QrGlyph />
        <span>QR</span>
      </button>
      {open && <QrSheet onClose={() => setOpen(false)} />}
    </>
  );
}

function QrSheet({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const { showToast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const url = pageUrl();
  const [canShare] = useState(() => typeof navigator !== 'undefined' && typeof navigator.share === 'function');

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      showToast(t('qrCopied'));
    } catch {
      window.prompt(t('qrLinkLabel'), url);
    }
  }

  async function share() {
    try {
      await navigator.share({ title: t('docTitle'), url });
    } catch {
      /* user cancelled */
    }
  }

  const slug = url.replace(/\/+$/, '').split('/').pop() || 'seating';

  return (
    <div className="qr-backdrop2" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="qr-sheet2" role="dialog" aria-modal="true" aria-labelledby="qr-title">
        <button ref={closeRef} type="button" className="qr-close2" aria-label={t('gpCloseLabel')} onClick={onClose}>×</button>
        <h2 id="qr-title">{t('qrTitle')}</h2>
        <p>{t('qrDesc')}</p>
        <div className="qr-code2">
          <QrCode text={url} size={232} label={t('qrAlt')} />
        </div>
        <div className="qr-url2">{url}</div>
        <div className="qr-actions2">
          {canShare && <button type="button" className="qr-action2 primary" onClick={share}>{t('qrShare')}</button>}
          <button type="button" className="qr-action2" onClick={copy}>{t('qrCopy')}</button>
          <button type="button" className="qr-action2" onClick={() => downloadQrPng(url, `seating-qr-${slug}.png`)}>{t('qrDownload')}</button>
        </div>
      </div>
    </div>
  );
}
