import { onMount } from 'solid-js';
import './app.scss';
import { RenderPipeline } from '../3d/render-pipeline';

export function App() {
    let c: HTMLCanvasElement;

    onMount(() => {
        const pipeline = new RenderPipeline(c);
        pipeline.run();
    })

    return (
        <div class='app'>
            <canvas id='threed' ref={el => (c = el)}></canvas>
            <div class='label'>Under Construction</div>
        </div>
    );
}
