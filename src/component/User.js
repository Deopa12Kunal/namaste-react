
//!passing props in functional components
const User =({name})=>{
    return(
        <div className="user-card">
            <h1>Name:{name}</h1>
            <h2>Email:deopakunal@gmail.com</h2>
            <h2>Phone no: 9675093681</h2>
            <h2>Address:Haldwani Uttarakhand</h2>
        </div>
    );
};
 export default User;