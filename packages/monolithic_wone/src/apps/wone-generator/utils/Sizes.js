import EventEmitter from "./EventEmitter";
import App from "../AppStandalone";

export default class Sizes extends EventEmitter {
  constructor(app) {
    super();

    // Setup
    this.app = app ?? new App();
    this.canvas = this.app.canvas;

    // Setup
    this.size = {
      width: 2560,
      height: 1440,
      aspect: "16:9",
      name: "Portrait",
    };

    this.limit = {
      // width: window.screen.availWidth,
      width: this.size.width,
      // height: window.screen.availHeight,
      height: this.size.height,
    };

    this.width = this.size.width;
    this.height = this.size.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // window.addEventListener("resize", () => {
    //   this.scaleCanvas();
    // });
  }

  // Resize
  resize = () => {
    this.width = this.size.width;
    this.height = this.size.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Constrain size to limit
    this.getAspect();
    if (this.width > this.limit.width || this.height > this.limit.height) {
      this.width = this.limit.width * this.aspect.x;
      this.height = this.limit.height * this.aspect.y;
    }

    //this.scaleCanvas();
    this.trigger("resize");
  };

  getAspect = () => {
    this.aspect = { x: 1, y: 1 };
    if (this.width > this.height) {
      this.aspect.x = 1;
      this.aspect.y = this.height / this.width;
    } else if (this.height > this.width) {
      this.aspect.x = this.width / this.height;
      this.aspect.y = 1;
    }
  };

  scaleCanvas = (render = false) => {
    // Disable image sequence export below 600px screen width (mobile)
    if (window.innerWidth < 600) {
      if (this.app.controls && this.app.controls.parameters) {
        // Toggle image still export
        this.app.controls.parameters.export.save.controllers.still.click();
      }
    }

    let pad = 30;
    if (window.innerWidth < 1200) {
      pad = 10;
    }

    let availableWidth =
      Math.max(1200, Math.min(2560, window.innerWidth)) - 600 - pad * 2;
    const availableHeight =
      Math.max(320, Math.min(1440, window.innerHeight)) - pad * 2;

    if (window.innerWidth < 1200) {
      availableWidth = window.innerWidth - pad * 2;
    }

    const { width, height } = this;

    const scaleX = availableWidth < width ? availableWidth / width : 1;
    const scaleY =
      availableHeight < height * scaleX
        ? availableHeight / (height * scaleX)
        : 1;
    let scale = scaleX * scaleY;

    if (render) {
      scale *= (width * scaleX) / this.app.controls.parameters.size.value.width;
    }

    if (window.innerWidth > 320)
      this.canvas.style.transform = `scale(${scale}, ${scale})`;
  };
}
