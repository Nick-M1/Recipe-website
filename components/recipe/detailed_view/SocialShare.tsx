'use client'
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton, PinterestIcon, PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

type Props = {
    urlToShare: string
    mediaImg: string
    quote: string
    hashtag: string
}

export default function SocialShare({ urlToShare, mediaImg, quote, hashtag }: Props) {
    return (
        <div className='flex gap-x-4'>
            <FacebookShareButton
                url={urlToShare}
                quote={quote}
                hashtag={hashtag}
            >
                <FacebookIcon size={32} round className='opacity-80 grayscale-[25%] hover:opacity-100 hover:grayscale-0 smooth-transition' />
            </FacebookShareButton>

            <TwitterShareButton
                url={urlToShare}
                title={quote}
                hashtags={[hashtag]}
            >
                <TwitterIcon size={32} round className='opacity-80 grayscale-[25%] hover:opacity-100 hover:grayscale-0 smooth-transition' />
            </TwitterShareButton>

            <WhatsappShareButton
                url={urlToShare}
                title={quote}
            >
                <WhatsappIcon size={32} round className='opacity-80 grayscale-[25%] hover:opacity-100 hover:grayscale-0 smooth-transition' />
            </WhatsappShareButton>

            <PinterestShareButton
                url={urlToShare}
                media={mediaImg}
                description={quote}
            >
                <PinterestIcon size={32} round className='opacity-80 grayscale-[25%] hover:opacity-100 hover:grayscale-0 smooth-transition' />
            </PinterestShareButton>

            <EmailShareButton
                url={urlToShare}
                subject={quote}
                body={quote}
            >
                <EmailIcon size={32} round className='opacity-80 grayscale-[25%] hover:opacity-100 hover:grayscale-0 smooth-transition' />
            </EmailShareButton>
        </div>
    );
}