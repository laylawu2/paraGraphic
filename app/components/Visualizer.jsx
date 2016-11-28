import {connect} from 'react-redux'
import React, { Component } from 'react';

let OrbitControls = require('three-orbit-controls')(THREE);

export default class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.stats;
    this.camera;
    this.controls;
    this.scene;
    this.renderer;
    this.animate = this.animate.bind(this);
    this.mirror = true;
    this.hemisphereLight;
    this.shadowLight;
    this.hemisphereLight;
    this.shadowLight;



    this.mirror = true;

    // offset negative labels by -0.1 so they don't overlap with each other
    // change this to this.props.labels after form is added
    this.labels = {
      "HATE": [-0.1, 0, 0],
      "LOVE": [1, 0, 0],
      "SAD": [0, -0.1, 0],
      "HAPPY": [0, 1, 0],
      "CONFUSED": [0, 0, -0.1],
      "CLEAR": [0, 0, 0.99]
    }

    this.onWindowResize = this.onWindowResize.bind(this);
    this.loadWords = this.loadWords.bind(this);
    this.createLights = this.createLights.bind(this);
    this.wordsColor = this.wordsColor.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){

      this.init();
      this.animate();
  }


  /* load the words/label to scene */
  loadWords(words, fontFile, size, height) {
    console.log("Add words/labels");
    //need to load the font first
    let loader = new THREE.FontLoader();
    loader.load(fontFile, (font) => {

      //for every word create an object called Mesh
      Object.keys(words).forEach((word) => {
        //properties for word
      let geometry  = new THREE.TextGeometry(word,{size, font, height});

        //var diffuseColor = new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 );

      let color = new THREE.Color(words[word][0], words[word][1], words[word][2]);

       //let color = new THREE.Color().setHSL(words[word][0], 0.5, words[word][2] * 1.5 );
        //let material =  new THREE.MeshBasicMaterial( { color:color } );
        //let material = new THREE.MultiMaterial();

       var material = new THREE.MeshLambertMaterial( {
          color: color,
          reflectivity: 0.5
        } );
        let mesh = new THREE.Mesh( geometry, material );

        //set the position for every single word
        mesh.position.x = ((words[word][0] - 0.5) * window.innerWidth);
        mesh.position.y = ((words[word][1] - 0.5) * window.innerHeight);
        mesh.position.z = ((words[word][2] - 0.5) * 400);
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        //append the word to scene
        this.scene.add( mesh );
        // let light = new THREE.DirectionalLight(0xaaaaaa);
        // console.log("add light", light);
        // light.position.set(150, 350, 350);
        // this.scene.add( light );
      })
    })

  }

 init() {
    console.log("INIT FUN");
    // create the scene to contain 3d modules
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0xf3b59c, 0.0009 );
    //this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    //to display the scene, create new renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor( this.scene.fog.color );
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

    this.createLights();
    // lights
    // let light = new THREE.DirectionalLight(0xaaaaaa);
    // console.log("add light", light);
    // light.position.set(150, 350, 350);
    // this.scene.add( light );
    //light2 = new THREE.AmbientLight( 0x0cff00 );
    //this.scene.add( light2 );

    //info box to monitor code performance
    this.stats = new Stats();
    container.appendChild( this.stats.dom );

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
    this.stats.update();
    this.renderPlot();
  }

  //plot the scene and camera to the canvas
  renderPlot() {
    this.renderer.render( this.scene, this.camera );
  }

  createLights() {
    console.log("Add Light")
  // A hemisphere light is a gradient colored light;
  // the first parameter is the sky color, the second parameter is the ground color,
  // the third parameter is the intensity of the light
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

  // A directional light shines from a specific direction.
  // It acts like the sun, that means that all the rays produced are parallel.
    this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);

  // Set the direction of the light
    this.shadowLight.position.set(500, 500, 500);

  // Allow shadow casting
    this.shadowLight.castShadow = true;

  // define the visible area of the projected shadow
    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;

  // define the resolution of the shadow; the higher the better,
  // but also the more expensive and less performant
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;

  // to activate the lights, just add them to the scene
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.shadowLight);
  }
  wordsColor(){
    var loader = new THREE.JSONLoader();
    loader.load( "js/cubecolors.js", this.loadWords(this.labels, 'js/optimer_bold.typeface.json', 35, 5) );

  }

  render () {
    // load all words for each scene
    //this.wordsColor();
    this.loadWords(this.labels, 'js/optimer_bold.typeface.json', 35, 5); // change to this.props.labels
    this.loadWords(this.props.words, 'js/optimer_regular.typeface.json', 25, 2);
    return (
      <div id = "container">
         <h1>Canvas</h1>
      </div>
    )
  }
}
