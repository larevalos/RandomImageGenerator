import React from 'react';
import {fetchAllImages} from 'actions/RandomImage'
import {connect} from 'react-redux';
import Swipy from 'components/Swipy'
import Grid from '@material-ui/core/Grid';

class randomImage extends React.Component {
    async componentDidMount(){
        // TODO this.props.showImageLoader()
        await this.props.fetchAllImages();
    }

    render(){
        return (
            <Grid container direction="row" className='mt-5'
                justify="center"
                alignItems="center">
                <Grid item md={6} sm={6} xs={6}>
                    {console.log('this is from props 2',this.props.allImages.value)}
                    {this.props.allImages.value && 
                        <Swipy cards={this.props.allImages.value}/>}
                </Grid>
            </Grid>
        )
    }

}


const mapStateToProps = ({randomImage}) => {
    const {allImages} = randomImage;
    return {allImages} 
};

export default connect(mapStateToProps,{fetchAllImages})(randomImage); //here is where all the stateProps are passed to the render prop
  
  