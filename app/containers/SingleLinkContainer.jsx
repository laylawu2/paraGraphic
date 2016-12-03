import {loadLabels, loadInfofunc} from '../reducers/inputForm'
import SingleLink from '../components/SingleLink'
import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ loadinfo }) => ({
    loadinfo
});

const mapDispatchToProps = dispatch => ({
    Infofunc: (loadInfo) => {
        dispatch(loadInfofunc(loadInfo));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(SingleLink)