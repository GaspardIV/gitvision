# GitVision

GitVision is a groundbreaking web tool that transforms Git repositories into immersive 3D, Virtual, and Augmented reality visualizations. It provides a novel approach to understanding Git's version control system, making it more intuitive, efficient, and engaging.

## DEMO
Experience the live demo of GitVision at [gitvis.web.app](https://gitvis.web.app).

## Purpose
The immersive visualization system for version control repositories aims to provide a unique and comprehensive view of the repository's evolution over time. 

The main idea of visualization is simultaneous display of chronological order and topological order along with a graph force representation, to offer insights into the branching strategies, commit history, and overall development flow.

## Visualisation Explanation 
 - X-Axis: Index sorted by date multiplied by constant.
 - Y-Axis: Index sorted topologically multiplied by constant. Greater height differences indicate more changes or activities between commits.
 - Z-Axis: [force directed](https://en.wikipedia.org/wiki/Force-directed_graph_drawing)
    - Effort to minimize intersections for clearer visualization.
    - Straight lines indicate fewer changes; zigzags represent a burst of changes in a short period.
    - Ability to focus or disperse branches towards the center.

Below visualization explanation on examples.
### Linux
![gitvis](https://github.com/GaspardIV/gitvision/assets/30477366/7c0f7e96-f74c-4772-b60f-b30b8f17dc7d)
  <img src="https://github.com/GaspardIV/gitvision/assets/30477366/e651628f-a869-46ab-9275-e7bccd4845fb" width="33%">
<img src="https://github.com/GaspardIV/gitvision/assets/30477366/dc9bd8f4-9ef2-44fd-9a6d-82bd006cf223" width="33%"><img src="https://github.com/GaspardIV/gitvision/assets/30477366/646fdea4-08c2-4ec9-9abd-956c49d51b55" width="33%">

### tensorflow
![gitvis (3)](https://github.com/GaspardIV/gitvision/assets/30477366/2f6222dd-42e2-4451-b9be-5d1a3c347fe0)

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
