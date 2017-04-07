import React, { Component } from 'react';
import '../App.css';

class NameChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {newName: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    handleChange(event) {
        this.setState({ newName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var newName = this.state.newName;
        this.props.onChangeName(newName);
        this.setState({newName: ''});
    }

      render() {
      return(
          <div className='nameChange-form-div'>
              <h3> Change Name </h3>
              <form onSubmit={this.handleSubmit}>
                  <input
                      onChange={this.handleChange}
                      value={this.state.newName}
                  />
              <button>Change Name</button>
              </form>  
          </div>
      );
  }
}

export default NameChangeForm;