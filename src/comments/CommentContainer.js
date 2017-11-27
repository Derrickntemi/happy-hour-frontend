import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'


export default class CommentContainer extends Component {

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
    
  }

  render(){
    return(
      <div className="comment-form-wrapper">
        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>{this.getDate()}</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
              <Input placeholder="Your Name Here"/>
            </Comment.Content>
          </Comment>
          <Form reply>
            <Form.TextArea />
            <Button onClick={this.handleSubmitComment} content='Add Comment' labelPosition='left' icon='comment' primary />
          </Form>
        </Comment.Group>
      </div>
    )
  }

}
