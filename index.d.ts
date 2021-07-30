interface RenderToRootOptions {
    /** @default true */
    strictMode?: boolean;
    /** @default #root */
    selector?: string;
}
export declare const renderToDom: (Element: JSX.Element, { strictMode, selector }?: RenderToRootOptions) => void;
export declare const useToggleState: (initialState?: boolean) => {
    state: boolean;
    on: () => void;
    off: () => void;
    toggle: () => void;
};
export {};
