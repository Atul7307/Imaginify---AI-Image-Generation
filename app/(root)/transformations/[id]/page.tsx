import React from 'react'

const TransformationsPage =  ({params} : {params: {id: string}}) => {
  const {id} =   params;
  return (
    <div>
      Transformations Page: {id}
    </div>
  )
}

export default TransformationsPage
