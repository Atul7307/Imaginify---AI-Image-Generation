import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import  Header  from "@/components/shared/Header";
import { TransformationForm } from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";


interface updateImageProps {
  params: Promise<{ id: string }>;
}

const UpdateImage = async ({ params }: updateImageProps) => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const { id } = await params;

  const user = await getUserById(userId);
  const image = await getImageById(id);

  if(userId !== image.author.clerkId) {
    redirect("/unauthorized");
  }

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default UpdateImage;
