import { DependencyList, useEffect } from 'react'

type Unsubscribe = () => void

type Options = boolean | Readonly<AddEventListenerOptions> | undefined

function registerListener<KD extends keyof DocumentEventMap>(
  element: Readonly<Document> | null | undefined,
  eventType: KD,
  listener: (this: Document, evt: DocumentEventMap[KD]) => void,
  options?: Options,
): void
function registerListener<KH extends keyof HTMLElementEventMap>(
  element: Readonly<HTMLElement> | null | undefined,
  eventType: KH,
  listener: (this: HTMLElement, evt: HTMLElementEventMap[KH]) => void,
  options?: Options,
): void
function registerListener<KW extends keyof WindowEventMap>(
  element: Readonly<Window> | null | undefined,
  eventType: KW,
  listener: (this: Window, evt: WindowEventMap[KW]) => void,
  options?: Options,
): void
function registerListener<T extends { on: (type: KW, listener: (...args: any[]) => void) => void, off: (type: KW, listener: (...args: any[]) => void) => void }, KW extends keyof T['on']>(
  element: T,
  eventType: KW,
  listener: (this: Window, evt: T['on'][KW]) => void,
  options?: Options,
): void
function registerListener<T extends { addListener: (type: KW, listener: (...args: any[]) => void) => void, removeListener: (type: KW, listener: (...args: any[]) => void) => void }, KW extends keyof T['addListener']>(
  element: T,
  eventType: KW,
  listener: (this: Window, evt: T['addListener'][KW]) => void,
  options?: Options,
): void
//@ts-expect-error
function registerListener(
  element: Readonly<Document | HTMLElement | Window> | null | undefined,
  eventType: string,
  listener: (evt: Event) => void,
  options?: Options,
): void

export type RegisterListener = typeof registerListener

export type UseUtilsCallback = (utils: {
    signal: AbortSignal
    async: (callback: () => Promise<void> | void) => void
    timeout: (ms: number, callback: () => void) => number
    interval: (ms: number, callback: () => void) => number
    // on: <K extends string, T>(target: { on, off } | { addListener, removeListener } | { addEventListener, removeEventListener }, event: K, callback: (data: T) => void) => Unsubscribe
    on: RegisterListener
}) => void

export default (fn: UseUtilsCallback, deps: DependencyList) => {
    useEffect(() => {
        const controller = new AbortController()
        const timeouts = new Set<number>()
        const intervals = new Set<number>()
        const unsubscribes = new Set<Unsubscribe>()
        fn({
            signal: controller.signal,
            async(callback) {
                callback()
            },
            timeout(ms, callback) {
                const id = setTimeout(callback, ms)
                timeouts.add(id)
                return id
            },
            interval(ms, callback) {
                const id = setInterval(callback, ms)
                intervals.add(id)
                return id
            },
            on(target, event, callback, options) {
                let unsubscribe: Unsubscribe
                if ('on' in target) {
                    target.on(event, callback, options)
                    unsubscribe = () => target.off(event, callback)
                } else if ('addEventListener' in target) {
                    target.addEventListener(event, callback, options)
                    unsubscribe = () => target.removeEventListener(event, callback, options)
                } else if ('addListener' in target) {
                    target.addListener(event, callback, options)
                    unsubscribe = () => target.removeListener(event, callback)
                } else {
                    throw new Error('Invalid target, must have on/off or addEventListener/removeEventListener or addListener/removeListener')
                }
                unsubscribes.add(unsubscribe)
                return unsubscribe
            }
        })

        return () => {
            controller.abort()
            timeouts.forEach(clearTimeout)
            intervals.forEach(clearInterval)
            unsubscribes.forEach(unsubscribe => unsubscribe())
        }
    }, deps)
}
