import * as THREE from "three";

import App from "./AppStandalone";

export default class Renderer {
  constructor(app) {
    this.app = app ?? new App();
    this.canvas = this.app.canvas;
    this.sizes = this.app.sizes;
    this.scene = this.app.scene;
    this.camera = this.app.camera;

    // Setup
    this.clearColor = 0x000000;
    this.pixelRatio = Math.min(this.sizes.pixelRatio, 2);
    this.setInstance();
  }

  setInstance = () => {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // preserveDrawingBuffer: true
      // antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.pixelRatio);
    this.instance.setClearColor(this.clearColor);
  };

  resize = () => {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.pixelRatio);
  };

  update = () => {
    this.instance.render(this.scene, this.camera.instance);
  };
}
