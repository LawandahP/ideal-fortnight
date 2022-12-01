import React, { useState } from 'react'
import { FiImage } from 'react-icons/fi';
import { GalleryContainer } from './elements'
import Modal from './modal';

const Gallery = ({data}) => {

    const [ openModal, setOpenModal] = useState(false);
    const [ tempImageSrc, setTempImgSrc ] = useState('')

    const getImg = (file_url) => {
        setOpenModal(true)
        setTempImgSrc(file_url)
    }

    return (
        <>
            <GalleryContainer>
                {data?.map((item) => (
                <div className="pics" key={item.id} onClick={() => getImg(item.file_url)}>
                        <img src={item.file_url} style={{width: '100%'}} />
                    </div>
                ))}
            </GalleryContainer>
            <Modal
                sx={{textAlign: "center"}}
                fullScreen
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={"Image Preview"}
                icon={<FiImage />}
            >
                <img src={tempImageSrc} style={{width: 'auto', height: '100%'}} />
            </Modal>
        </>
        
    )
}

export default Gallery