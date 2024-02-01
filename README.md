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

### Comparison - Leaflet example
![gitvis (4)](https://github.com/GaspardIV/gitvision/assets/30477366/54b458e5-15ec-45be-805b-d8dcf97631d3)
![gitvis (7)](https://github.com/GaspardIV/gitvision/assets/30477366/29a631b9-1419-4233-acd2-411df7d66d59)
![gitvis (8)](https://github.com/GaspardIV/gitvision/assets/30477366/a4f5641e-4548-490e-90f7-3ddd41ddb6ba)
![gitvis (9)](https://github.com/GaspardIV/gitvision/assets/30477366/6f5031ca-e291-42a5-84a6-33951d7e453d)
![gitvis (10)](https://github.com/GaspardIV/gitvision/assets/30477366/09590aba-d595-4742-95c3-dea0865bdcae)
![gitvis (11)](https://github.com/GaspardIV/gitvision/assets/30477366/3d46fb29-d848-4aec-89fa-12bdbc731ef1)
![gitvis (12)](https://github.com/GaspardIV/gitvision/assets/30477366/0c1f4d24-a6ef-42fe-9062-289c4827429a)
![gitvis (13)](https://github.com/GaspardIV/gitvision/assets/30477366/f7049f0e-316a-4133-9408-ab94c45ea96c)
![gitvis (14)](https://github.com/GaspardIV/gitvision/assets/30477366/e0ac32f4-59e5-40c6-9ee4-651c071a7c9e)
![gitvis (15)](https://github.com/GaspardIV/gitvision/assets/30477366/99ace93b-44ea-4c89-99ef-6ad42a7e5fdb)
![gitvis (16)](https://github.com/GaspardIV/gitvision/assets/30477366/abcb3b21-a60e-4455-8827-e5be793c69be)
![gitvis (17)](https://github.com/GaspardIV/gitvision/assets/30477366/f3b48bf1-c652-48be-ae19-cb17319ea305)
![unnamed](https://github.com/GaspardIV/gitvision/assets/30477366/fb819351-43a4-45b4-b9b0-66daba7e7b3d)


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
