import * as React from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { createSplitOptions } from '../model/appModel';
import { SplitterType } from '../model/types';
import { LeftRightLayoutIcon, TopBottomLayoutIcon } from './LayoutIcons';

const fullDivCss = css`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
`;

const Root = styled.div`
  ${fullDivCss}
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'options' 'content';
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(175px, auto) auto;
  grid-auto-flow: row;
  align-content: start;
  justify-content: start;
  margin: 20px;
  gap: 15px 10px;
`;

const PropertyLabel = styled.label`
  margin: 3px 0 0 0;
`;

const RadioOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RadioOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 15px 0 0;
`;

const PropertyInput = styled.input`
  width: 150px;
`;

const SplitDirectionRadio = styled.input`
  margin: 0 5px 0 0;
`;

const SplitDirectionIcon = styled.div`
  width: 85px;
  height: 50px;
`;

/**
 * A form to allows the user to set the different options for new splits.
 */
export const SplitOptionsEditor = () => {
  const [options, setOptions] = useRecoilState(createSplitOptions);

  const onHorizontalChanged = (horizontal: boolean) => {
    setOptions({
      ...options,
      horizontal,
    });
  };

  const onInitialPrimarySizeChanged = (initialPrimarySize: string) => {
    setOptions({
      ...options,
      initialPrimarySize,
    });
  };

  const onMinPrimarySizeChanged = (minPrimarySize: string) => {
    setOptions({
      ...options,
      minPrimarySize,
    });
  };

  const onMinSecondarySizeChanged = (minSecondarySize: string) => {
    setOptions({
      ...options,
      minSecondarySize,
    });
  };

  const onSplitterSizeChanged = (splitterSize: string) => {
    setOptions({
      ...options,
      splitterSize,
    });
  };

  const onSplitterTypeChanged = (splitterType: string) => {
    setOptions({
      ...options,
      splitterType: splitterType as SplitterType,
    });
  };

  const { horizontal, initialPrimarySize, minPrimarySize, minSecondarySize, splitterSize, splitterType } = options;

  return (
    <Root>
      <PropertyGrid>
        <PropertyLabel>Split Direction</PropertyLabel>
        <RadioOptions>
          <RadioOption>
            <SplitDirectionRadio
              name="splitDirection"
              type="radio"
              id="LeftRightRadio"
              value="LR"
              checked={!horizontal}
              onChange={(e) => onHorizontalChanged(!e.target.checked)}
            />
            <label htmlFor="LeftRightRadio">
              <SplitDirectionIcon>
                <LeftRightLayoutIcon />
              </SplitDirectionIcon>
            </label>
          </RadioOption>
          <RadioOption>
            <SplitDirectionRadio
              name="splitDirection"
              type="radio"
              id="TopBottomRadio"
              value="TB"
              checked={horizontal}
              onChange={(e) => onHorizontalChanged(e.target.checked)}
            />
            <label htmlFor="TopBottomRadio">
              <SplitDirectionIcon>
                <TopBottomLayoutIcon />
              </SplitDirectionIcon>
            </label>
          </RadioOption>
        </RadioOptions>
        <PropertyLabel htmlFor="InitialPrimarySize">Initial Primary Size</PropertyLabel>
        <PropertyInput
          id="InitialPrimarySize"
          type="text"
          value={initialPrimarySize}
          onChange={(e) => onInitialPrimarySizeChanged(e.target.value)}
        />
        <PropertyLabel htmlFor="MinPrimarySize">Min Primary Size</PropertyLabel>
        <PropertyInput
          id="MinPrimarySize"
          type="text"
          value={minPrimarySize}
          onChange={(e) => onMinPrimarySizeChanged(e.target.value)}
        />
        <PropertyLabel htmlFor="MinSecondarySize">Min Secondary Size</PropertyLabel>
        <PropertyInput
          id="MinSecondarySize"
          type="text"
          value={minSecondarySize}
          onChange={(e) => onMinSecondarySizeChanged(e.target.value)}
        />
        <PropertyLabel htmlFor="SplitterSize">Splitter Size</PropertyLabel>
        <PropertyInput
          id="SplitterSize"
          type="text"
          value={splitterSize}
          onChange={(e) => onSplitterSizeChanged(e.target.value)}
        />
        <PropertyLabel>Splitter Type</PropertyLabel>
        <RadioOptions>
          <RadioOption>
            <input
              id="DefaultSplitter"
              type="radio"
              value={'default'}
              checked={splitterType === 'default'}
              onChange={(e) => onSplitterTypeChanged(e.target.value)}
            />
            <label htmlFor="DefaultSplitter">Default</label>
          </RadioOption>
          <RadioOption>
            <input
              id="SolidSplitter"
              type="radio"
              value={'solid'}
              checked={splitterType === 'solid'}
              onChange={(e) => onSplitterTypeChanged(e.target.value)}
            />
            <label htmlFor="SolidSplitter">Solid</label>
          </RadioOption>
          <RadioOption>
            <input
              id="StripedSplitter"
              type="radio"
              value={'striped'}
              checked={splitterType === 'striped'}
              onChange={(e) => onSplitterTypeChanged(e.target.value)}
            />
            <label htmlFor="StripedSplitter">Striped</label>
          </RadioOption>
        </RadioOptions>
      </PropertyGrid>
    </Root>
  );
};
