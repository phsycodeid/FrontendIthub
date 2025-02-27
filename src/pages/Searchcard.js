import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Searchcard extends React.Component{
    constructor(){
     super();
     //mengirimkan state ke bagian render 
     //props itu berbentuk objek
     this.state = {
       items : []
     };
   
   }

   componentDidMount(){
    var token = localStorage.getItem('Authorization');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`http://localhost:3000/myhire/search/?skill=${this.props.title}`)
    .then(data => this.setState({ items : data }))
    let login = localStorage.getItem('Login');
    if(login == 0){
        this.setState({
            isLogin: '0'
        });
    }
}


     render(){
        const {items} = this.state
        return( 
  
            <div className="row">
           
     {items.map((item, index) =>
    
      <div className="col-md-3">   
        <div className="card"> 
        
         <li key ={index} style={{listStyle : 'none'}}>
         <div className="card-header">
         <div className="card-title">{item.name}</div>
             {/* <h1>{item.name}</h1> */}
             
             </div>
             <img src={`http://localhost:5000/myhire/file/`+item.photo} style={{width : '100%', height : 200, objectFit : 'cover'}}/>
             <div className="card-body">
                        <h5 className="card-title mb-3">{item.profession}</h5>
                        <p className="card-text">{item.location}</p>
                        <p className="card-text">{item.skill}</p>
                        
                        <Link to={`/profile/${item.created_by}`} className="btn btn-primary" onClick={this.getUsers}>View More</Link>
                        <Link to={`/edit/${item.created_by}`} className="btn btn-primary" onClick={this.getUsers}>Edit</Link>
                    </div>
          </li>
          
          </div>
          </div>
        )}
          </div>
            
      
           
       
        )
    }
}
export default Searchcard