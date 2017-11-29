import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'
import { findCommentsById } from '../helpers/findCommentsById'
import { setCurrentComments, addComment, fetchCommentsAction } from '../actions/venues.js'
import VenuesApi from "../services/venuesApi";
import CommentList from './CommentList'




class CommentContainer extends Component {

  state = {
    comment: '',
    name: '',
    id: parseInt(this.props.match.params.id, 10),
  }

  // getDate = () => {
  //   const dateObj = new Date();
  //   const month = dateObj.getUTCMonth() + 1;
  //   const day = dateObj.getUTCDate();
  //   const year = dateObj.getUTCFullYear();
  //   const newDate = month + "/" + day + "/" + year;
  //   return newDate
  // }

  handleSubmitComment = (event) => {
    event.preventDefault()
    const commentObj = {
      comments: this.state.comment,
      user_name: this.state.name,
      id: this.state.id
    }
    this.props.addComment(commentObj)

    VenuesApi.postComments(commentObj)
    .then(
      this.setState({
        comment: '',
        name: ''
      })
    )
  }

  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value
    })
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }


  render(){
    return(
      <div className="comment-form-wrapper">
        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          <Comment>
            <Comment.Content>
              <Comment.Author as={this.state.name}></Comment.Author>

              <Comment.Text>{this.state.comment}</Comment.Text>
              <Comment.Actions>
              </Comment.Actions>
              <Input placeholder="Your Name Here" onChange={this.handleNameChange} value={this.state.name}/>
            </Comment.Content>
          </Comment>
          <Form reply>
            <Form.TextArea onChange={this.handleCommentChange} value={this.state.comment}/>
            <Button onClick={this.handleSubmitComment} content='Add Comment' labelPosition='left' icon='comment' primary />
          </Form>
        </Comment.Group>
        < CommentList id={this.state.id}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    venues: state.venues,
    currentComments: state.currentComments
  })
}

const mapDispatchToProps = {
  setCurrentComments,
  addComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)
