declare module 'gsap' {
  export interface TweenVars {
    [key: string]: any;
  }
  
  export interface TimelineVars {
    defaults?: { ease?: string; [key: string]: any };
    [key: string]: any;
  }
  
  export class Tween {
    pause(): this;
    play(): this;
    restart(): this;
    kill(): void;
  }
  
  export class Timeline {
    fromTo(target: any, fromVars: TweenVars, toVars: TweenVars, position?: string | number): this;
    to(target: any, vars: TweenVars, position?: string | number): this;
    from(target: any, vars: TweenVars, position?: string | number): this;
    pause(): this;
    play(): this;
    restart(): this;
    kill(): void;
  }
  
  export interface Context {
    revert(): void;
  }
  
  export interface Utils {
    toArray<T>(value: any): T[];
  }
  
  export function to(target: any, vars: TweenVars): Tween;
  export function from(target: any, vars: TweenVars): Tween;
  export function fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween;
  export function timeline(vars?: TimelineVars): Timeline;
  export function set(target: any, vars: TweenVars): void;
  export function context(func: () => void, scope?: any): Context;
  
  export const utils: Utils;
  
  export const gsap: {
    to: typeof to;
    from: typeof from;
    fromTo: typeof fromTo;
    timeline: typeof timeline;
    set: typeof set;
    context: typeof context;
    utils: Utils;
    registerPlugin(...plugins: any[]): void;
  };
  
  export default gsap;
}

declare module 'gsap/ScrollTrigger' {
  export interface ScrollTriggerVars {
    trigger?: string | Element | null;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    toggleActions?: string;
    onUpdate?: (self: any) => void;
    [key: string]: any;
  }
  
  export interface ScrollTriggerStatic {
    create(vars: ScrollTriggerVars): ScrollTrigger;
    getAll(): ScrollTrigger[];
    refresh(): void;
    defaults(vars: ScrollTriggerVars): void;
  }
  
  export class ScrollTrigger {
    static create(vars: ScrollTriggerVars): ScrollTrigger;
    static getAll(): ScrollTrigger[];
    static refresh(): void;
    static defaults(vars: ScrollTriggerVars): void;
    kill(): void;
  }
  
  export function create(vars: ScrollTriggerVars): ScrollTrigger;
}

declare module 'gsap/ScrollToPlugin' {
  const ScrollToPlugin: any;
  export default ScrollToPlugin;
}
