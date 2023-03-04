import Image from "next/image";
import Link from "next/link";

type Props = {
    author: UserDB
}

export default function ProfilePopup({ author }: Props) {
    return (
        <div className="absolute z-10 inline-block w-72 text-sm font-light text-gray-500 bg-white border border-gray-200 rounded-lg shadow-md drop-shadow-md">
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <Link href={`profile/${author.id}`}>
                        <Image
                            className="w-10 h-10 rounded-full"
                            src={author.pic}
                            alt="profile pic"
                            height={300} width={300}
                        />
                    </Link>
                    <div>
                        <button type="button" className="text-white btn-primary text-xs px-3 py-1.5">
                            Follow
                        </button>
                    </div>
                </div>
                <p className="text-base font-semibold leading-none tracking-wide text-gray-900">
                    <Link href={`profile/${author.id}`}>{ author.name }</Link>
                </p>
                <p className="mb-3 text-sm font-normal">
                    <Link href={`profile/${author.id}`} className="hover:underline">@{author.name.replace(' ', '').replace('-', '')}</Link>
                </p>
                <p className="mb-4 text-sm font-light line-clamp-2">
                    { author.biography }
                </p>
                <div className="flex justify-between text-sm font-light">
                    <a href="#" className="hover:underline">
                        <span className="font-semibold text-gray-900 mr-1">799</span>
                        <span>Following</span>
                    </a>
                    <a href="#" className="hover:underline mr-1">
                        <span className="font-semibold text-gray-900 mr-1">3,758</span>
                        <span>Followers</span>
                    </a>
                </div>
            </div>
        </div>
    );
}