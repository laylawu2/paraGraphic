
import {connect} from 'react-redux'
import React, { Component } from 'react';

class Tmp extends Component {
  constructor(props) {
    super(props);

    this.stats;
    this.camera;
    this.controls;
    this.scene;
    this.renderer;
    this.animate = this.animate.bind(this);

  }

  componentDidMount(){
    //this.props.onLoadPuppies();
    // this.plot();
      this.init();
      this.animate();
  }

 init() {

        var OrbitControls = require('three-orbit-controls')(THREE);
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( this.scene.fog.color );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        var container = document.getElementById( 'container' );
        container.appendChild( this.renderer.domElement );
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 500;
        console.log("THREE", THREE);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)//new THREE.OrbitControls( this.camera, this.renderer.domElement );
        //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
        // world
        var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
        var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );
        for ( var i = 0; i < 500; i ++ ) {
          var mesh = new THREE.Mesh( geometry, material );
          mesh.position.x = ( Math.random() - 0.5 ) * 1000;
          mesh.position.y = ( Math.random() - 0.5 ) * 1000;
          mesh.position.z = ( Math.random() - 0.5 ) * 1000;
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
          this.scene.add( mesh );
        }
        // lights
        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        this.scene.add( light );
        light = new THREE.DirectionalLight( 0x002288 );
        light.position.set( -1, -1, -1 );
        this.scene.add( light );
        light = new THREE.AmbientLight( 0x222222 );
        this.scene.add( light );
        //
        this.stats = new Stats();
        container.appendChild( this.stats.dom );
        //
        window.addEventListener( 'resize', this.onWindowResize, false );
      }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
      }
    animate() {
        requestAnimationFrame( this.animate );
        this.controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
        this.stats.update();
        this.renderPlot();
      }
    renderPlot() {
        this.renderer.render( this.scene, this.camera );
      }

  render () {
    return (
      <div id = "container">
         <h1>Canvas</h1>


      </div>
    )
  }
}



export default connect (
null, null
) (Tmp)
