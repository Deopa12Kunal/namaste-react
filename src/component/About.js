import User from "./User"; 
import UserClass from "./UserClass";
const About =()=>{
return(
<div>
    {/* <User name={"KUNAL SINGH DEOPA"}/> */}
    {/* passing props in class based  components */}
<UserClass name={"Kunal Deopa"}  location={"Nainital, Uttarakhand"}/>
</div>
);

};
 export default About;