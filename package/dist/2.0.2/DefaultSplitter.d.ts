/// <reference types="react" />
import { RenderSplitterProps } from './RenderSplitterProps';
declare type Props = RenderSplitterProps & {
    color: string;
    hoverColor: string;
};
/**
 * The default splitter which provides a thin line within a possibly larger mouse hit area.
 * @param props
 */
export declare const DefaultSplitter: (props: Props) => JSX.Element;
export {};
