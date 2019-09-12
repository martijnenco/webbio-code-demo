import React from 'react';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Button from '@material-ui/core/Button/index';

import {Link} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" align="right" href={'#'}><Link to="/">Home</Link></Button>
        </Toolbar>
      </AppBar>
    );
  };
}

export default Header;
