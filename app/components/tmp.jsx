
import {connect} from 'react-redux'
import React, { Component } from 'react';

class Tmp extends Component {

  componentDidMount(){
    //this.props.onLoadPuppies();
    this.plot();
  }



   plot(){
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer({canvas:myCanvas});
      renderer.setSize( window.innerWidth, window.innerHeight );
      var container = document.getElementById('container');
      container.appendChild( renderer.domElement );

      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      camera.position.z = 5;

      var renderPlot = function () {
        requestAnimationFrame( renderPlot );

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
      };

      renderPlot();
  }

  render () {
    return (
      <div id = "container">
         <h1>Canvas</h1>

      <canvas id="myCanvas" width="500" height="500" >
Your browser does not support the HTML5 canvas tag.</canvas>
      </div>
    )
  }
}



export default connect (
null, null
) (Tmp)
