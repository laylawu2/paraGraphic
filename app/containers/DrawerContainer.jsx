import React from 'react';
import { connect } from 'react-redux';

import Drawer from '../components/Drawer';
import { loadInfofunc } from '../reducers/inputForm';

// Drawer needs to know what to render: app info or input form 
const mapStateToProps = ({ loadinfo }) => ({
    loadinfo
});

// allows Drawer to change which of two components above is rendered (updates store)
const mapDispatchToProps = dispatch => ({
    Infofunc: (loadInfo) => {
        dispatch(loadInfofunc(loadInfo));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Drawer);