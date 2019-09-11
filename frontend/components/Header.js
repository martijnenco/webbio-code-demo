import React from 'react';
import AppBar from '@material-ui/core/AppBar/index';

import Toolbar from '@material-ui/core/Toolbar/index';
import Button from '@material-ui/core/Button/index';

import {Link} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" align="right" href={'#'}><Link to="/">Home</Link></Button>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  };
}

export default Header;
