import { connect } from 'react-redux'
import Projects from '../components/Projects'

const mapState = ({ titles }) => ({ titles });

export default connect(mapState, null)(Projects)