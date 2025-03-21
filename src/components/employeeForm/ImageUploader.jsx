import ImagePlaceholder from 'src/assets/imagePlaceholder.svg?react'
import DeleteImageButton from 'src/assets/deleteImage.svg?react'
import { useRef } from 'react';

const ImageUploader = ({
                           label,
                           imagePreview,
                           validation,
                           onFileChange,
                           onDeleteImage
                       }) => {
    const fileInputRef = useRef(null);

    const handleSvgClick = () => {
        fileInputRef.current.click();
    };

    const getBorderColor = () => {
        if (!validation.touched) return 'border-[#CED4DA]';
        return validation.isValid ? 'border-[#08A508]' : 'border-[#FA4D4D]';
    };

    return (
        <div className='flex flex-col gap-[8px]'>
            <div className='text-[#343A40] text-sm font-medium'>{label}*</div>
            <div className={`h-[120px] flex flex-col justify-center items-center border rounded-[8px] border-dashed ${getBorderColor()}`}>
                {imagePreview ? (
                    <div className='relative'>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className='w-[88px] h-[88px] rounded-full object-cover'
                        />
                        <DeleteImageButton className='cursor-pointer absolute right-0 bottom-[-5px]' onClick={onDeleteImage} />
                    </div>
                ) : (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={onFileChange}
                            style={{ display: "none" }}
                        />
                        <ImagePlaceholder onClick={handleSvgClick} className="cursor-pointer" />
                    </>
                )}
                {validation.touched && !validation.validSize && (
                    <p className="text-[10px] text-[#FA4D4D] mt-2">ფაილი უნდა იყოს 600KB-ზე ნაკლები</p>
                )}
                {validation.touched && !validation.validType && (
                    <p className="text-[10px] text-[#FA4D4D] mt-2">აირჩიეთ სურათის ფაილი</p>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;