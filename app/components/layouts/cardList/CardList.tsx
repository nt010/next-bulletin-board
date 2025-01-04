import React from 'react'
import Cards from '../card/Cards'
import { BBSData } from '@/app/types/type'

interface BBSDataProps {
  bbsAllData: BBSData[];
}

const CardList = ({bbsAllData}: BBSDataProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bbsAllData.map((bbsData: BBSData) => (
        <Cards key={bbsData.id} bbsData={bbsData} />
      ))}
    </div>
  )
}

export default CardList;