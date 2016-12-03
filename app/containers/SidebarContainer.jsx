import React from 'react';
import { connect } from 'react-redux';

import Sidebar from '../components/Sidebar';
import {loadInfofunc} from '../reducers/inputForm';

const mapStateToProps = ({ loadinfo, pageStatus }) => ({
    loadinfo, 
    pageStatus
});

const mapDispatchToProps = dispatch => ({
    Infofunc: (loadInfo) => {
        dispatch(loadInfofunc(loadInfo));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);