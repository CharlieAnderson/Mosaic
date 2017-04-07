import React, { Component } from 'react';
import '../App.css';

class UsersList extends Component {

  render() {
      return (
          <div className='usersList'>
              <h3> Online Users </h3>
              <ul>
                  {
                      this.props.users.map((user, i) => {
                          return (
                              <li key={i}>
                                  {user}
                              </li>
                          );
                      })
                  }
              </ul>                
          </div>
      );
  }
}

export default UsersList;