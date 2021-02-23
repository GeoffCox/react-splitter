import * as React from 'react';
import styled from 'styled-components';
import { RenderSplitterProps } from './RenderSplitterProps';

type Props = RenderSplitterProps & {
  color: string;
  hoverColor: string;
};

const HitArea = styled.div.attrs(({ horizontal, hoverColor }: { horizontal: boolean; hoverColor: string }): any => ({
  cursor: horizontal ? 'row-resize' : 'col-resize',
  hoverColor,
}))`
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  height: 100%;
  width: 100%;
  cursor: ${(props) => props.cursor};
  background: transparent;
  &:hover .default-split-visual {
    background: ${(props) => props.hoverColor};
  }
  user-select: none;
`;

const getThinLineSize = (size: number) => `${size % 2 === 0 ? 2 : 3}px`;
const getCenteredMargin = (size: number) => `${Math.max(0, Math.floor(size / 2) - 1)}px`;

const Splitter = styled.div.attrs(
  ({ horizontal, splitterSize, color }: { horizontal: boolean; splitterSize: number; color: string }): any => ({
    color,
    height: horizontal ? getThinLineSize(splitterSize) : '100%',
    width: horizontal ? '100%' : getThinLineSize(splitterSize),
    marginLeft: horizontal ? '0' : getCenteredMargin(splitterSize),
    marginTop: horizontal ? getCenteredMargin(splitterSize) : '0',
  })
)`
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin-left: ${(props) => props.marginLeft};
  margin-top: ${(props) => props.marginTop};
  background: ${(props) => props.color};
`;

/**
 * The default splitter which provides a thin line within a possibly larger mouse hit area.
 * @param props
 */
export const DefaultSplitter = (props: Props) => {
  const { horizontal, pixelSize, color, hoverColor } = props;

  return (
    <HitArea horizontal={horizontal} hoverColor={hoverColor}>
      <Splitter horizontal={horizontal} splitterSize={pixelSize} color={color} className="default-split-visual" />
    </HitArea>
  );
};
