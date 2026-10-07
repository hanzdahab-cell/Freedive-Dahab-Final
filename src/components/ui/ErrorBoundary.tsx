import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0E3453] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#0E3453] p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
              <AlertCircle className="h-7 w-7" />
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400">
              Application Notice
            </span>

            <h1 className="mt-2 font-alata text-2xl font-normal text-white">
              Something went wrong
            </h1>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              An unexpected error occurred while loading this section. You can try refreshing the page or continuing.
            </p>

            {this.state.error?.message && (
              <div className="mt-4 overflow-hidden rounded-lg bg-black/40 p-3 text-left font-mono text-[11px] text-slate-400 border border-white/5">
                <p className="truncate text-cyan-300">{this.state.error.message}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-ocean-light"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10 hover:border-white/40"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
