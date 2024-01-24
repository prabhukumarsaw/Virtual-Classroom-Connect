import React from 'react'
import Card from '../../components/Card'

const Home = () => {


    const cards = [
        { id: 1, title: 'Card 1', imageUrl: 'https://robohash.org/CBP.png?set=set1' },
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 m-4">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} imageUrl={card.imageUrl} />
        ))}
      </div>
  )
}

export default Home