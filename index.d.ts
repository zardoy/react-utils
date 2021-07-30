interface RenderToRootOptions {
    /** @default true */
    strictMode?: boolean;
    /** @default #root */
    selector: string;
}
export declare const renderToRoot: (Element: JSX.Element, { strictMode, selector }: RenderToRootOptions) => void;
export declare const useToggleState: (initialState?: boolean) => {
    isOpen: boolean;
    on: () => void;
    off: () => void;
    toggle: () => void;
};
export {};
