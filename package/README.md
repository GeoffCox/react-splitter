# @geoffcox/react-splitter

A resizable splitter for React that leverages CSS display:grid

[Live Demo](https://geoffcox.github.io/react-splitter-demo/index.html)

## Overview
See the [../Readme.md](../README.md) for features, version history, etc.

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
  <div>This is the right pane.</div>
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

## Monitor changes
You can use event callbacks to monitor changes to the primary size and the measured sizes. The primary size is a CSS unit string (percentage or initial size). The measured sizes are pixels sizes.

```tsx
const onSplitChanged = (primarySize: string) => {
  console.log(`The split is: ${primarySize}`);
};

const onMeasuredSizesChanged = (sizes: SplitMeasuredPixelSizes) => {
  console.log(`The primary pane is: ${sizes.primary}px`);
  console.log(`The splitter is: ${sizes.splitter}px`);
  console.log(`The secondary pane is: ${sizes.secondary}px`);
};

<Split onSplitChanged={onSplitChanged} onMeasuredSizesChanged={onMeasuredSizesChanged}>
  <div>Primary pane</div>
  <div>Secondary pane<div>
</Split>
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
