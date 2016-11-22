
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
    this.font;
    this.group ;
    this.textGeo;
    this.textMesh1;
    this.textMesh2;
    this.material;
    this.bevelEnabled = true;
    this.geometry;
    this.material ;
    this.loadFont = ()=> {
      console.log("loadFont");
      var loader = new THREE.FontLoader();
      loader.load('js/optimer_bold.typeface.json', (response)=>{
        console.log("res~~~~", this.font);
        this.font = response;
         console.log("res2~~~~", this.font);

        this.geometry = new THREE.TextGeometry("hello",{size: 20, font: this.font});
        this.material =  new THREE.MeshBasicMaterial( { color:0xffffff } );
        for ( var i = 0; i < 500; i ++ ) {
          var mesh = new THREE.Mesh( this.geometry, this.material );
          mesh.position.x = ( Math.random() - 0.5 ) * 1000;
          mesh.position.y = ( Math.random() - 0.5 ) * 1000;
          mesh.position.z = ( Math.random() - 0.5 ) * 1000;
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
          this.scene.add( mesh );
        }

        this.refreshText();
      })
    }

    this.refreshText = this.refreshText.bind(this);
    this.createText = this.createText.bind(this);
    this.text = "three.js"
    this.mirror = true;
    this.words = [];

  }

  componentDidMount(){
    //this.props.onLoadPuppies();
    // this.plot();

      this.loadFont();
      this.init();
      this.animate();
  }

 init() {
        console.log("INIT FUN");

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

        this.group = new THREE.Group();
        this.group.position.y = 100;
        this.scene.add(this.group);

        // world

        // var geometry = new THREE.TextGeometry("hello",{size: 20, font: this.font});
        // var material =  new THREE.MeshBasicMaterial( { color:0xffffff } );
        console.log("geometry", this.geometry);
        for ( var i = 0; i < 500; i ++ ) {
          var mesh = new THREE.Mesh( this.geometry, this.material );
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

    // loadFont(){
    //   var loader = new THREE.FontLoader();
    //   loader.load('js/optimer_bold.typeface.json', function(response){
    //     console.log("res~~~~", this);
    //     this.font = response;
    //     this.refreshText();
    //   })
    // }
    refreshText() {
        //updatePermalink();
        this.group.remove( this.textMesh1 );
        if ( this.mirror ) this.group.remove( this.textMesh2 );
        if ( !this.text ) return;
        //this.createText();
      }

    createText() {
        textGeo = new THREE.TextGeometry( this.text, {
          font: font,
          size: size,
          height: height,
          curveSegments: curveSegments,
          bevelThickness: bevelThickness,
          bevelSize: bevelSize,
          bevelEnabled: bevelEnabled,
          material: 0,
          extrudeMaterial: 1
        });
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
        // "fix" side normals by removing z-component of normals for side faces
        // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
        if ( ! bevelEnabled ) {
          var triangleAreaHeuristics = 0.1 * ( height * size );
          for ( var i = 0; i < textGeo.faces.length; i ++ ) {
            var face = textGeo.faces[ i ];
            if ( face.materialIndex == 1 ) {
              for ( var j = 0; j < face.vertexNormals.length; j ++ ) {
                face.vertexNormals[ j ].z = 0;
                face.vertexNormals[ j ].normalize();
              }
              var va = textGeo.vertices[ face.a ];
              var vb = textGeo.vertices[ face.b ];
              var vc = textGeo.vertices[ face.c ];
              var s = THREE.GeometryUtils.triangleArea( va, vb, vc );
              if ( s > triangleAreaHeuristics ) {
                for ( var j = 0; j < face.vertexNormals.length; j ++ ) {
                  face.vertexNormals[ j ].copy( face.normal );
                }
              }
            }
          }
        }
        var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
        textMesh1 = new THREE.Mesh( textGeo, material );
        textMesh1.position.x = centerOffset;
        textMesh1.position.y = hover;
        textMesh1.position.z = 0;
        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;
        group.add( textMesh1 );
        if ( mirror ) {
          textMesh2 = new THREE.Mesh( textGeo, material );
          textMesh2.position.x = centerOffset;
          textMesh2.position.y = -hover;
          textMesh2.position.z = height;
          textMesh2.rotation.x = Math.PI;
          textMesh2.rotation.y = Math.PI * 2;
          group.add( textMesh2 );
        }
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
