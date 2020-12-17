import * as React from 'react';
import { RenderSplitterProps } from './RenderSplitterProps';
export declare type SplitProps = {
    /**
     * Add this attribute or set to true to create a top/bottom split.
     * Set to false to create a left|right split.
     */
    horizontal?: boolean;
    /**
     * The initial width/height of the left/top pane.
     * Width is specified as a CSS unit (e.g. %, fr, px)
     */
    initialPrimarySize?: string;
    /**
     * The preferred minimum width/height of the left/top pane.
     * Specified as a CSS unit (e.g. %, fr, px)
     */
    minPrimarySize?: string;
    /**
     * The preferred minimum width/height of the right/bottom pane.
     * Specified as a CSS unit (e.g. %, fr, px)
     */
    minSecondarySize?: string;
    /**
     * The width of the splitter between the left and right panes.
     * Specified as a CSS unit (e.g. %, fr, px)
     */
    splitterSize?: string;
    /**
     * Render props for the splitter.
     * @param pixelSize The measured size of the splitter in pixels.
     * @param horizontal True if the splitter is horizontal (i.e. top/bottom); false otherwise.
     */
    renderSplitter?: (props: RenderSplitterProps) => React.ReactNode | undefined;
    /**
     * When true, if the user double clicks the splitter it will reset to its initial position.
     * The default is false.
     */
    resetOnDoubleClick?: boolean;
    /**
     * The colors to use for the default splitter.
     * Only used when renderSplitter is undefined;
     * The defaults are silver, gray, and black
     */
    defaultSplitterColors?: {
        color: string;
        hover: string;
        drag: string;
    };
};
export declare const Split: (props: React.PropsWithChildren<SplitProps>) => JSX.Element;
