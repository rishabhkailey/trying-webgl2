export default class WebGLAnimation {

  constructor(callback, fps) {

    // intial values
    this.isActive = false;
    this.run = null;
    this.lastFrameTime = null;
    this.requiredFPS = fps === 0 ? 0 : fps || 120;
    this.actualFPS = 0;
    this.callback = callback;

    if (this.requiredFPS > 0) {

      // fpsInterval in ms
      this.fpsInterval = 1000 / this.requiredFPS;
      // will be used in callback function as well so that we can increase the position accordingly (position will be changed according to time not fps)

      this.run = (currentFrameTime) => {

        let deltaTime = currentFrameTime - this.lastFrameTime;

        if (deltaTime >= this.fpsInterval) {
          this.actualFPS = Math.floor(1 / (deltaTime));
          this.lastFrameTime = currentFrameTime;
          this.callback(deltaTime);
        }

        // recurssion
        if (this.isActive)
          window.requestAnimationFrame(this.run);

      }
    } else if (this.requiredFPS === 0) {
      this.callback();
    }

  }

  startAnimatation = () => {
    this.isActive = true;
    this.lastFrameTime = performance.now();
    window.requestAnimationFrame(this.run);
  }

  stopAnimation = () => {
    this.isActive = false;
  }

}