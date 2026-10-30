import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../constants/content.ts';

interface Props {
  children: React.ReactNode;
}
interface State {
  failed: boolean;
}

/** Catches a crash while a page is drawing and shows a calm recovery screen instead of a blank page. */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    // Kept in the browser console so it shows up when someone tests the site; add a reporting service here later.
    console.error('Page error:', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="flex min-h-[70svh] items-center bg-[#0C0D12] py-20" role="alert">
        <div className="shell">
          <h1 className="max-w-[18ch] font-display text-fluid-h2 font-semibold text-white">Something went wrong on our side.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#CBD5E1]">
            The page could not load properly. Try again, or go back home. If it keeps happening, email{' '}
            <a className="font-semibold text-[#F59E0B] underline-offset-4 hover:underline" href={`mailto:${BRAND.contact.email}`}>
              {BRAND.contact.email}
            </a>
            .
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-14 cursor-pointer items-center justify-center rounded-full bg-[#2563EB] px-8 text-base font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-all hover:bg-[#1D4ED8]"
            >
              Try again
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ failed: false })}
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#334155] bg-[#161F36] px-8 text-base font-semibold text-white transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
