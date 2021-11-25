import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface RenderToRootOptions {
    /** @default true */
    strictMode?: boolean
    /** @default #root */
    selector?: string
}

export const renderToDom = (Element: JSX.Element, { strictMode = true, selector = '#root' }: RenderToRootOptions = {}) => {
    ReactDOM.render(strictMode ? <React.StrictMode>{Element}</React.StrictMode> : Element, document.querySelector(selector))
}

export const useInitEffect = (effect: React.EffectCallback) => {
    useEffect(effect, [])
}

export const useToggleState = (
    /**
     * @default false
     */
    initialState = false,
) => {
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

export const useModalState = (
    /**
     * The same `useToggleState` but with property names for modal
     * @default false
     */
    initialState = false,
) => {
    const { state, toggle, off, on } = useToggleState(initialState)
    return {
        isOpen: state,
        open: on,
        close: off,
        toggle,
    }
}

export { default as ErrorBoundary } from './errorBoundary'
