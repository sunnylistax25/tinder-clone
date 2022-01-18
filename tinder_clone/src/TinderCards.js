import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './TinderCards.css'
import axios from './axios'

function TinderCards() {
    const [people, setPeople] = useState([]);

    //componentDidMount if this was a class based.
    useEffect(() =>{ //when the tinder card loads this is gonna run once and execute the code only once
        async function fethcData(){
            const req = await axios.get('/tinder/cards')

            setPeople(req.data); 
        }

        fethcData()
    }, [])
    console.log(people)

    const swiped = (direction, nameToDelete) =>{
        console.log("removing: " + nameToDelete);
        //setLastDirection(direction)
    }
    const outOfFrame=(name) =>{
        console.log(name + " left the screen!");
    }

    return (
        <div className='tinderCards'>
            <div className='tinderCards_cardContainer'>
                {people.map((person) =>(
                <TinderCard
                className='swipe'
                key={person.name}
                preventSwipe={['up','down']}
                onSwipe={(dir) => swiped(dir, person.name)}
                onCardLeftScreen={() => outOfFrame(person.name)}
                >
                    <div
                    style= {{ backgroundImage: `url(${person.imgUrl})` }}
                    className='card'
                    >
                        <h3>{person.name}</h3>
                    </div>
                    
                </TinderCard> 
                ))}
            </div>
        </div>
    )
   
}

export default TinderCards
