'use client'
import {ILayoutProps} from "react-dropzone-uploader";

export default function PictureUploadDropzoneLayout({ input, dropzoneProps }: ILayoutProps) {
    return (
        <div {...dropzoneProps}>
            {input}
        </div>
    )
}