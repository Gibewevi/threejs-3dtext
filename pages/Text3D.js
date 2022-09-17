import { useEffect } from 'react';
import * as Three from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Text3D(){
    useEffect(() => {

        //Scene
        const scene = new Three.Scene();

        //Object
        //Sizes
        const sizes = {
            width: 800,
            height: 800
        }

        //Cameras
        const camera = new Three.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000);
        scene.add( camera );

        //Renderer
        const canvas = document.querySelector('.webgl');
        const renderer = new Three.WebGLRenderer({
            canvas
        })

        //render
        renderer.render(scene, camera);
    })

return(
        <canvas className='webgl'></canvas>
    )
}