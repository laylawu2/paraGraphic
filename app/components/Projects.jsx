import React from 'react'
import { Link } from 'react-router'
export default class extends React.Component {
  render(){
    var rand = Math.floor(Math.random()) * 20;
    return(
      <div className='img-div'>
        {
          images.forEach((idx, img) => (
          <Link key={idx}>
            <div className='img' style={{ backgroundImage: url(images[0])}}/>
          </Link>
          ))}
      </div>
    )
  }
}

const images = [
  'http://www.freeimages.com/photo/burbujas-1533811',
  'http://www.freeimages.com/photo/grid-1460308',
  'http://www.freeimages.com/photo/abstract-1-1197734',
  'http://www.freeimages.com/photo/pipe-1558423',
  'http://www.freeimages.com/photo/light-abstract5-1172728',
  'http://www.freeimages.com/photo/abstract-texture-1171710',
  'http://www.freeimages.com/photo/abstract-texture-1171710',
  'http://www.freeimages.com/photo/staircase-1235034',
  'http://www.freeimages.com/photo/light-abstract-03-1510324',
  'http://www.freeimages.com/photo/abstract-light-2-1176759',
  'http://www.freeimages.com/photo/abstract-blurred-lights-2-1198971',
  'http://www.freeimages.com/photo/light-abstracts-1-1513282',
  'http://www.freeimages.com/photo/abstract-1182279',
  'http://www.freeimages.com/photo/christmas-tree-abstract-1169894',
  'http://www.freeimages.com/photo/light-s-abstractions-1522075',
  'http://www.freeimages.com/photo/fireflies-1572863',
  'http://www.freeimages.com/photo/light-texture-1195217',
  'http://www.freeimages.com/photo/water-effect-1184309',
  'http://www.freeimages.com/photo/laser-experiments-1196527'
]


