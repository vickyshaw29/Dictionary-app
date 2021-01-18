import React, { Component } from 'react'

export default class Action extends Component {
    constructor(props) {
        super(props)
        this.submitHandler=this.submitHandler.bind(this)
    }
    submitHandler(e){
        e.preventDefault();
        const title=e.target.search.value
        e.target.search.value=""
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="search" name="search" />
                    <button type="submit">search</button>
                </form>
            </div>
        )
    }
}
