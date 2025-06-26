import React from 'react'

const UpdateTransformationPage =  ({params} : {params: {id: string}}) => {
  const {id} =  params;
  return (
    <div>
      Transformation Update Page: {id}
    </div>
  )
}

export default UpdateTransformationPage
