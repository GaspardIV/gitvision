# GitVision

GitVision is a groundbreaking web tool that transforms Git repositories into immersive 3D, Virtual, and Augmented reality visualizations. It provides a novel approach to understanding Git's version control system, making it more intuitive, efficient, and engaging.

## DEMO
Experience the live demo of GitVision at [gitvis.web.app](https://gitvis.web.app).

## Purpose
The immersive visualization system for version control repositories aims to provide a unique and comprehensive view of the repository's evolution over time. 

The main idea of Visualization is simultaneous display of chronological order and topological order along with a graph force representation, to offer insights into the branching strategies, commit history, and overall development flow.

## Detailed explanation 
 - X-Axis: Index sorted by date multiplied by constant.
 - Y-Axis: Index sorted topologically multiplied by constant. Greater height differences indicate more changes or activities between commits.
 - Z-Axis: [force directed](https://en.wikipedia.org/wiki/Force-directed_graph_drawing)
    - Straight lines indicate fewer changes; zigzags represent a burst of changes in a short period.
    - Effort to minimize intersections for clearer visualization.
    - Ability to focus or disperse branches towards the center.

## Visualize own repository
You can generate visualization data from your own Git repositories using our Python script. For details, check the README.md in the [tools](https://github.com/GaspardIV/gitvision/blob/main/tool/README.md) directory.

## Project Setup

Follow the steps below to get started with development.

```sh
git clone [...]
cd gitvision/gitvisionwebapp
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
