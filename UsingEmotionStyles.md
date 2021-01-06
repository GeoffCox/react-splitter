# This is a placeholder for using emotion rather than styled-components

## Split Styles

```tsx
const FullDiv = styled.div`
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

// To improve performance, the dynamic style feature of styled components puts the template row &columns into the style property.
const Root = styled.div(
  ({
    horizontal,
    primarySize,
    splitterSize,
    minPrimarySize,
    minSecondarySize,
  }: {
    horizontal: boolean;
    primarySize: string;
    splitterSize: string;
    minPrimarySize: string;
    minSecondarySize: string;
  }) => ({
    boxSizing: 'border-box',
    outline: 'none',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    display: 'grid',
    label: 'Split',
    gridTemplateAreas: horizontal ? '"primary" "split" "secondary"' : '"primary split secondary"',
    gridTemplateColumns: horizontal
      ? '1fr'
      : `minmax(${minPrimarySize},${primarySize}) ${splitterSize} minmax(${minSecondarySize}, 1fr)`,
    gridTemplateRows: horizontal
      ? `minmax(${minPrimarySize},${primarySize}) ${splitterSize} minmax(${minSecondarySize}, 1fr)`
      : '1fr',
  })
);

const Primary = styled.div(({ horizontal }: { horizontal: boolean }) => ({
  boxSizing: 'border-box',
  outline: 'none',
  overflow: 'hidden',
  height: horizontal ? 'auto' : '100%',
  width: horizontal ? '100%' : 'auto',
  gridArea: 'primary',
  label: 'SplitPrimary',
}));

const Splitter = styled.div(({ horizontal }: { horizontal: boolean }) => ({
  boxSizing: 'border-box',
  outline: 'none',
  overflow: 'hidden',
  height: horizontal ? 'auto' : '100%',
  width: horizontal ? '100%' : 'auto',
  cursor: horizontal ? 'row-resize' : 'col-resize',
  gridArea: 'split',
  background: 'transparent',
  userSelect: 'none',
  label: 'SplitSplitter',
}));

const Secondary = styled.div(({ horizontal }: { horizontal: boolean }) => ({
  boxSizing: 'border-box',
  outline: 'none',
  overflow: 'hidden',
  height: horizontal ? 'auto' : '100%',
  width: horizontal ? '100%' : 'auto',
  gridArea: 'secondary',
  label: 'SplitSecondary',
}));
```

## DefaultSplitter styles
```tsx
const HitArea = styled.div(({ horizontal, hoverColor }: { horizontal: boolean; hoverColor: string }) => ({
  boxSizing: 'border-box',
  outline: 'none',
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  cursor: horizontal ? 'row-resize' : 'col-resize',
  background: 'transparent',
  '%:hover .default-split-visual': {
    background: `${hoverColor}`,
  },
  userSelect: 'none',
}));

const getThinLineSize = (size: number) => `${size % 2 === 0 ? 2 : 3}px`;
const getCenteredMargin = (size: number) => `${Math.max(0, Math.floor(size / 2) - 1)}px`;

const Splitter = styled.div(
  ({ horizontal, splitterSize, color }: { horizontal: boolean; splitterSize: number; color: string }) => ({
    boxSizing: 'border-box',
    outline: 'none',
    overflow: 'hidden',
    height: horizontal ? getThinLineSize(splitterSize) : '100%',
    width: horizontal ? '100%' : getThinLineSize(splitterSize),
    marginLeft: horizontal ? '0' : getCenteredMargin(splitterSize),
    marginTop: horizontal ? getCenteredMargin(splitterSize) : '0',
    background: `${color}`,
  })
);
```