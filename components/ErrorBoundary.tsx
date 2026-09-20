import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  module?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Tactical Error Boundary for module isolation.
 */
// REVERT MARKER: RESTORE_POINT_ALPHA
export class TacticalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public state: State;
  // Explicitly declare props to ensure TS recognizes it
  declare props: Readonly<Props>;

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[THELMA FAULT] Module: ${this.props.module}`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 bg-slate-900 text-white rounded-2xl border border-red-500 shadow-2xl flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
             <span className="text-2xl font-black">!</span>
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest mb-2">Module Execution Failure</h2>
          <p className="text-slate-400 text-xs mb-6 max-w-sm">The federation has isolated a fault in the {this.props.module} node to prevent cascading system collapse.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Re-Initialize Mesh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}