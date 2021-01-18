import React, { Component } from 'react'
export default class Option extends Component {
    constructor(props){
        super(props)
       
    }
    render() {
        return (
            <div>
                {this.props.optionText}
            </div>
        )
    }
}
