# @geoffcox/react-splitter

A resizable splitter for React that leverages CSS display:grid

[Live Demo](https://geoffcox.github.io/react-splitter-demo/index.html)

## Features
- Vertical (left|right) and Horizontal (top/bottom) splitting
- Set initial split size
- Reset to initial split with double-click
- Minimum pane sizes
- Sizes can be any CSS unit (e.g. px, %, fr, em, pt, cm, mm)
- Nested splits with correct resizing
- Customize the splitter size, colors, or render it yourself.

## Technology
- This splitter is built using React and Typescript.
- CSS grid combined with a simple percentage split system provides accurate and responsive resizing.
- Styled components provide high performance using dynamic styles.

# Installation

```
npm install --save @geoffcox/react-splitter
```
# Usage

To create vertical or horizontal splits you only need the `Split` component.

## Vertical Split
The default creates a left|right split down the middle, no minimum pane sizes, and renders the default splitter.

```tsx
<Split>
  <div>This is the left pane.</div>
  <div>This is the right pane.<div>
</Split>
```

## Horizontal Split
Add the `horizontal` attribute to split top/bottom.

```tsx
<Split horizontal>
  <div>This is the top pane.</div>
  <div>This is the bottom pane.<div>
</Split>
```

## Set the initial split size
Add the `initialPrimarySize` property to control where the initial split occurs.

```tsx
<Split initialPrimarySize='30%'>
  <div>Primary pane</div>
  <div>Secondary pane<div>
</Split>
```

To support double-clicking to reset back to the initial size, add the `resetOnDoubleClick` property.

```tsx
<Split initialPrimarySize='30%' resetOnDoubleClick>
  <div>Primary pane</div>
  <div>Secondary pane<div>
</Split>
```

## Nest Splits
Just nest Split componets to create whatever layout you like.
Here is an example of a common layout for a main, detail, and output view.

```tsx
<Split initialPrimarySize='30%'>
  <div>This is the left pane.</div>
  <Split horizontal initialPrimarySize='60%'>
    <div>This is the right-top pane.</div>
    <div>This is the right-bottom pane.</div>
  </Split>
</Split>
```
## Constrain minimum pane sizes
You can prevent either pane from becoming too small using the `minPrimarySize` and `minSecondarySize` properties.
For vertical splits, primary is the left pane and secondary is the right pane.
For horizontal splits, primary is the top pane and secondary is the bottom pane.

```tsx
<Split minPrimarySize='250px' minSecondarySize='15%'>
  <div>This pane won't get smaller than 250 pixels.</div>
  <div>This pane won't get any smaller than 15% of the overall size of the split control./<div>
</Split>
```

## Customize the splitter size
You can set the size of the hit area (where the user can click to start draggin the splitter) with the `splitterSize` property.

```tsx
<Split splitterSize='10px'>
  <div>Primary pane</div>
  <div>Secondary pane<div>
</Split>
```
## Customize the splitter colors
You can change the colors of the default splitter with the `defaultSplitterColors` property.

```tsx
const colors = {
  color: 'red',
  hover: '#00FF00',
  drag: 'blue'
};

<Split defaultSplitterColors={colors}>
  <div>Primary pane</div>
  <div>Secondary pane<div>
</Split>
```
## Custom render the splitter
You can render your own splitter by passing a callback to the `renderSplitter` property.

```tsx
const renderSplitter = (props: RenderSplitterProps) => {
  return <div>Your splitter code goes here.</div>
};

<Split renderSplitter={renderSplitter}>
  <div>Primary pane</div>
  <div>Secondary pane<div>
</Split>
```

The callback receives the `RenderSplitterProps` to let you know the current size of the splitter, if the split is horizontal, and if the splitter is currently being dragged.

```ts
export type RenderSplitterProps = {
  pixelSize: number;
  horizontal: boolean;
  dragging: boolean;
};
```
# Integrating into a web application

If you are using a style framework like Fluent, Material UI, or Bootstrap then your root div will likely have CSS styles applied that help this splitter work correctly.
If you have no root stylesheet, you might have problems with vertical scrolling.

Here are some recommended CSS properties for your top-level divs if you are building a single-page application.  In this case #app is the mounting point for React.Render.  You can see this approach used in the demo application.

```css
body {
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

body,
div {
  box-sizing: border-box;
}

#app {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
}
```
# Known limitations

These are several limitations of the current release.

- No keyboard control of splitter. The splitter can only be controlled with the mouse.
- Resizing is immediate as the user drags the splitter. The resize may need to be debounced to correct visual update performance problems.
- No callbacks for monitoring the split or pane resizing. For now, a workaround is to use something like react-measure to wrap children and observe sizing changes.

If you overcome these limitations in your own code, pull requests are appreciated. :-)

# Change History

## 1.0.0 - First project publication

## 1.0.1 - Bug fixes
- CSS was incorrect on the splitter preventing hover state
- Peer dependencies should not have included styled-components nor react-measure as npm no longer auto-installs peer dependencies.

## 1.0.2 - Bug fixes
- Rollup config was incorrect causing 1.0.1 to not be published correctly.

## 1.0.3 - Measurement reaction bug fix
- Resize of split was not reacting to overall area decreasing where the splitter gets hidden

## 1.0.4 - Custom splitter rendering
- Added optional splitterWidth/splitterHeight to props to allow caller to control splitter size
- Added option renderSplitter function to allow caller to render a custom splitter
- Updated default splitter to be thin line with same 5px hit area
- Updated demo to optionally show custom rendered splitter
- Fixed bug with cursor on top/bottom splitter

## 2.0.0 - Overhaul
- Collapsed LeftRightSplit and TopBottomSplit into a single Split component
- Leveraged minmax to remove the need for any complex math
- Changed mouse events to pointer events for improved responsiveness
- Fixed issues with dragging when browser is zoomed in
- Added support for rest on double-click
- Added support for default splitter colors
- Passed key properties to splitter render props
- Improved default splitter layout
- Added customization control to the demo
- Moved default splitter to separate module
