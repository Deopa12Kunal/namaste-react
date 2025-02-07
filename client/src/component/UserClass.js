import React from "react";
class UserClass extends React.Component{
    //!receive props used in class based components
    constructor(props){
        super(props);
        //  console.log(this.props);
         this.state={
        userInfo:{
          name:"user",
          location :"Default Location",
          avatar_url:"http://locahost.com"
        }
             };
    }
    async componentDidMount(){
      const data = await fetch("https://api.github.com/users/Deopa12Kunal");
      const json = await data.json();
       this.setState({
        userInfo:json,
       });
      console.log(json);
    }
    render(){
     
         const{name, location,avatar_url}= this.state.userInfo;
        return(
        <div className="user-card">
          {/* <h1>Count:{this.state.count}</h1> */}
        {/* <button
          onClick={()=>{
            this.setState({
              count:this.state.count +1,
            });
          }}
          
          >Count Increase</button> */}
      <h2>Name:{name}</h2>
      <h2>{location}</h2>
      <h3>
        Contact:deopakunal@gmail.com
      </h3>
      <img src={avatar_url}/>
        </div>
        );
    };
};
export default UserClass;