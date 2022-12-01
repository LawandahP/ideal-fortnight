import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Greeting, GreetingsUserName } from './dashboardElements'


let currentDate = new Date();
currentDate = currentDate.getHours();
console.log("hour", currentDate)
let greeting='';

const cssStyle = {}

if (currentDate < 12)  {
        greeting='Good morning 🌞';
        cssStyle.color='green'

}   else if(currentDate < 18 ){
        greeting='Good afternoon 🕑';
        cssStyle.color='orange'

}   else if(currentDate < 20){
        greeting='Good evening 🌆'
        cssStyle.color='#ff4b5c'

}   else {
        greeting='Good night 🌃'
        cssStyle.color='#d92027'
}


const Greetings = () => {
    const readProfile = useSelector(state => state.readProfile)
	const { error, profile } = readProfile

    return(
        <Greeting>
            <> 
                
                <GreetingsUserName>
                    <span style={cssStyle}>Hi</span> {profile?.full_name},
                </GreetingsUserName>
                <span style={cssStyle}>{greeting}</span></>
        </Greeting>
    );
}
export default Greetings;