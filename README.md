# So Puzzled
A little puzzle game for practice, written in React and jQueryUI 

---

## How to run

 - clone the repo
 - cd into the **so puzzled** folder
 - run `npm install` (needs NodeJS and Bower installed)
 - run `npm start`
 - open a web-browser and navigate to ´localhost:3000´

OR ..

go to http://humancatfood.github.io/so-puzzled/


## TODOs:

- use getBoundingBox functions to figure out empty stage spots and populate them by shuffling pieces there
  - account for piece sizes
  - use poisson disc sampling to find organic spots on stage
  - incrementally tolerate more and more overlap between staged pieces until there's a fit

- fix preview offset while dragging

- randomize allocation and of holes and noses with 2d noise

- fix repainting pieces. Currently noses are cut off when dropping a piece into a slot for the first time

- add animation when pieces are moved to the stage

