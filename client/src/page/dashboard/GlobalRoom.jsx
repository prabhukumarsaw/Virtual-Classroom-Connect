import React from 'react'
import Card from '../../components/Card.jsx'
import { userData } from "../../assets/data.jsx";
import AllUsers from './AllUsers.jsx'
import Title from '../../components/Title.jsx';

const Home = () => {


    const cards = [
        { id: 1, title: 'Card 1', imageUrl: 'https://cdn.pixabay.com/photo/2023/09/09/09/03/cheetah-8242729_1280.png' },
        { id: 2, title: 'Card 2', imageUrl: 'https://robohash.org/CBP.png?set=set2' },
        { id: 3, title: 'Card 3', imageUrl: 'https://robohash.org/CBP.png?set=set3' },
        { id: 4, title: 'Card 4', imageUrl: 'https://robohash.org/CBP.png?set=set4' },
        { id: 5, title: 'Card 5', imageUrl: 'https://robohash.org/CBP.png?set=set5' },
        { id: 6, title: 'Card 6', imageUrl: 'https://robohash.org/CBP.png?set=set6' },
        { id: 7, title: 'Card 7', imageUrl: 'https://robohash.org/CBP.png?set=set7' },
        { id: 8, title: 'Card 8', imageUrl: 'https://robohash.org/CBP.png?set=set87' },
        { id: 9, title: 'Card 9', imageUrl: 'https://robohash.org/CBP.png?set=set9' },
        { id: 10, title: 'Card 10', imageUrl: 'https://robohash.org/CBP.png?set=set10' },
      ];


  return (
    <>

    
    
    <div className="flex-grow flex overflow-x-hidden">
    
    <div className="flex-grow dark:bg-gray-900 overflow-y-auto bg-cover bg-center" >
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 m-4">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} imageUrl={card.imageUrl} />
        ))}
      </div>
      </div>
      <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
      

        <div className="text-xs text-gray-400 tracking-wider">Users Community</div>
        <div className="relative mt-2">
          <input type="text" className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" />
          <svg viewBox="0 0 24 24" className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div className="space-y-4 mt-3">
          <AllUsers userData={userData}/>
          
        </div>
      </div>
      </div>
    </>
   
     
  )
}

export default Home