import * as React from 'react';
import { RenderSplitterProps } from './RenderSplitterProps';
import './split.css';
export declare type SplitMeasuredSizes = {
    /**
     * The measured size of the primary pane in pixels.
     */
    primary: number;
    /**
     * The measured size of the splitter in pixels.
     */
    splitter: number;
    /**
     * The measured size of the secondary pane in pixels.
     */
    secondary: number;
};
export declare type SplitProps = {
    /**
     * Add this attribute or set to true to create a top/bottom split.
     * Set to false to create a left|right split.
     */
    horizontal?: boolean;
    /**
     * The initial width/height of the left/top pane.
     * Width is specified as a CSS unit (e.g. %, fr, px).
     * The default is 50%.
     */
    initialPrimarySize?: string;
    /**
     * The preferred minimum width/height of the left/top pane.
     * Specified as a CSS unit (e.g. %, fr, px).
     * The default is 0.
     */
    minPrimarySize?: string;
    /**
     * The preferred minimum width/height of the right/bottom pane.
     * Specified as a CSS unit (e.g. %, fr, px).
     * The default is 0.
     */
    minSecondarySize?: string;
    /**
     * The width of the splitter between the panes.
     * Specified as a CSS unit (e.g. %, fr, px).
     * The default is 7px.
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
    /**
     * Raised when the splitter moves to provide the primary size.
     * When the user has adjusted the splitter, this will be a percentage.
     * Otherwise, this will be the initialPrimarySize.
     */
    onSplitChanged?: (primarySize: string) => void;
    /**
     * Raised whenever the primary, splitter, or secondary measured sizes change.
     * These values are debounced at 500ms to prevent spamming this event.
     */
    onMeasuredSizesChanged?: (sizes: SplitMeasuredSizes) => void;
};
export declare const Split: (props: React.PropsWithChildren<SplitProps>) => JSX.Element;
