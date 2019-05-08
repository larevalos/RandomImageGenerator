import React, {Component} from "react";
import Swipeable from "react-swipy"
import Card from "components/Card";
import Button from "components/Button";
import {likeDislike} from 'actions/RandomImage'
import {connect} from 'react-redux';

const wrapperStyles = {position: "relative", width: "500px", height: "400px"};
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

class Swippy extends Component {
  state = {
    cards: this.props.cards//.map(value => {

  };

  onlikeDislike = (response,id) =>{
    var values = {
        orientation: response,
        id: id
    }
    this.props.likeDislike(values);
  }

  remove = () =>
    this.setState(({cards}) => ({
      cards: cards.slice(1, cards.length),
    }));

  render() {

    const {cards} = this.state;

    return (
      <div> 
        <div style={wrapperStyles}>
          {cards.length > 0 ? (
            <div style={wrapperStyles}>               
              <Swipeable
                buttons={({left, right}) => (
                  <div style={actionsStyles}>
                    <Button onClick={left}>Dislike</Button>
                    <Button onClick={right}>Like</Button>
                  </div>
                )}
                onAfterSwipe={this.remove}
                onSwipe={(response)=>this.onlikeDislike(response,cards[0].id)}
              >
                <Card>{cards[0].url}</Card>
              </Swipeable>
              {cards.length > 1 && <Card zIndex={-1}>{cards[1].url}</Card>}
            </div>
          ) : (
            <Card zIndex={-2} noCard={true}>No more cards</Card>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({randomImage}) => {
    const {allImages} = randomImage;
    return {allImages} 
};

export default connect(mapStateToProps,{likeDislike})(Swippy);
;