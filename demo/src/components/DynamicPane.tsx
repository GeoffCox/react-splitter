import * as React from 'react';
import { LeftRightSplit, TopBottomSplit } from '@geoffcox/react-splitter';
import styled, { css } from 'styled-components';

const fullDivCss = css`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
`;

const Root = styled.div`
  ${fullDivCss}
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'content';
`;

const DemoActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  outline: none;
  overflow: hidden;
  padding: 20px;
  background: aliceblue;
  margin: auto auto;
`;

const DemoAction = styled.button`
  min-width: 150px;
  min-height: 25px;
  padding: 5px;
  margin: 5px;
`;

export const DynamicPane = () => {
  const [split, setSplit] = React.useState<'LR' | 'TB' | undefined>(undefined);

  const renderActions = () => {
    return (
      <DemoActions>
        <DemoAction onClick={() => setSplit('LR')}>Left | Right</DemoAction>
        <DemoAction onClick={() => setSplit('TB')}>Top / Bottom</DemoAction>
      </DemoActions>
    );
  };

  const renderLR = () => {
    return (
      <LeftRightSplit initialLeftGridWidth='50%'>
        <DynamicPane />
        <DynamicPane />
      </LeftRightSplit>
    );
  };

  const renderTB = () => {
    return (
      <TopBottomSplit initialTopGridHeight='50%'>
        <DynamicPane />
        <DynamicPane />
      </TopBottomSplit>
    );
  };

  const renderLayout = () => {
    switch (split) {
      case 'TB':
        return renderTB();
      case 'LR':
        return renderLR();
      default:
        return renderActions();
    }
  };

  return <Root>{renderLayout()}</Root>;
};
