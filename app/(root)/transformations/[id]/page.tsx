import React from 'react'

const TransformationsPage = async ({params} : {params: {id: string}}) => {
  const {id} =  await params;
  return (
    <div>
      Transformations Page: {id}
    </div>
  )
}

export default TransformationsPage
