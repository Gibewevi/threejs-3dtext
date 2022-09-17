import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'THREE/examples/jsm/geometries/TextGeometry.js';
import typefaceFont from '/public/helvetiker_regular.typeface.json';
import { FontLoader } from 'THREE/examples/jsm/loaders/FontLoader';


export default function Text3D(){
    useEffect(() => {

        //cursor
        const cursor = {
            x: 0,
            y: 0
        }

        window.addEventListener("mousemove", (event) => 
        {
        cursor.x = event.clientX / sizes.width - 0.5;
        cursor.y = -(event.clientY / sizes.height - 0.5);
        })

        //Scene
        const scene = new THREE.Scene();

        //Canvas
        const canvas = document.querySelector('.webgl');

        //Object
        const cube = new THREE.Mesh(
                new THREE.BufferGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial()
            )
            scene.add(cube);
        //Textures
        const textureLoader = new THREE.TextureLoader();
        
        //Fonts
        const fontLoader = new FontLoader();
        fontLoader.load(
             '/helvetiker_regular.typeface.json',

            // onLoad callback
            ( font ) => {
               
                const textGeometry = new TextGeometry(
                        'THREE.js',
                        {
                            font: font,
                            size: 0.5,
                            height: 0.2,
                            curveSegments: 6,
                            bevelEnable: true,
                            bevelThickness: 0.01,
                            bevelSize: 0.05,
                            bevelOffset: 0,
                            bevelSegments: 5
                        }
                    )
                    const textMaterial = new THREE.MeshBasicMaterial();
                    textMaterial.wireframe = true;
                    const text = new THREE.Mesh(textGeometry,textMaterial);
                    scene.add(text);
            },
        
            // onProgress callback
            function ( xhr ) {
              
            },
        
            // onError callback
            function ( err ) {
              
            }
        );

        //Sizes
        const sizes = {
            width: innerWidth,
            height: 800
        }

        //Cameras
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 3;
        camera.position.x = cursor.x;
        camera.position.y = cursor.y;
        scene.add( camera );

        //Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas
        })

        //controls 
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true;

        renderer.setSize(sizes.width, sizes.height);

        const clock = new THREE.Clock();
        const tick = () => 
         {
             const elapsedTime = clock.getElapsedTime()

            //update controls
            controls.update();

            //  camera.lookAt(mesh.position);
              //loop tick
              window.requestAnimationFrame(tick);

              //render
              renderer.render(scene, camera);
         }
        tick();
    })

return(
        <canvas className='webgl'></canvas>
    )
}