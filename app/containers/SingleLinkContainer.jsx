import {loadLabels, loadInfofunc} from '../reducers/inputForm'
import SingleLink from '../components/SingleLink'
import React from 'react'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'

const mapStateToProps = ({ loadinfo }) => ({
    loadinfo
});

const mapDispatchToProps = dispatch => ({
    Infofunc: (loadInfo) => {
        dispatch(loadInfofunc(loadInfo));
    }
});

// const fetchSample = (t1, t2) => {
// return (dispatch) => {                               // axios call to python server
//     axios.post('http://localhost:1337', t1)     // returns the plottable points
//       .then(res => { dispatch(getWords(res.data))
//         dispatch(loadLabels(t1));
//         if(t2) {
//           axios.post('http://localhost:1337', t2)
//           .then(res =>{
//             dispatch(getCompText(res.data));
//             dispatch(setCompare("true"));
//           })
//       }
//       })
//       .catch(err => console.error(err))
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(SingleLink)