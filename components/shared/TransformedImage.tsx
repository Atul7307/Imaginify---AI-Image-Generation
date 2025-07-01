
import { dataUrl, debounce, getImageSize } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react'

type TransformedImageProps = {
    image: any;
    type: string;
    title: string;
    isTransforming: boolean;
    setIsTransforming: (value: boolean) => void;
    transformationConfig: Transformations | null;
    hasDownload: boolean;

}

const TransformedImage = ({
    image,
    type,
    title,
    isTransforming,
    setIsTransforming,
    transformationConfig,
    hasDownload = false
}: TransformedImageProps) => {

    const downloadHandler = () => {

    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex-between">
                <h3 className="h3-bold text-dark-600">Transformed</h3>

                {hasDownload && (
                    <button
                        className='download-btn'
                        onClick={downloadHandler}
                    >
                        <Image
                            src="/assets/icons/download.svg"
                            alt="download"
                            width={24}
                            height={24}
                            className='pb-[6px]'
                        />

                    </button>
                )}
            </div>

            {/* TRANSFORMED IMAGE */}
            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt='Transformed Image'
                        placeholder={dataUrl as PlaceholderValue}
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false);
                        }}
                        onError={() => {
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false);
                            }, 8000)();
                        }}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        {...transformationConfig} // Image transformations
                        className="transformed-image"
                    />

                    {isTransforming && (
                        <div className="tranforming-loader">
                            <Image
                                src="/assets/icons/spinner.svg"
                                width={50}
                                height={50}
                                alt="spinner"
                            />
                            <p className="text-white/80">Please wait...</p>
                        </div>
                    )}
                </div>
            ) : (
                // TRANSFORMED IMAGE PLACEHOLDER
                <div className="transformed-placeholder">Transformed Image</div>
            )}

        </div>
    )
}


export default TransformedImage
