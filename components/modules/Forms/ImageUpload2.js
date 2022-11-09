import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

function ImageUpload2({
  label = "Postez vos photos",
  initialImage = null,

  accept = "image/png, image/jpg, image/jpeg",
  sizeLimit = 10 * 1024 * 1024, // 10MB
  onChangePicture = () => null,
}) {
  const [files, setFile] = useState([]);

  // const form = event?.currentTarget;
  // const fileInput = Array.from(form.elements).find(
  //   ({ name }) => name === "file"
  // );
  const handleOnChange = () => {
    null;
  };
  const handleFile = (e) => {
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType) && file[i].size <= sizeLimit) {
        setFile([...files, file[i]]);
        console.log(files[i]?.name, "ajouté");
      } else {
        console.log("l'image ne respecte pas le format autorisé");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
    console.log(i);
  };

  return (
    <>
      <div className=" grid  p-2">
        <div className="p-3 w-full bg-white rounded-md">
          <span className=" text-[12px] mb-1 ">{label}</span>
          <div className="h-32 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
              multiple="multiple"
              name="files[]"
            />
            <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col">
                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                <span className="text-xs lg:text-sm">
                  Glissez et déposez vos fichier ici
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {files.map((file, key) => {
              return (
                <div key={key} className="overflow-hidden relative h-40 w-40">
                  <i
                    onClick={() => {
                      removeImage(file.name);
                    }}
                    className="absolute top-0 right-0  cursor-pointer z-30 text-red-600 font-semibold p-1 "
                  >
                    X
                  </i>
                  <Image
                    src={URL.createObjectURL(file)}
                    layout="fill"
                    className="z-0"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
ImageUpload2.propTypes = {
  label: PropTypes.string,
  initialImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
  onChangePicture: PropTypes.func,
};
export default ImageUpload2;
