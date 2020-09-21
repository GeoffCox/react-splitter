import * as React from "react";
declare type Props = {
    initialTopGridHeight?: string | number;
    minTopPixels?: number;
    minBottomPixels?: number;
    splitterHeight?: number;
    renderSplitter?: () => JSX.Element;
};
export declare const TopBottomSplit: (props: React.PropsWithChildren<Props>) => JSX.Element;
export {};
