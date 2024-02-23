import React from "react";
class UserClass extends React.Component{
    //!receive props used in class based components
    constructor(props){
        super(props);
         console.log(this.props);
    }
    render(){
         const{name, location}= this.props;
        return(
        <div className="user-card">
      <h2>Name:{name}</h2>
      <h2>{location}</h2>
      <h3>
        Contact:deopakunal@gmail.com
      </h3>
        </div>
        );
    };
};
export default UserClass;