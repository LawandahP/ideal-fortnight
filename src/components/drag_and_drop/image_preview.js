import React, { useEffect, useState } from 'react'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { FiX } from 'react-icons/fi'

const ImagePreview = ({images}) => {
    const [image_urls, setImageUrls] = useState([])
    
    const handleFileRemove = (file) => {
        const updatedList = [...image_urls];
        updatedList.splice(image_urls.indexOf(file), 1);
        setImageUrls(updatedList);
    }

    useEffect(() => {
        const fileArray = Array.from(images).map((image) => URL.createObjectURL(image))
        setImageUrls(fileArray)

        return () =>  Array.from(images).map((image) => URL.revokeObjectURL(image))
    }, [images])

    return (
        <ImageList
            rowHeight={250}
            sx={{
                '&.MuiImageList-root': {
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))!important'},
                mt: 3,
                mb: 2
            }}
            >
            {image_urls.map((file, index) => (
                <ImageListItem key={index} cols={1} rows={1}>
                    <img src={file} alt="gallery" loading="lazy" style={{height: '100%'}} />
                    <ImageListItemBar
                        position="top"
                        sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                        }}
                        actionIcon={
                        <IconButton
                            sx={{ color: 'white' }}
                            onClick={() => handleFileRemove(file)}
                        >
                            <FiX />
                        </IconButton>
                        }
                    ></ImageListItemBar>
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default ImagePreview

