import React, { Component } from 'react'
// import Option from './Option'
export default class Options extends Component {
    constructor(props){
        super(props)
        this.state={
            word:[]
        }
    }
    async componentDidMount(){
        const app_key= '0a6a5411630b59dfd662714574631b1e'
        const response=await fetch('http://localhost:8000/api/words',{
            method:"GET",
            headers:{
                app_key
            }
        })
        const data=await response.json()
        console.log(data)
        this.setState({word:[data]})
    }
   render(){
       return(
           <div>
               {this.state.word &&this.state.word.map((result)=>result.payload.map(val=>{
                   return(
                    //    console.log(val.data)
                       <div>
                           <h2>{val.word_id}</h2>
                           <h1>{val.data}</h1>
                           <h2>{val.id}</h2>
                       </div>
                   )
               }))}
           </div>
       )
   }
    
}
