
import { toast } from "sonner"
import { CldImage, CldUploadWidget } from "next-cloudinary"
import React from "react"
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    type: string;
    image: string;
    title:string;
}


const MediaUploader = ({
    onValueChange,
    title,
    setImage,
    publicId,
    type,
    image
}: MediaUploaderProps) => {
    const onUploadSuccessHandler = (result: any) => {

        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            secureURL: result?.info?.secure_url,
            width: result?.info?.width,
            height: result?.info?.height,

        }))

        onValueChange(result?.info?.public_id)

        toast("Media uploaded successfully!", {
            description: "1 Credit was deducted from your account.",
            className: 'success-toast',
            duration: 5000,
        })

    }

    const onUploadErrorHandler = (error: any) => {
        console.error("Upload failed:", error)
        toast("Failed to upload media.", {
            description: "Please try again.",
            //   action: {
            //     label: "Undo",
            //     onClick: () => console.log(""),
            //   },
            className: 'error-toast',
            duration: 5000,
        })
    }


    return (
        <CldUploadWidget
            uploadPreset="Imaginify"
            options={{
                maxFiles: 1,
                multiple: false,
                showPoweredBy: false,
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    <h3 className="h3-bold text-dark-600">Original</h3>

                    {publicId ? (
                        <>
                            <div className="cursor-pointer overflow-hidden rounded-[10px]">
                                <CldImage 
                                width={getImageSize(type, image, "width")}
                                height={getImageSize(type, image, "height")}
                                src={publicId}
                                alt="Image"
                                sizes={"(max-width: 767px) 100vw,  50vw"}
                                placeholder={dataUrl as PlaceholderValue}
                                className="media-uploader_cldImage"
                                />

                            </div>
                        </>
                    ) : (
                        <div className="media-uploader_cta"
                            onClick={() => open?.()}>
                            <div className="media-uploader_cta_image">
                                <Image
                                    src="/assets/icons/add.svg"
                                    alt="Add Image"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <p className="p-14-medium">Click here to Upload Image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default MediaUploader
