import React from 'react';
import '../../App.css';
import {Tabs, Tab } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import Post from '../Common/CreateDiscussion'
import Discussion from '../Common/StartDiscussion'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Recommended from '../Lists/Recommended'
import {HiPencilAlt} from 'react-icons/hi'
import {MdForum} from 'react-icons/md'
import Contributors from '../Lists/Contributors'
import PostList from '../Lists/PostList'
import DiscussionList from '../Lists/DiscussionList'

import EventsList from '../Lists/EventsList'

class Feed extends React.Component {

render(){
  return (
     <div>
      <div className="containerFeedLeft">

      </div>
      <div className="containerFeedMiddle">

      <Tabs defaultActiveKey="post" id="uncontrolled-tab-example" >

        {/* POST TAB */}
        <Tab default eventKey="post" title={<HiPencilAlt size={25}/>} className="tab-options">
          <Post/>
          <PostList/>
        </Tab>

        {/* DISCUSSION TAB */}
        <Tab eventKey="discussion" title={<MdForum size={25}/>} className="tab-options">
          <Discussion/>
          <DiscussionList/>
        </Tab>

        {/* EVENT TAB */}
        <Tab eventKey="events" title={<FaRegCalendarAlt size={25}/>} className="tab-options">
          <EventsList/>
        </Tab>
      </Tabs>
  
        {/* Back to top */}
        <a id="button"></a>
        <div className="spacing"></div>
         
      {/* <div class="anchor"><p>You reached the end. Back to <a href="#top">top</a></p></div> */}
  </div>

  <div className="containerFeedRight">
    <Recommended/>  
    <Contributors/>  
  </div>
  </div>
  );
}
}


export default Feed;