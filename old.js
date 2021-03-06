var mine;
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var targetList = [];
var projector, mouse = { x: 0, y: 0 };
projector = new THREE.Projector();

var geometry = new THREE.BoxGeometry( 1, 1, 1 );

var materialArray = [];
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/1.png' ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/2.png' ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/3.png' ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/4.png' ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/5.png' ) }));
materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/6.png' ) }));

var material = new THREE.MeshFaceMaterial(materialArray);
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;

targetList.push(cube);

document.addEventListener("DOMContentLoaded", function() {

    controls = new THREE.OrbitControls( camera );

    var render = function () {
        requestAnimationFrame( render );
        controls.update();
        renderer.render( scene, camera );
    };

    render();
});

function onDocumentMouseDown( event )
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();

    console.log("Click.");

    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    // projector.unprojectVector( vector, camera );
    vector.unproject( camera );

    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( targetList );

    // if there is one (or more) intersections
    if ( intersects.length > 0 )
    {
        // console.log("Hit @ " + toString( intersects[0].point ) );
        mine = intersects[0];
        console.log(mine.face.materialIndex+1);

        // // change the color of the closest face.
        // intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 );
        // intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
    }

}

document.addEventListener( 'click', onDocumentMouseDown, false );