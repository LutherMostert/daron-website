export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#0A2540] text-white">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:px-12">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#F97316] sm:text-base">
          Daron Namibia · Since 2012
        </p>
        <h1 className="max-w-3xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Supplying Africa&apos;s seas, shores &amp; industries with confidence
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          Marine supply, oil &amp; gas logistics, and industrial solutions from Walvis Bay — operating across the African corridor for over a decade.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href="https://wa.me/264811413840"
            className="rounded-full bg-[#F97316] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#ea680f]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with Don on WhatsApp →
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact us
          </a>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-white/10 bg-[#081d33] px-6 py-20 sm:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-[family-name:var(--font-poppins)] text-2xl font-semibold sm:text-3xl">
            Get in touch
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="mb-3 font-[family-name:var(--font-poppins)] text-lg font-semibold text-[#F97316]">
                Quick RFQ — chat with Don
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/80">
                Don is our AI quoting agent. Message on WhatsApp and a drafted quote lands in minutes. A human KAM reviews every request.
              </p>
              <a
                href="https://wa.me/264811413840"
                className="inline-flex items-center font-semibold text-[#F97316] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                wa.me/264811413840 →
              </a>
            </div>
            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="mb-3 font-[family-name:var(--font-poppins)] text-lg font-semibold">
                Head office
              </h3>
              <address className="space-y-2 not-italic text-sm leading-relaxed text-white/80">
                <p>
                  No. 31 Grand Avenue, Industrial Area
                  <br />
                  Walvis Bay, Erongo Region, Namibia
                </p>
                <p>
                  <a href="tel:+264833374710" className="hover:text-[#F97316]">
                    +264 83 337 4710
                  </a>
                </p>
                <p>
                  <a href="mailto:dnoperations@daron-group.com" className="hover:text-[#F97316]">
                    dnoperations@daron-group.com
                  </a>
                </p>
                <p>
                  <a href="mailto:namtechnical@daron-group.com" className="hover:text-[#F97316]">
                    namtechnical@daron-group.com
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/50 sm:px-12">
        <p>
          © 2012–{new Date().getFullYear()} Daron Trading Namibia (Pty) Ltd · Full site launching soon
        </p>
      </footer>
    </main>
  );
}

