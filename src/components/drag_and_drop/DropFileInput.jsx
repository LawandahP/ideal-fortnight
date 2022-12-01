import React, { useCallback, useEffect, useRef, useState } from 'react';

import './drop-file-input.css';
import { useDropzone } from 'react-dropzone'
import ImagePreview from './image_preview';


const DropFileInput = ({files, setFiles}) => {

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles)
    }, [])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {'image/*': []}
    })
    
    return (
        <div>
            <div className="drop-file-input">
                <div style={{padding: "16px"}} className="drop-file-input__label" {...getRootProps()}>
                    <input {...getInputProps()} multiple />
                    {   
                        isDragActive ? 
                        <h6 style={{color: "green"}}>Drop Files Here</h6> :
                        <h6>Drag n' Drop or Click to Select Files</h6>
                    }
                    <em>*.jpeg, *.jpg and *.png images acceptable</em>
                </div>
            </div>
            <ImagePreview images={files} />
        </div>
        
    );
}

export default DropFileInput;




// reader.onloadend = () => {
//     setImageSrc(reader.result)
//     setValues({
//         ...values,
//         image
//     })
// }