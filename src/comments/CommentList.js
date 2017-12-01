import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment } from 'semantic-ui-react'
import {   fetchCommentsAction, addComment } from '../actions/venues.js'
import { findCommentsById } from '../helpers/findCommentsById'


class CommentList extends Component {

  componentDidMount(){
    this.props.fetchCommentsAction(this.props.id)
  }

  showComments = () => {
    if(this.props.currentComments){
      return findCommentsById(this.props.id, this.props.currentComments).reverse().map((comment, idx) => {
        return (
          <Comment key={idx} className="display-comment-content">
            <Comment.Content>
              <Comment.Author><strong>{comment.user_name}</strong></Comment.Author>
              <Comment.Text>{comment.comments}</Comment.Text>
            </Comment.Content>
          </Comment>
        )
      })
    }
  }

  render(){
    return(
      <div className="display-comment-div">
        {this.showComments()}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return ({
    currentComments: state.currentComments
  })
}

const mapDispatchToProps = {
  addComment,
  fetchCommentsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
