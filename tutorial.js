document.addEventListener('DOMContentLoaded', function() {

var camera, scene, renderer;
        var mesh;
        var enimies = [];
        var enemySpeed = 1;

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 0;

            scene = new THREE.Scene();

            var texture = THREE.ImageUtils.loadTexture('nickface.png');

            var geometry = new THREE.BoxGeometry(20, 20, 20);
            var material = new THREE.MeshBasicMaterial({
                map: texture
            });

            var radius = 1600;
            var nBoxes = 10000;
            for (var i = 0; i <nBoxes; i++) {
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                mesh.position.set(radius/2 -radius * Math.random(), radius/2 -radius * Math.random(), radius/2 -radius * Math.random() - 100);
                enimies.push(mesh);
            }

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            //

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {

            requestAnimationFrame(animate);

            for(var i = 0; i < enimies.length; i++) {
                if(enimies[i].position.y < -800) {
                    enimies[i].position.y = 800;
                } else {
                    enimies[i].position.y -= enemySpeed;
                }
            }

            renderer.render(scene, camera);

        }
      });
