import React, { useMemo, useState } from "react"
import ReactDOM from "react-dom"

interface RenderToRootOptions {
    /** @default true */
    strictMode?: boolean
    /** @default #root */
    selector: string;
}

export const renderToRoot = (Element: JSX.Element, { strictMode = true, selector = "#root" }: RenderToRootOptions) => {
    ReactDOM.render(strictMode ? <React.StrictMode>{Element}</React.StrictMode> : Element, document.querySelector(selector));
}

export const useToggleState = (
    /**
     * @default false
     */
    initialState = false
) => {
    const [state, setState] = useState(initialState);
    return useMemo(() => {
        return {
            state,
            on: () => setState(true),
            off: () => setState(false),
            toggle: () => setState(s => !s)
        };
    }, [state]);
};