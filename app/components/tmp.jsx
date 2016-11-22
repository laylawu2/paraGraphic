import {connect} from 'react-redux'
import React, { Component } from 'react';

let OrbitControls = require('three-orbit-controls')(THREE);

class Tmp extends Component {
  constructor(props) {
    super(props);

    this.stats;
    this.camera;
    this.controls;
    this.scene;
    this.renderer;
    this.animate = this.animate.bind(this);

    
    this.mirror = true;
    /* Sample data */
    this.words = {
      "z":[0,0,0.2], 
      "x":[0.2,0,0], 
      "y":[0,0.2,0], 
      "O":[0,0,0], 
      "hi":[0.1,0.3,0.2],
      "haha":[0,0,0.5],
      "cool":[0.9,0.6,0.7], 
      "new center":[0.5,0.5,0.5]
    };

    this.onWindowResize = this.onWindowResize.bind(this);
    this.loadWords = this.loadWords.bind(this);
  }

  componentDidMount(){
      this.loadWords(this.words);
      this.init();
      this.animate();
  }

  loadWords(words) {
    let loader = new THREE.FontLoader();
    loader.load('js/optimer_bold.typeface.json', (font) => {

      Object.keys(words).forEach((word) => {
        let geometry  = new THREE.TextGeometry(word,{size: 25, font:font, height:2});
        let color = new THREE.Color(words[word][0],words[word][1],words[word][2] );
        let material =  new THREE.MeshBasicMaterial( { color:color } );
        let mesh = new THREE.Mesh( geometry, material );

        mesh.position.x = ((words[word][0] - 0.5) * window.innerWidth);
        mesh.position.y = ((words[word][1] - 0.5) * window.innerHeight);
        mesh.position.z = ((words[word][2] - 0.5) * 500);
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        this.scene.add( mesh );
      })
    })
  }

 init() {
    console.log("INIT FUN");

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor( this.scene.fog.color );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    
    let container = document.getElementById( 'container' );
    container.appendChild( this.renderer.domElement );
    
    this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 100, 1000 );
    this.camera.position.z = 500;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;

    // lights
    let light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    this.scene.add( light );
    light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    this.scene.add( light );
    light = new THREE.AmbientLight( 0x222222 );
    this.scene.add( light );
 
    this.stats = new Stats();
    container.appendChild( this.stats.dom );

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
