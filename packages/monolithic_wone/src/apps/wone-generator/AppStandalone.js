import * as THREE from "three";
//import Stats from 'stats-js'

import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Mode from "./mode/Mode";
import Resources from "./utils/Resources";
import sources from "./sources";
import JSControls from "./utils/controls/JSControls";

let instance = null;

export default class App {
  constructor(canvas) {
    if (instance) {
      // eslint-disable-next-line no-constructor-return
      return instance;
    }
    instance = this;

    // // Stats
    // this.stats = new Stats()
    // this.stats.domElement.style.bottom = 0
    // this.stats.domElement.style.top = 'auto'
    // document.body.appendChild(this.stats.dom)

    this.export = {
      recording: {
        still: false,
        animation: false,
      },
      recordStartTime: 0,
    };

    // Setup
    this.canvas = canvas;
    this.sizes = new Sizes(this);
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.controls = new JSControls(this);

    this.setMode();

    // Add events
    this.sizes.on("resize", this.resize);
    this.time.on("tick", this.update);

    this.resources.on("ready", this.setMode);
  }

  setMode = () => {
    if (!this.mode) this.mode = new Mode(this);
    this.mode.setMode();
  };

  resize = () => {
    this.camera.resize();
    this.renderer.resize();
    if (this.mode && this.mode.resize) this.mode.resize();

    // Update logo plane size
    if (this.logoMesh) {
      this.setLogoPosition();
    }
  };

  animate = () => {
    if (this.mode.mode.animate) {
      this.mode.mode.animate();

      if (this.mode.activeMode.name !== "Text") {
        if (
          this.mode.textMode &&
          this.controls.parameters.buttons.textPreview.value
        ) {
          if (this.mode.textMode.animate) this.mode.textMode.animate();
        }
      }
    } else return;

    const duration = this.controls.parameters.export.duration.value;

    // Preview
    // if (
    //   this.controls.parameters.buttons.exportPreview.value ||
    //   this.export.recording.animation
    // ) {
    //   const button = this.export.recording.animation
    //     ? this.controls.parameters.buttons.export.controller
    //     : this.controls.parameters.buttons.exportPreview.controller;
    //   const t =
    //     ((this.time.elapsedTime - this.export.recordStartTime) % duration) /
    //     duration;
    //   const colorBg = "#282826";
    //   const colorProgress = "#136DEB";
    //   button.style.background = `linear-gradient(to right, ${colorProgress} ${
    //     t * 100
    //   }%, ${colorBg} ${t * 100}%)`;
    //   button.style.paddingBottom = "15px";

    //   if (this.export.recording.animation) button.value = "Exporting";
    //   button.parentNode.classList.add("progress");

    //   if (this.time.elapsedTime > duration + this.export.recordStartTime) {
    //     button.parentNode.classList.remove("progress");

    //     this.controls.disableControls(false);

    //     if (this.controls.parameters.buttons.exportPreview.value) {
    //       button.value = "Preview";
    //       this.controls.parameters.buttons.exportPreview.value = false;
    //     }
    //     if (this.export.recording.animation) button.value = "Export";
    //     button.removeAttribute("style");
    //   }
    // }

    // End animate
    if (this.time.elapsedTime > duration + this.export.recordStartTime) {
      if (this.mode.mode.animate) this.mode.mode.animate();
    }
  };

  update = () => {
    if (this.mode) this.mode.update();

    // Export preview
    if (
      this.controls.parameters.buttons.exportPreview.value ||
      this.export.recording.animation
    ) {
      this.animate();
    }

    if (this.mode && this.mode.mode.effectComposer)
      this.mode.mode.effectComposer.render();
    else this.renderer.update();
  };
}
