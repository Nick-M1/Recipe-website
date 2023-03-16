'use client'
import {FacebookIcon, FacebookShareButton} from "react-share";

type Props = {
    urlToShare: string
}

export default function SocialShare({ urlToShare }: Props) {
    return (
        <div>
            <FacebookShareButton
                url={urlToShare}
                quote={'Dummy text!'}
                hashtag="#muo"
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
        </div>
    );
}