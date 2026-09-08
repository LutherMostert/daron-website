/** A transparent, scalable web lockup for dark Daron surfaces. */
export function BrandLogo() {
  return (
    <span className="daron-brand" role="img" aria-label="Daron Namibia">
      <svg className="daron-brand-mark" viewBox="0 0 44 48" fill="none" aria-hidden="true">
        <path d="M6 4h13C32.25 4 41 12.1 41 24S32.25 44 19 44h-5v-7h5c9.2 0 14.5-4.9 14.5-13S28.2 11 19 11h-6v10H6V4Z" fill="currentColor" />
        <path d="M17 15h3c5.3 0 8.5 3.2 8.5 9s-3.2 9-8.5 9h-3V15Z" fill="#27d3bd" />
      </svg>
      <span className="daron-brand-type" aria-hidden="true">
        <span className="daron-brand-name">DARON</span>
        <span className="daron-brand-location">NAMIBIA</span>
      </span>
    </span>
  );
}
