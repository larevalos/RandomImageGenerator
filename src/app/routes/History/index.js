import React from 'react';
import {fetchAllHistory} from 'actions/RandomImage'
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TitlebarGridList from 'components/TitlebarGridList';

class historyImage extends React.Component {
    async componentDidMount(){
        // TODO this.props.showImageLoader()
        await this.props.fetchAllHistory();
        
    }

    render(){
        return (
            <Grid container direction="row" className='mt-5'
                justify="center"
                alignItems="center">
                <Grid item md={6} sm={6} xs={6}>
                    {(this.props.allHistory.value) &&
                        <TitlebarGridList data={this.props.allHistory.value}></TitlebarGridList>
                        }
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({randomImage}) => {
    const {allHistory} = randomImage;
    return {allHistory} 
};

export default connect(mapStateToProps,{fetchAllHistory})(historyImage);