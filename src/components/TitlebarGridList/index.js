import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { createMuiTheme } from '@material-ui/core/styles';


const theme= createMuiTheme({
  palette: {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#eeeeee',
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
}
});

class TitlebarGridList extends React.Component {
  
  render(){
    return (
      <div className={theme.root}>
        <GridList cellHeight={180} className={theme.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">History</ListSubheader>
          </GridListTile>
          {this.props.data.map(tile => (
            <GridListTile key={tile.imageUrl}>
              <img  src={tile.imageUrl} alt={tile.liked} />
              <GridListTileBar
                title={tile.liked ? 'LIKED' : 'UNLIKED'}

              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  } 
  
}


export default TitlebarGridList;