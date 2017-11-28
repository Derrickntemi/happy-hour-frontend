import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'
import { postCommentsAction } from '../actions/venues.js'


class CommentContainer extends Component {

  state = {
    comment: null,
    name: null,
    id: parseInt(this.props.match.params.id, 10),
  }

  getDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate = month + "/" + day + "/" + year;
    return newDate
  }

  handleSubmitComment = (event) => {
    event.preventDefault()
    const commentObj = {
      comment: {
        comment: this.state.comment,
        name: this.state.name,
        id: this.state.id
      }
    }
    if(this.props.venues.length > 0){
      this.props.postCommentsAction(commentObj)
      console.log("comment state", this.state)
    }
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
              <Comment.Metadata>
                <div>{this.getDate()}</div>
              </Comment.Metadata>
              <Comment.Text>{this.state.comment}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
              <Input placeholder="Your Name Here" onChange={this.handleNameChange}/>
            </Comment.Content>
          </Comment>
          <Form reply>
            <Form.TextArea onChange={this.handleCommentChange}/>
            <Button onClick={this.handleSubmitComment} content='Add Comment' labelPosition='left' icon='comment' primary />
          </Form>
        </Comment.Group>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    venues: state.venues,
  })
}

const mapDispatchToProps = {
  postCommentsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)
