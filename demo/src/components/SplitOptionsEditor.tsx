import * as React from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { createSplitOptions } from '../model/appModel';
import { SplitDirection } from '../model/types';
import { EditorLayoutIcon, LeftRight5050LayoutIcon, QuadLayoutIcon, TopBottom5050LayoutIcon } from './LayoutIcons';

const fullDivCss = css`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
`;

const Root = styled.div`
  ${fullDivCss}
  display: grid;
  font-family: 'Consolas', 'Courier New', Courier, monospace;
  font-size: 10pt;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'options' 'content';
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-flow: rows;
  align-content: start;
  justify-content: start;
  margin: 20px;
  gap: 15px 10px;
`;

const PropertyLabel = styled.label`
  margin: 3px 0 0 0;
`;

const RadioArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 15px 0 0;
`;

const PropertyInput = styled.input`
  width: 150px;
`;

const SplitDirectionArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SplitDirectionRadio = styled.input`
  margin: 0 5px 0 0;
`;

const leftRightLabels = {
  initialPrimaryExtent: 'Initial Left Width',
  minPrimaryExtent: 'Minimum Left Width',
  minSecondaryExtent: 'Minimum Right Width',
  splitterExtent: 'Splitter Width',
};

const topBottomLabels = {
  initialPrimaryExtent: 'Initial Top Height',
  minPrimaryExtent: 'Minimum Top Height',
  minSecondaryExtent: 'Minimum Bottom Height',
  splitterExtent: 'Splitter Height',
};

export const SplitOptionsEditor = () => {
  const [options, setOptions] = useRecoilState(createSplitOptions);

  const onSplitDrectionChanged = (value: string) => {
    setOptions({
      ...options,
      splitDirection: value as SplitDirection,
    });
  };

  const onInitialPrimaryExtentChanged = (value: string) => {
    setOptions({
      ...options,
      initialPrimaryExtent: value,
    });
  };

  const onMinPrimaryExtentChanged = (value: string) => {
    setOptions({
      ...options,
      minPrimaryExtent: value,
    });
  };

  const onMinSecondaryExtentChanged = (value: string) => {
    setOptions({
      ...options,
      minSecondaryExtent: value,
    });
  };

  const onSplitterExtentChanged = (value: string) => {
    setOptions({
      ...options,
      splitterExtent: value,
    });
  };

  const onCustomSplitterChanged = (value: boolean) => {
    setOptions({
      ...options,
      splitterType: value ? 'striped' : 'default',
    });
  };

  const {
    splitDirection,
    initialPrimaryExtent,
    minPrimaryExtent,
    minSecondaryExtent,
    splitterExtent,
    splitterType,
  } = options;

  const labels = splitDirection === 'TB' ? topBottomLabels : leftRightLabels;

  return (
    <Root>
      <LeftRight5050LayoutIcon />
      <TopBottom5050LayoutIcon />
      <QuadLayoutIcon />
      <EditorLayoutIcon />
      <PropertyGrid>
        <PropertyLabel>Split Direction</PropertyLabel>
        <SplitDirectionArea>
          <RadioArea>
            <SplitDirectionRadio
              name="splitDirection"
              type="radio"
              id="LeftRightRadio"
              value="LR"
              checked={splitDirection === 'LR'}
              onChange={(e) => onSplitDrectionChanged(e.target.value)}
            />
            <label htmlFor="LeftRightRadio">Left|Right</label>
          </RadioArea>
          <RadioArea>
            <SplitDirectionRadio
              name="splitDirection"
              type="radio"
              id="TopBottomRadio"
              value="TB"
              checked={splitDirection === 'TB'}
              onChange={(e) => onSplitDrectionChanged(e.target.value)}
            />
            <label htmlFor="TopBottomRadio">Top/Bottom</label>
          </RadioArea>
        </SplitDirectionArea>
        <PropertyLabel htmlFor="InitialPrimary">{labels.initialPrimaryExtent}</PropertyLabel>
        <PropertyInput
          id="InitialPrimary"
          type="text"
          value={initialPrimaryExtent}
          onChange={(e) => onInitialPrimaryExtentChanged(e.target.value)}
        />
        <PropertyLabel htmlFor="MinPrimary">{labels.minPrimaryExtent}</PropertyLabel>
        <PropertyInput
          id="MinPrimary"
          type="text"
          value={minPrimaryExtent}
          onChange={(e) => onMinPrimaryExtentChanged(e.target.value)}
        />
        <PropertyLabel htmlFor="MinSecondary">{labels.minSecondaryExtent}</PropertyLabel>
        <PropertyInput
          id="MinSecondary"
          type="text"
          value={minSecondaryExtent}
          onChange={(e) => onMinSecondaryExtentChanged(e.target.value)}
        />
        <PropertyLabel htmlFor="SplitterExtent">{labels.splitterExtent}</PropertyLabel>
        <PropertyInput
          id="SplitterExtent"
          type="text"
          value={splitterExtent}
          onChange={(e) => onSplitterExtentChanged(e.target.value)}
        />
        <PropertyLabel>Splitter Type</PropertyLabel>
        <RadioArea>
          <input
            id="CustomSplitter"
            type="checkbox"
            checked={splitterType === 'striped'}
            onChange={(e) => onCustomSplitterChanged(e.target.checked)}
          />
          <label htmlFor="CustomSplitter">Custom</label>
        </RadioArea>
      </PropertyGrid>
    </Root>
  );
};
