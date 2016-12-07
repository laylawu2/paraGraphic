import {connect} from 'react-redux';
import React, { Component } from 'react';

import Promise from 'bluebird';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { amber50, amber400, fullWhite, grey50, grey900 } from 'material-ui/styles/colors';

import Loading from './Loading';

let OrbitControls = require('three-orbit-controls')(THREE);

const styles = {
  position: "absolute",
  minHeight: "50px",
  minWidth: "50px",
  color: amber50,
  transition: "none"
}


// the "work horse" for our application.  This is the component that renders the text analysis
// data as a 3D graph using three js


export default class Visualizer extends Component {
  constructor(props) {
    super(props);

    // this.stats;
    this.camera;
    this.controls;
    this.scene;
    this.renderer;
    this.animate = this.animate.bind(this);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersected;
    this.mirror = true;
    this.objects = [];

    this.onWindowResize = this.onWindowResize.bind(this);
    this.loadWords = this.loadWords.bind(this);
    this.loadTextWords = this.loadTextWords.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.buildAxes = this.buildAxes.bind(this);
    this.buildAxis = this.buildAxis.bind(this);
  }

  componentDidMount() {
    this.initRenderer();
    this.init();
    this.animate();
    document.getElementsByTagName('canvas')[0]
      .addEventListener( 'mousemove', this.onMouseMove, false );
    window.addEventListener( 'resize', this.onWindowResize, false );
    window.requestAnimationFrame(this.render);
  }

  componentDidUpdate() {
    // clear scene before adding new words/labels to it
    this.init();
  }



      /* load axis */
  loadWords(words, fontFile, size, height) {
    //need to load the font first
    let loader = new THREE.FontLoader();
    loader.load(fontFile, (font) => {

      //for every word create an object called Mesh
      words && Object.keys(words).forEach((word) => {
        //properties for word
        let geometry  = new THREE.TextGeometry(word,{size, font, height});
        let material =  new THREE.MeshBasicMaterial( { color: 0xffffff } );
        let mesh = new THREE.Mesh( geometry, material );

        //set the position for every single word
        mesh.position.x = words[word][0] - 0.5;
        mesh.position.y = words[word][1] - 0.5;
        mesh.position.z = words[word][2] - 0.5;

        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        //append the word to scene
        this.scene.add( mesh );
      });
    });
  }

  /* load the words (one sphere per word for text analyzed) to scene */
  loadTextWords(compareBool, words, color) {

    //for every word, we will create a spherical mesh object in three js
    // each sphere will be assigned color via RGB values


    // find the minimum value of x,y,z over the entire data set
    words && Object.keys(words).forEach((word, idx) => {
      this.xmin = this.xmin<words[word][0]?this.xmin:words[word][0];
      this.ymin = this.ymin<words[word][1]?this.ymin:words[word][1];
      this.zmin = this.zmin<words[word][2]?this.zmin:words[word][2];
    })

      // difference between 1 and the minimum coordinate value;
      // will be used to assign RGB values for each sphere object
      var diffx = 1-this.xmin;
      var diffy = 1-this.ymin;
      var diffz = 1-this.zmin;

    words && Object.keys(words).forEach((word, idx) => {
      //properties for word

      // create a sphere object for each word
      let geometry  = new THREE.SphereGeometry( 0.02, 8, 8 );


      // to determine R (x-coord), G (y-coord), B (z-coord) color values,
      // calculate difference between x, y, z values and the minimum coordinate values as a
      // percentage of the value range
      // multiplying by 1.3 made the resulting colors brighter
      if(!compareBool){
        color = new THREE.Color(
          1.3*(words[word][0]-this.xmin)/diffx,
          1.3*(words[word][1]-this.ymin)/diffy,
          1.3*(words[word][2]-this.zmin)/diffz
        );
      }
      let material =  new THREE.MeshLambertMaterial( { color: color} );
      let mesh = new THREE.Mesh( geometry, material );

      //set the position for every single word
      mesh.position.x = words[word][0];
      mesh.position.y = words[word][1];
      mesh.position.z = words[word][2];

      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      mesh.name = words[word]; // property used for "mouse over" word info
      //passing down the properties, word & color
      mesh.word = word;
      mesh.colors =[
        1.3*(words[word][0]-this.xmin)/diffx,
        1.3*(words[word][1]-this.ymin)/diffy,
        1.3*(words[word][2]-this.zmin)/diffz
      ];

      this.objects.push(mesh);
      //append the word to scene
      this.scene.add( mesh );
    })
  }

  initRenderer() {
    //to display the scene, create new renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    let container = document.getElementById( 'container' );
    container.appendChild( this.renderer.domElement );
  }

  init() {
    console.log("INIT FUN");
    // create the scene to contain 3d modules
    this.scene = new THREE.Scene();

    //the view from the userwindow.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 10000 );
    this.camera.position.z = 1.3;

    //orbit around some object
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;

    // lights
    let light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    this.scene.add( light );
    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( -1, -1, -1 );
    this.scene.add( light );

    //add axes lines
    var axes = this.buildAxes( 10000 );
    this.scene.add(axes);

    //info box to monitor code performance
    // this.stats = new Stats();
    // container.appendChild( this.stats.dom );

    // load everything onto the scene


    this.loadWords({X:[1,0,0], Y:[0,1,0], Z:[0,0,1]}, 'js/optimer_bold.typeface.json', 0.05, 0.005);

    // check if the text2 exists, if so check the length of its object keys,
    // if greater than 1, then we have a second set of text to load
    if(this.props.visInfo.words.text2 && (Object.keys(this.props.visInfo.words.text2).length > 1)) {
      this.loadTextWords(true, this.props.visInfo.words.text1, 0x00ffff);
      this.loadTextWords(true, this.props.visInfo.words.text2, 0xff3300);

    } else {
      this.props.visInfo.words.text1 &&
      this.loadTextWords(false, this.props.visInfo.words.text1, 0x00ffff);
    }

  }

  buildAxes( length ) {
    var axes = new THREE.Object3D();

    axes.add( this.buildAxis( new THREE.Vector3( -0.5, -0.5, -0.5 ), new THREE.Vector3( length, -0.5, -0.5 ), 0xffffff, false ) ); // +X
    axes.add( this.buildAxis( new THREE.Vector3( -0.5, -0.5, -0.5 ), new THREE.Vector3( -length, -0.5, -0.5 ), 0xffffff, false) ); // -X
    axes.add( this.buildAxis( new THREE.Vector3( -0.5, -0.5, -0.5 ), new THREE.Vector3( -0.5, length, -0.5 ), 0xffffff, false ) ); // +Y
    axes.add( this.buildAxis( new THREE.Vector3( -0.5, -0.5, -0.5 ), new THREE.Vector3( -0.5, -length, -0.5), 0xffffff, false ) ); // -Y
    axes.add( this.buildAxis( new THREE.Vector3( -0.5, -0.5, -0.5 ), new THREE.Vector3( -0.5, -0.5, length ), 0xffffff, false ) ); // +Z
    axes.add( this.buildAxis( new THREE.Vector3( -0.5, -0.5, -0.5 ), new THREE.Vector3( -0.5, -0.5, -length ), 0xffffff, false ) ); // -Z

    return axes;

  }

  buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(), mat;
    //type of line
    if(dashed) {
      mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
      mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
    }

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LineSegments );

    return axis;

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
    // update the picking ray with the camera and mouse position
    this.renderer.render( this.scene, this.camera );
  }

  //hover function
  onMouseMove( event ) {
      event.preventDefault();
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components window.innerHeight
      this.mouse.x = ( (event.clientX) /  window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( (event.clientY) / document.getElementById("container").offsetHeight) * 2 + 1;

      this.raycaster.setFromCamera( this.mouse, this.camera );
      // calculate objects intersecting the picking ray
      var intersections;
      var numObjects;
      intersections = this.raycaster.intersectObjects( this.objects );
      numObjects = this.objects.length;
      if ( intersections.length > 0 ) {
        if ( this.intersected != intersections[ 0 ].object ) {
          if ( this.intersected ) this.intersected.material.color.setRGB(this.intersected.colors[0],this.intersected.colors[1],this.intersected.colors[2]);
          //get the hover word
          this.intersected = intersections[ 0 ].object;
          //change the color when hover
          this.intersected.material.color.setHex( 0xffffff);
          //add the text
          var text = document.getElementById("text");
          text.innerHTML = this.intersected.word.toUpperCase();
          document.getElementById('container').appendChild(text);
        }
        document.body.style.cursor = 'pointer';
      } else if ( this.intersected ) {
        //change the color back
        this.intersected.material.color.setRGB(this.intersected.colors[0],this.intersected.colors[1],this.intersected.colors[2]);
        this.intersected = null;
        //reset the text
        var text = document.getElementById("text");
        text.innerHTML = "";
        document.body.style.cursor = 'auto';
      }
    }

  render () {
    if(this) {// 'this' is sometimes undefined
        console.log("this.props inside the visualizer renderer", this);

        return (
          <div id="container">
            <h4 id="graph-title">
            {
              this.props.pageStatus === 'loading'?
              <Loading />
              :
              this.props.visInfo.graphtitle
            }
            </h4>
            <p id = "text"></p>
          </div>
        );
      }
  }
}
