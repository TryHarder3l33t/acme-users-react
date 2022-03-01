import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    const users = (await axios.get("/api/users")).data;
    this.setState({ users });
    console.log(users);
  }
  render() {
    const { users } = this.state;
    return (
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    );
  }
}

export default App;
