# @geoffcox/react-splitter (Collapsible edition)

A resizable and collapsible splitter for React that leverages CSS display:grid

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

# Installation and Usage
See [package/Readme.md](package/README.md)

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

## 2.0.0 - Overhauled
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

## 2.0.1 - Reduced size
- Removed map files from distribution

## 2.0.2 - Provided events
- Added onSplitChanged to provide the primarySize as the splitter changes.
- Added onMeasuredSizesChanged to provide content, left pane, splitter, and right pane pixels sizes as the splitter changes.

## 2.0.3 - Bug fixes
- Export RenderSplitterProps from package
- Export DefaultSplitter from package

## 2.1.0 - Remove styled-components dependency
- Updated the Split and DefaultSplitter React components to use CSS variables rather than take a dependency on styled-components
- Switched from rollup to webpack to support CSS-in-JS without requiring styled-components
- Updated all HTML elements in Split with semantic class names.

## 2.1.1 - Fix issue with horizontal prop changes
- Thanks to Quang Ngo for finding this issue and following up with me to get it fixed!
- Updated Split to track dimensions and properly update if the horizontal prop changes.
- Removed debounce. Since moving to CSS and CSS vars, it is no longer neccessary.
