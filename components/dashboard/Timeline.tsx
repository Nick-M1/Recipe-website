import Image from "next/image";
import TitleSection from "./TitleSection";

const publicIcon = (
    <span className="inline-flex items-center text-xs font-normal text-gray-500">
        <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
        </svg>
        Public
    </span>
)

const privateIcon = (
    <span className="inline-flex items-center text-xs font-normal text-gray-5000">
        <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path>
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
        </svg>
        Private
    </span>
)

const timelineData = [
    {
        day: 'January 13th, 2022',
        info: [
            {
                title: "Jese Leos commented on your recipe of 'Chicken Alfredo Pasta'",
                description: '"Wow, this is a must try. Genuinely amazing"',
                img: '/profile-pic-examples/profile-picture-1.jpg',
                isPublic: true
            },
            {
                title: "Bonnie Green likes your recipe of 'Chicken Tikka Masala'",
                description: '',
                img: '/profile-pic-examples/profile-picture-3.jpg',
                isPublic: false
            },
        ]
    },
    {
        day: 'January 12th, 2022',
        info: [
            {
                title: "Laura Romeros commented on your recipe of 'Chicken Tikka Masala'",
                description: '"A must try !!"',
                img: '/profile-pic-examples/profile-picture-4.jpg',
                isPublic: false
            },
            {
                title: "Mike Willi likes your recipe of 'Shepherd's Pie'",
                description: '',
                img: '/profile-pic-examples/profile-picture-2.jpg',
                isPublic: true
            },
            {
                title: "Jese Leos commented on your recipe of 'Shepherd's Pie'",
                description: '"Amazing recipe. The kids loved it"',
                img: '/profile-pic-examples/profile-picture-5.jpg',
                isPublic: true
            },
            {
                title: "Bonnie Green commented on your recipe of 'Chicken Alfredo Pasta'",
                description: '"I make this at least twice a week. So easy to make and tastes great"',
                img: '/profile-pic-examples/profile-picture-3.jpg',
                isPublic: false
            },
        ]
    }
]

export default function Timeline() {
    return (
        <div className='px-2 md:px-6 mt-4'>
            <TitleSection titleText={'Timeline:'} titleImg={'/timeline.png'} small={true} withSideparagraph={false}/>
            { timelineData.map( (dayData) => (
                <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 drop-shadow-sm hover:border-teal-300 smooth-transition" key={dayData.day}>
                    <time className="text-lg font-semibold text-gray-900">{ dayData.day }</time>
                    <ol className="mt-3 divide-y divider-gray-200">
                        { dayData.info.map( (timelineItem, timelineItemIdx) => (
                            <li key={timelineItemIdx}>
                                <a href="#" className="items-center block p-3 sm:flex rounded-lg hover:bg-gray-100 smooth-transition" >
                                    <Image className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0" src={timelineItem.img} alt="Profilepic" width={300} height={300}/>
                                    <div className="text-gray-600">
                                        <div className="text-base font-normal font-medium text-gray-900">{ timelineItem.title }</div>
                                        { timelineItem.description != '' && <div className="text-sm font-normal truncate">{timelineItem.description}</div>}
                                        { timelineItem.isPublic ? publicIcon : privateIcon }
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </div>
    )
}