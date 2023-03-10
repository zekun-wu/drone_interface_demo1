import React, { Component } from 'react'

export default class DroneStats extends Component {
    state = {
      droneStats: [],
    };
  
    async componentDidMount() {
      const jsonData = await fetch('public/data/data.json');
      this.setState({ droneStats: jsonData });
    }
  
    render() {
      return this.props.children(this.state.droneStats);
    }
  }
  
