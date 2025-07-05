
import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import {TransformationForm} from '@/components/shared/TransformationForm'
import {auth} from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '@/components/shared/Loading'

const AddTransformationTypePage = async ({
  params,
}: {
  params: Promise<{ type: TransformationTypeKey }>
}) => {
  const { type } = await params;
  const {userId} = await auth();
  const transformation = transformationTypes[type];

  if (!transformation) {
    redirect('/404'); // Or return custom 404 JSX
  }


  if(!userId) redirect('/sign-in');

  const user = await getUserById(userId);

  return (

    <>
    <Header 
      title={transformationTypes[type].title}
      subtitle={transformationTypes[type].subTitle}
    />

    <section className="mt-10" >
        <Suspense fallback={<Loading />}>
          <TransformationForm
            action="Add"
            userId={user._id}
            type={transformation.type as TransformationTypeKey}
            creditBalance={user.creditBalance}
          />
        </Suspense>
      </section>
    </>
  )
}

export default AddTransformationTypePage 
