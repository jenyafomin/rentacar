// React Imports
import { useMemo, useState } from "react";

// MUI Imports
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

// Third-party Imports
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

import { StepComponentProps } from "@/front/components/dialogs/wizzard/renderStep";
import PrevNextSubmitBtns from "@/front/components/dialogs/wizzard/prevNextSubmitBtns";
import FileList from "@/front/components/files/File.list";
import { FileProp } from "@/front/types/file";
import { ICar } from "types/Car";
import { UploadForm } from "@/front/components/files/Upload.form";

export default function FileUploaderMultiple({
  activeStep,
  handleNext,
  handlePrev,
  isLastStep,
  extraState,
  setExtraState,
}: StepComponentProps<
  ICar,
  { images: Array<FileProp>; uploadedImages: Array<FileProp> }
>) {
  // States
  // Initialise the object, use state.images and extra
  const uploadedImages: Array<FileProp> = extraState.uploadedImages;
  const selectedImages: Array<FileProp> = extraState.images;

  function setImages(newImages: Array<FileProp>) {
    setExtraState({ ...extraState, uploadedImages: newImages });
  }

  function setSelectedImages(newImages: Array<FileProp>) {
    console.log("setSelectedImages", newImages);
    setExtraState({ ...extraState, images: newImages });
  }

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file: File) => {
      return {
        file: file,
        url: URL.createObjectURL(file),
      };
    });
    setSelectedImages([...selectedImages, ...newFiles]);
  }

  const onDropRejected = () => {
    toast.error("You can only upload 2 files & maximum size of 2 MB.", {
      autoClose: 3000,
    });
  }

  const handleRemoveFile = (index: number) => {
    const filtered = uploadedImages.filter(({ url }: FileProp, i: number) => {
      if (i !== index) {
        URL.revokeObjectURL(url);
        return true;
      }
      return false;
    });

    setImages(filtered);
  };

  const handleRemoveSelectedFile = (index: number) => {
    let newImage: FileProp[] = []; //use array in case if image was not found (and ts error - using newImage before assignment)
    const newSelectedImages = selectedImages.filter((image, i) => {
      if (i === index) {
        newImage.push(image);
        return false;
      }
      return true;
    });

    setExtraState({
      ...extraState,
      uploadedImages: [...uploadedImages, ...newImage],
      images: newSelectedImages,
    });
  };

  const onClickToSelect = (image: FileProp, index: number) => {
    // add the image to selectedImages
    const newSelectedImages = [...selectedImages, image];
    // remove the image from images without revoking the URL
    const newImages = uploadedImages.filter((_image, i) => i !== index);
    // update the state in a single operation to ensure consistency
    setExtraState({
      ...extraState,
      images: newSelectedImages,
      uploadedImages: newImages,
    });
  };

  return (
    <>
      {/* //## ## UPLOAD FILES */}
      <UploadForm onDrop={onDrop} onDropRejected={onDropRejected} />

      {/* //** SELECTED IMAGES */}
      {selectedImages.length !== 0 && (
        <div className="mt-4 uppercase text-lg font-bold">Selected Images:</div>
      )}
      <FileList
        files={selectedImages}
        handleRemoveFile={handleRemoveSelectedFile}
      />

      {/* //## ## DEVIDER */}
      {selectedImages.length !== 0 && uploadedImages.length !== 0 && (
        <hr
          className="mt-4 mb-8"
          style={{ background: "#AAA3", width: "100%", height: "1px" }}
        />
      )}

      {/* //** SAVED IMAGES */}
      {uploadedImages.length !== 0 && (
        <div className="mt-4 uppercase text-lg font-bold">Uploaded Images:</div>
      )}
      <FileList
        files={uploadedImages}
        handleRemoveFile={(i) => handleRemoveFile(i)}
        onClick={onClickToSelect}
      />

      {/* //## ## NEXT BUTTUNS */}
      <PrevNextSubmitBtns
        isLastStep={isLastStep}
        activeStep={activeStep}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </>
  );
}
