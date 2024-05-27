import React, { useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

interface RenderToRootOptions {
    /** @default true */
    strictMode?: boolean
    /** @default #root */
    selector?: string
}

export const renderToDom = (Element: JSX.Element, { strictMode = true, selector = '#root' }: RenderToRootOptions = {}) => {
    const root = createRoot(document.querySelector(selector)!)
    root.render(strictMode ? <React.StrictMode>{Element}</React.StrictMode> : Element)
    return root
}

/** Use for linter bypass */
export const useMountEffect = (effect: React.EffectCallback) => {
    useEffect(effect, [])
}

export interface ToggleState {
    state: boolean
    on: () => void
    off: () => void
    toggle: (s?: boolean) => void
}

export const useToggleState = (
    /**
     * @default false
     */
    initialState = false,
): ToggleState => {
    const [state, setState] = useState(initialState)
    const turnOn = useCallback(() => setState(true), [])
    const turnOff = useCallback(() => setState(false), [])
    const toggle = useCallback((s?: boolean) => (s !== undefined ? setState(s) : setState(c => !c)), [])
    return {
        state,
        on: turnOn,
        off: turnOff,
        toggle,
    }
}

export interface ModalState {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: (s?: boolean) => void
}

export const useModalState = (
    /**
     * The same `useToggleState` but with property names for modal
     * @default false
     */
    initialState = false,
): ModalState => {
    const { state, toggle, off, on } = useToggleState(initialState)
    return {
        isOpen: state,
        open: on,
        close: off,
        toggle,
    }
}

export { default as ErrorBoundary } from './errorBoundary'
export { extendComponent } from './extendComponent'

export type AwaitedClickAction = {
    disabled: boolean
    onClick: (e: any) => Promise<void>
}

export const useAwaitedClickAction = (action: () => Promise<void>, forceDisabled = false): AwaitedClickAction => {
    const [disabled, setDisabled] = useState(false)

    return {
        disabled: disabled || forceDisabled,
        async onClick() {
            if (disabled) return
            // if (forceDisabled) return
            setDisabled(true)
            try {
                await action()
            } finally {
                setDisabled(false)
            }
        },
    }
}

export const useInitEffect = (cb: () => any) => {
    useEffect(() => {
        const result = cb()
        return result
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const globalValidator = {
    value: (a) => { }
}

export const useAsync = <T extends any>(fn: (signal: AbortSignal) => Promise<T>, deps: any[] = [], enableQuery = true, usePolling = null as number | null) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        if (!enableQuery) {
            setLoading(false)
            setError('')
        }
        const abortController = new AbortController()

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fn(abortController.signal)
                globalValidator.value(res)
                if (abortController.signal.aborted) return
                setData(res)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        const interval = usePolling ? setInterval(fetchData, usePolling) : null

        return () => {
            abortController.abort()
            if (interval) clearInterval(interval)
        }
    }, deps)

    return {
        error,
        loading,
        data,
    }
}

export { default as useUtilsEffect } from './useUtilsEffect'
