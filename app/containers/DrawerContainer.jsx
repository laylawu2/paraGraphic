import React from 'react';
import { connect } from 'react-redux';

import Drawer from '../components/Drawer';
import {loadInfofunc} from '../reducers/inputForm';

const mapStateToProps = ({ loadinfo, pageStatus, labels }) => ({
    loadinfo, 
    pageStatus,
    labels
});

const mapDispatchToProps = dispatch => ({
    Infofunc: (loadInfo) => {
        dispatch(loadInfofunc(loadInfo));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Drawer);