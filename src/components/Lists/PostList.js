import React from 'react';
import '../../App.css';
import { Card, Form, Badge, Tabs, Tab,Nav } from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {FaRegCommentDots,FaRegCalendarAlt} from 'react-icons/fa'
import {RiStarSmileLine,RiChatSmile2Fill} from 'react-icons/ri'
import CommentReply from '../Posts/CommentReply'
import PostAvatar from '../Posts/PostAvatar'
import PostLinks from '../Posts/PostLinks'
import {FiThumbsUp,FiThumbsDown} from 'react-icons/fi'

class PostList extends React.Component {

componentDidMount() {
  axios.get('http://localhost:4000/users/getUsers')
  .then((response)=>{
      this.setState({users: response.data.users})
  })
  .catch((error)=>{
      console.log(error);
  });


  axios.get('http://localhost:4000/posts/getPosts')
  .then((response)=>{
      this.setState({posts: response.data.posts})
  })
  .catch((error)=>{
      console.log(error);
  });
}

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      toggle:false
    };

  } 

  openComments(e){
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
  }

   myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


render(){
  var{users} = this.state;
  var{posts} = this.state;

  return (
     <div>
        {/* POST TAB */}
          <Card.Footer className="-post-header-card"/>
          {posts.reverse().map(post=>  (
            <div key={post._id}>    
            {/* <Card.Footer className="-post-header-card"/> */}
              <Card className='feedPost'>

                <Card.Body>          
                  <div className="-u-prof-stats" id="social-user">
                      {/* <span className="avatar-wrapper-left"><a href="/profile" className="post-user-profile" target="_blank"><PostAvatar/></a></span> */}
                      <span className="username-wrapper"><a href="/profile">{post.user} <b className="user-score-post-tag">1,231</b> {/*{post._id}*/}</a></span><hr/>
                      {/* <ProfileURL/> */}
                  </div>
    
                  <Card.Text className="fontPost">
                   {post.post} <br/>
                   
                   <div className="-user-tag">
                    <RiChatSmile2Fill/>{post.tags.map(tag=>  (
                    <div key={tag.value} className="-user-tag">   
                      <a href="/profile">@{tag.label}</a> 
                    </div>
                          ))}
                   </div>
                  </Card.Text>
                  <big  className="text-muted-society">#{post.category}</big> <Badge variant="primary">Admin</Badge> <Badge variant="secondary">Member</Badge><br></br>
                  <big  className="text-muted">{moment(post.time).format("H:mma - MMM Do, YYYY.")}</big>
                  <div className="post-interactions">
                  <div><hr/>
                      <span className="voting-btn"><FiThumbsUp id="thumb-up" size={20}/></span><span className="voting-btn"><FiThumbsDown id="thumb-down" size={20}/></span>
                      <span className="voting-btn"><FaRegCommentDots size={20} onClick={()=>{this.setState({toggle:!this.state.toggle})}} className="feed-comment"/></span><PostLinks/>

                      {
                        this.state.toggle ? <div  className="-post-reply-comment-div"><CommentReply/></div> : null
                      }
                  </div>
                  </div>
                </Card.Body>  
              </Card>
              
      <br></br>
      <br></br>
        </div>
      ))}
  </div>

   );
}
}


export default PostList;