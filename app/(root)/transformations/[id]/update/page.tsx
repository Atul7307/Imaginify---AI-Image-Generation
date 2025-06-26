import React from 'react'

const UpdateTransformationPage = async ({params} : {params: {id: string}}) => {
  const {id} = await params;
  return (
    <div>
      Transformation Update Page: {id}
    </div>
  )
}

export default UpdateTransformationPage
