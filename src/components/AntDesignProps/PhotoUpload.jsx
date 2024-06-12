import React, { useEffect, useState } from 'react';

const PhotoUpload = (
    { currentUrl, onFileUpload }
) => {
    const [previewImage, setPreviewImage] = useState(currentUrl);
    useEffect(() => {
        if(currentUrl) {
            setPreviewImage(currentUrl)
        }
    }, [currentUrl])
    
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setPreviewImage(URL.createObjectURL(img));
            onFileUpload(img)
        }
    };

    return (
        <div className="form-control" >
            <label>Ảnh đại diện</label>
            <input type="file" onChange={handleImageChange} />
            {previewImage && <img src={previewImage} alt="preview" style={{ width: 200, maxHeight: 200 }} />}
        </div>
    );
};

export default PhotoUpload;
