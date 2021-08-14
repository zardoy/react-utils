import React, { useCallback, useMemo, useState } from 'react'
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

export const useToggleState = (
    /**
     * @default false
     */
    initialState = false,
) => {
    const [state, setState] = useState(initialState)
    const turnOn = useCallback(() => setState(true), [])
    const turnOff = useCallback(() => setState(false), [])
    const toggle = useCallback(s => setState(s), [])
    return {
        isOn: state,
        turnOn,
        turnOff,
        toggle,
    }
}
