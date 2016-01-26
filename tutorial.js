document.addEventListener('DOMContentLoaded', function() {

var camera, scene, renderer;
        var mesh;
        var enimies = [];
        var enemySpeed = 1;

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 800);
            camera.position.z = -10;

            scene = new THREE.Scene();

            // var texture = THREE.ImageUtils.loadTexture('nickface.png');
            var light = new THREE.DirectionalLight( 0xffff00, 1 );
            light.position.set(0, 1, 0).normalize();
            scene.add(light);

            var geometry = new THREE.SphereGeometry(1, 1, 16);
            var material = new THREE.MeshBasicMaterial({
                // map: texture,
                ambient: 0xff88aa,
                specular: 0x555555,
                shininess: 50,
                color: '#efefef'
            });

            var radius = 1600;
            var nBoxes = 20000;
            for (var i = 0; i <nBoxes; i++) {
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                mesh.position.set(radius/2 -radius * Math.random(), radius/2 -radius * Math.random(), radius/2 -radius * Math.random());
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
                if(enimies[i].position.z > 0) {
                    enimies[i].position.z = Math.random() * -800;
                    enimies[i].position.y = Math.random() * -800 + Math.random() * 800;
                    enimies[i].position.x = Math.random() * -800 + Math.random() * 800;

                } else {
                    enimies[i].position.z += enemySpeed;

                }
            }

            renderer.render(scene, camera);

        }
      });
