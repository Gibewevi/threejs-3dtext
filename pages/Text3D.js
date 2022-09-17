import { useEffect } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
// import typefaceFont from '/public/helvetiker_regular.typeface.json';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';


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

        //Canvas
        const canvas = document.querySelector('.webgl');

        //Scene
        const scene = new Three.Scene();

        //group
        const group = new Three.Group();
        scene.add(group);

        // //AxesHelper
        // const axesHelper = new Three.AxesHelper();
        // group.add(axesHelper);
        
        //Textures
        const textureLoader = new Three.TextureLoader();
        const matcapTexture = textureLoader.load('/textures/matcaps/3.jpg');

        //Sizes
        const sizes = {
        width: innerWidth,
        height: 800
        }

        //Fonts
        const fontLoader = new FontLoader();
        fontLoader.load(
             '/helvetiker_regular.typeface.json',

            // onLoad callback
            ( font ) => {
               
                const textGeometry = new TextGeometry(
                        '!Vote IT',
                        {
                            font: font,
                            size: 0.5,
                            height: 0.4,
                            curveSegments: 6,
                            bevelEnable: false,
                            bevelThickness: 0.00,
                            bevelSize: 0.00,
                            bevelOffset: 0,
                            bevelSegments: 0
                        }
                    )

                    //Vote geometry
                    textGeometry.computeBoundingBox();
                    textGeometry.center();

                    //Material
                    const textMaterial = new Three.MeshMatcapMaterial({matcap: matcapTexture });

                    //Mesh
                    const text = new Three.Mesh(textGeometry,textMaterial);
                    group.add(text);

            },
        
            // onProgress callback
            function ( xhr ) {
              
            },
        
            // onError callback
            function ( err ) {
              
            }
        );

        //Cameras
        const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 3;
        camera.position.x = cursor.x;
        camera.position.y = cursor.y;
        group.add( camera );

        //Renderer
        const renderer = new Three.WebGLRenderer({
            alpha: true,
            canvas
        })

        //controls 
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true;

        renderer.setSize(sizes.width, sizes.height);

        const clock = new Three.Clock();
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