import React from 'react'
import { Link } from 'react-router'
import images from '../../public/projects-images'
import _ from 'lodash'


{/* component page to display links to visualizations made users */}
export default class extends React.Component {
  render(){
    // var rand = Math.floor(Math.random()) * 20;
    const titles = this.props.titles
    titles && console.log(_.zip(titles, images))
    return(
      <div className='grid' >
        {
          titles && titles.length

          ? <div><h1>Projects</h1><div> {
              _.zip(titles, images).map(([title, img]) => {
                if (!title) return null
                return <Link
                  className='img'
                  style={{
                    background: `url(${img})`,
                  }}
                  to={title.key}><h4>{title.title}</h4></Link>
              })
            } </div></div>

          : <h1>Loading</h1>
        }


      </div>
    )
  }
}


