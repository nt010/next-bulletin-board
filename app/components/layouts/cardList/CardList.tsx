import React from 'react'
import Cards from '../card/Cards'
import { BBSData } from '@/app/types/type'

interface BBSDataProps {
  bbsAllData: BBSData[];
}

const CardList = ({bbsAllData}: BBSDataProps) => {
  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {bbsAllData.map((bbsData: BBSData) => (
        <Cards key={bbsData.id} bbsData={bbsData} />
      ))}
    </div>
  )
}

export default CardList;