declare module 'nprogress' {
    interface NProgressOptions {
      minimum?: number;
      easing?: string;
      speed?: number;
      trickle?: boolean;
      trickleSpeed?: number;
      showSpinner?: boolean;
      parent?: string;
      template?: string;
    }
  
    interface NProgress {
      configure(options: NProgressOptions): NProgress;
      start(): NProgress;
      set(n: number): NProgress;
      inc(amount?: number): NProgress;
      done(force?: boolean): NProgress;
      remove(): void;
    }
  
    const nprogress: NProgress;
    export = nprogress;
  }
  