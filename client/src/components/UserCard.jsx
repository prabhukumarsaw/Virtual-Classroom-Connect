import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const UserCard = ({user, openModal}) => {
  return (
    <Link onClick={openModal} className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white  w-full">
              <img src={user.imageUrl} className="w-7 h-7 mr-2 rounded-full" alt="profile" />
              {user.name}
              <Link className="ml-auto text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md hover:bg-slate-200">+ Add</Link>
            </div>
              

          </Link>
  )
}

export default UserCard