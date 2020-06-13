# @geoffcox/react-splitter
A resizable splitter for React that the grid templates in CSS rather than complex JavasScript resizing logic.

# Installation
```npm install --save @geoffcox/react-splitter```

# Why does this yet-another-splitter exist?
There are several splitter components available on NPM - react-split-pane, react-split, split-panel-react. There are some custom implementations and others are wrappers around mature JS like split.js. Most can be made to work OK. Although I've tried many of them many times, I always hit weird boundary cases:

- Splitters would end up off-screen never to be seen again.
- Initial sizes wouldn't allow relative percentages, causing me to write a whole bunch of math logic.
- They wouldn't react properly to window resizing.
- Resizing would suddenly stop working or a math violation would crash my app. 
- Manual setting of pixel widths with absolute positioning would break the relative or flex layout of my components. 
- A bunch of custom CSS is required at the root of my application causing me to have to put additional divs or CSS around my components.
- Libraries would be hostile to Typescript or use an ancient module loader.

When I found out how well CSS grid-templates work and that CSS-in-JS libraries were capable of handling rapidly changing dynamic styles, I decided to create this splitter library.

# Usage

There are two components LeftRightSplit and TopBottomSplit. These will render the first and second child with a splitter between them. Any additional children are ignored and not rendered.

The splitter itself cannot be sized beyond the bounds of the screen, so the maximum size of a pane is the container size minus the splitter size.

These controls use the CSS grid-template to provide the visual resizing. The left and top grid areas are sized as the user drags the splitter. This library leverages the efficient dynamic style updates from styled-components to allow for rapid style updates.

Recommended: The parent element of LeftRightSplit or TopBottomSplit should not be auto-sized based on its children. Consider a 1fr grid, a flex box, or a fixed size parent. See the demo app for an example of this.

## Basic Left/Right and Top/Bottom splits
```tsx
    <LeftRightSplit>
        <div>This will go on the left</div>
        <div>This will go on the right</div>
    </LeftRightSplit>
```

```tsx
    <TopBottomSplit>
        <div>This will go on the top</div>
        <div>This will go on the bottom</div>
    </TopBottomSplit>
```

## Nested splits

```tsx
    <LeftRightSplit>
        <div>This will go on the left</div>
        <TopBottomSplit>
            <div>This will go on the right-top</div>
            <div>This will go on the right-bottom</div>
        </TopBottomSplit>
    </LeftRightSplit>
```
## Initial pane size

The initial left width or top height can be:
- a percentage: "60%"
- a pixel measurement: "150px"
- a number of pixels: 150

```tsx
    <LeftRightSplit initialLeftGridWidth="70%">
        <div>This will go on the left</div>
        <TopBottomSplit initialTopGridHeight="200px">
            <div>This will go on the right-top</div>
            <div>This will go on the right-bottom</div>
        </TopBottomSplit>
    </LeftRightSplit>
```
## Minimum pane sizes

The minimum sizes can be set for left and/or right and top and/or bottom.  These are always a number of pixels.

```tsx
    <LeftRightSplit inLeftPixels="50" minRightPixels="100">
        <div>This will go on the left</div>
        <TopBottomSplit inTopPixels="160" minBottomPixels="100">
            <div>This will go on the right-top</div>
            <div>This will go on the right-bottom</div>
        </TopBottomSplit>
    </LeftRightSplit>
```

Q: What happens if there isn't enough room for both minimums? 
A: The secondary pane (right or bottom) minimum is compromised. The sizing algorithm calculates the secondary pane (right or bottom) to meet the minimum, then calculates the primary pane (left or top) to meet the minimum, then ensures that the two sizes fit within the bounds of the parent.

# Known limitations

These are several limitations of this initial release.

- Cannot customize the splitter. The splitter is 5px and has a silver background. The splitter needs a class name applied for CSS control from the caller container and there needs to be an optional renderProps callback.
- No keyboard control of splitter. The splitter can only be controlled with the mouse.
- The splitter does not support reset. The splitter does not yet recognize a double-click and move back to its initial position.
- Resizing is immediate as the user drags the splitter.  The resize needs to be debounced to ensure visual update performance.  This should be controllable through a property.
- No callbacks for monitoring the split or pane resizing.  For now, a workaround is to use something like react-measure to wrap children and observe sizing changes.

If you overcome these limitations in your own code, pull requests are appreciated. :-)

# Change History
## 1.0.0 - First publication of the LeftRightSplit and TopBottomSplit
## 1.0.1 - Bug fixes
    - CSS was incorrect on the splitter preventing hover state
    - Peer dependencies should not have included styled-components nor react-measure as npm no longer auto-installs peer dependencies.
## 1.0.2 - Bug fixes
    - Rollup config was incorrect causing 1.0.1 to not be published correctly.