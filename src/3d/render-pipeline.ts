import { Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, SphereGeometry, Timer, WebGLRenderer } from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

export class RenderPipeline {
    private canvas: HTMLCanvasElement;
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private controls: FirstPersonControls;
    private timer: Timer;
    private scene: Scene;

    private setSize() {
        const dpr = window.devicePixelRatio;
        const w = Math.floor(this.canvas.clientWidth * dpr);
        const h = Math.floor(this.canvas.clientHeight * dpr);

        if (w === this.canvas.width && h === this.canvas.height) { return; }

        this.renderer.setSize(w, h, false);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.renderer = new WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });

        this.camera = new PerspectiveCamera();
        this.camera.position.set(0, 0, 200);

        this.setSize();
        window.addEventListener('resize', () => this.setSize());

        this.controls = new FirstPersonControls(this.camera, document.body);
        this.controls.lookAt(0, 0, 0);
        this.controls.lookSpeed = 0.01;

        this.timer = new Timer();
        this.timer.connect( document );

        this.scene = new Scene();
        this.scene.add(new Mesh(new SphereGeometry(20), new MeshNormalMaterial()))
    }


    private update(deltaTime: number) {
        this.controls.update(deltaTime);
    }

    run() {
        const loop = (time?: number) => {
            this.timer.update(time);
            const deltaTime = this.timer.getDelta();
            this.update(deltaTime);

            this.renderer.render(this.scene, this.camera);
            window.requestAnimationFrame(loop);
        };

        loop();
    }
}
