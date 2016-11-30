import {connect} from 'react-redux'
import React, { Component } from 'react';

let OrbitControls = require('three-orbit-controls')(THREE);

export default class Visualizer extends Component {
  constructor(props) {
    super(props);

    // this.stats;
    this.camera;
    this.controls;
    this.scene;
    this.renderer;
    this.animate = this.animate.bind(this);

    this.mirror = true;

    this.onWindowResize = this.onWindowResize.bind(this);
    this.loadWords = this.loadWords.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
      this.init();
      this.animate();
  }

  componentDidUpdate(){
    {
          const canv = document.getElementsByTagName("canvas")
          console.log(canv, "CANVVVVVVVV");
          canv[0] &&
          canv[0].addEventListener("click", () => canv[0].webkitRequestFullscreen())
         }
  }


  /* load the words/label to scene */
  loadWords(words, fontFile, size, height) {
    //need to load the font first
    let loader = new THREE.FontLoader();
    loader.load(fontFile, (font) => {
      console.log("here",words);
      //for every word create an object called Mesh
      let x = 0, y = 0 , z = 0;
      Object.keys(words).forEach((word, idx) => {
        //properties for word
        let geometry  = new THREE.TextGeometry(word,{size, font, height});
        //let color = new THREE.Color((words[word][0]-0.3)*10, (words[word][1]-0.5)*10, (words[word][2]-0.4)*10);
        if(idx == 0){
          x = words[word][0];
          y = words[word][1];
          z = words[word][2];
        }
        let color = new THREE.Color((words[word][0]-x)*10, (words[word][1]-y)*10, (words[word][2]-z)*10);
        let material =  new THREE.MeshBasicMaterial( { color:color } );
        let mesh = new THREE.Mesh( geometry, material );

        //set the position for every single word
        mesh.position.x = ((words[word][0] - 0.5) * window.innerWidth);
        mesh.position.y = ((words[word][1] - 0.5) * window.innerHeight);
        mesh.position.z = ((words[word][2] - 0.5) * 500);
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        //append the word to scene
        this.scene.add( mesh );
      })
    })
  }

 init() {
    console.log("INIT FUN");
    // create the scene to contain 3d modules
    this.scene = new THREE.Scene();

    //to display the scene, create new renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    let container = document.getElementById( 'container' );
    container.appendChild( this.renderer.domElement );
    //the view from the user
    this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 100, 1000 );
    this.camera.position.z = 600;

    //orbit around some object
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
    light = new THREE.AmbientLight( 0x000000 );
    this.scene.add( light );

    //info box to monitor code performance
    // this.stats = new Stats();
    // container.appendChild( this.stats.dom );

    window.addEventListener( 'resize', this.onWindowResize, false );
  }

  // auto resize
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  // animation
  animate() {
    requestAnimationFrame( this.animate );
    this.controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    // this.stats.update();
    this.renderPlot();
  }

  //plot the scene and camera to the canvas
  renderPlot() {
    this.renderer.render( this.scene, this.camera );
  }

  render () {
    // load all words for each scene
    console.log("this.props inside visualizer render", this.props);
    this.loadWords(this.props.labels, 'js/optimer_bold.typeface.json', 35, 5);
    this.loadWords(this.props.words, 'js/optimer_regular.typeface.json', 25, 2);
    return (
      <div id = "container">
        <h1>{ this.props.graphtitle }</h1>
      </div>
    )
  }
}
