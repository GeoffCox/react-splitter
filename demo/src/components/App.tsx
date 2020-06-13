import * as React from 'react';
import styled, { css } from 'styled-components';
import { DynamicPane } from './DynamicPane';

const fullDivCss = css`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
`;

const Root = styled.div`
  ${fullDivCss}
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'content';
`;

const Header = styled.div`
  width: 100%;
  outline: none;
  overflow: hidden;
  grid-area: header;
  font-family: 'Consolas';
  padding: 10px;
`;

const Content = styled.div`
  width: 100%;
  outline: none;
  overflow: hidden;
  grid-area: content;
`;

export const App = () => {
  return (
    <Root>
      <Header>This demonstrates the @geoffcox/react-splitter. Click a button to split a view left | right or top / bottom.</Header>
      <Content>
        <DynamicPane />
      </Content>
    </Root>
  );
};
