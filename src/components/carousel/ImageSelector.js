import React, {useState} from 'react'


const ImageSelector = ({images}) => {

  const [ selectedImage, setSelectedImage ] = useState();

  return (
       <div className='container'>
        <div>
          <div className="display-img">
            <img src="https://images.pexels.com/photos/6634336/pexels-photo-6634336.jpeg?auto=compress&cs=tinysrgb&w=600" />
          </div>
         
            <div className="small-img-group">
              {images?.map((image) => (
                <div className="small-img">
                  <img src={image?.file_url} />
                </div>
              ))}
            </div>
          </div>
      </div>   
  )
}

export default ImageSelector