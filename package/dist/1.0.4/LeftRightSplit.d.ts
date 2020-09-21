import * as React from "react";
declare type Props = {
    initialLeftGridWidth?: string | number;
    minLeftPixels?: number;
    minRightPixels?: number;
    splitterWidth?: number;
    renderSplitter?: () => JSX.Element;
};
export declare const LeftRightSplit: (props: React.PropsWithChildren<Props>) => JSX.Element;
export {};
