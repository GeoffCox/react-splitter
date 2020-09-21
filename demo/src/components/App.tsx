import * as React from "react";
import styled, { css } from "styled-components";
import { DynamicPane } from "./DynamicPane";

const fullDivCss = css`
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
`;

const Root = styled.div`
  ${fullDivCss}
  display: grid;
  font-family: "Consolas", "Courier New", Courier, monospace;
  font-size: 10pt;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "header" "content";
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

export const App = () => {
  return (
    <Root>
      <Header>
        This demonstrates the @geoffcox/react-splitter. Click a button to split
        a view left | right or top / bottom.
      </Header>
      <Content>
        <DynamicPane />
      </Content>
    </Root>
  );
};
