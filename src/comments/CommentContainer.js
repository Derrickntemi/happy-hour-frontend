import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'
import { setCurrentComments, addComment } from '../actions/venues.js'
import VenuesApi from "../services/venuesApi";
import CommentList from './CommentList'




class CommentContainer extends Component {

  state = {
    comment: '',
    name: '',
    id: parseInt(this.props.match.params.id, 10),
  }



  handleSubmitComment = (event) => {
    event.preventDefault()
    const commentObj = {
      comments: this.state.comment,
      user_name: this.state.name,
      venue_id: this.state.id
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
          <Form reply>
            <Input placeholder="Your Name Here" onChange={this.handleNameChange} value={this.state.name}/>
            <Form.TextArea onChange={this.handleCommentChange} value={this.state.comment}/>
            <Button onClick={this.handleSubmitComment} content='Add Comment' labelPosition='left' icon='comment' primary />
          </Form>
          < CommentList id={this.state.id}/>
        </Comment.Group>
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
