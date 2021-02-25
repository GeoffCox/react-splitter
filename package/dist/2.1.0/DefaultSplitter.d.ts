/// <reference types="react" />
import { RenderSplitterProps } from './RenderSplitterProps';
import './defaultSplitter.css';
declare type Props = RenderSplitterProps & {
    color?: string;
    hoverColor?: string;
    dragColor?: string;
};
/**
 * The default splitter which provides a thin line within a larger mouse hit area.
 */
export declare const DefaultSplitter: (props: Props) => JSX.Element;
export {};
