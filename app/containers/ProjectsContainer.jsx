import { connect } from 'react-redux'
import Projects from '../components/Projects'

const mapState = ({titles}) => ({titles})

const mapDispatch = () => {}

export default connect(mapState, null)(Projects)