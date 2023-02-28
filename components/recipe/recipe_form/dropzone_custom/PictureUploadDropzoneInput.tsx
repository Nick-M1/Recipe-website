import React from 'react';
import {IInputProps} from "react-dropzone-uploader";

export default function PictureUploadDropzoneInput({files, labelClassName, labelWithFilesClassName, labelWithFilesStyle, withFilesContent, style, className, content, getFilesFromEvent, labelStyle, onFiles, accept, multiple, extra, disabled}: IInputProps) {
    return (
        <label
            className={files.length > 0 ? labelWithFilesClassName : labelClassName}
            style={files.length > 0 ? labelWithFilesStyle : labelStyle}
        >
            {files.length > 0 ? withFilesContent : content}
            <input
                className={className}
                style={style}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                hidden={true}
                onChange={async e => {
                    const target = e.target
                    const chosenFiles = await getFilesFromEvent(e)
                    onFiles(chosenFiles)
                    //@ts-ignore
                    target.value = null
                }}
            />
        </label>
    )
}