import * as React from 'react';
import styled, { css } from 'styled-components';
import { DynamicPane } from './DynamicPane';
import { SplitOptionsEditor } from './SplitOptionsEditor';

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
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'content' 'footer';
`;

const Header = styled.div`
  font-size: 14pt;
  width: 100%;
  outline: none;
  overflow: hidden;
  grid-area: header;
  padding: 10px;
  background: #222;
  color: #ddd;
`;

const Content = styled.div`
  width: 100%;
  outline: none;
  overflow: hidden;
  grid-area: content;
`;

const Footer = styled.div`
  width: 100%;
  outline: none;
  overflow: hidden;
  grid-area: footer;
  background: #222;
  color: #ddd;
`;

export const Main = () => {
  return (
    <Root>
      <Header>@geoffcox/react-splitter demo</Header>
      <Content>
        <DynamicPane id="root" />
      </Content>
      <Footer>
        <SplitOptionsEditor />
      </Footer>
    </Root>
  );
};
