import _ from "lodash";

type Props = {
    urlpathTo: string
    currentPage: number
    lastPage: number
}


/* todo: FIX URL WITH FUNCTION UTILS */
export default function Pagination({ urlpathTo, currentPage, lastPage }: Props) {

    const rangeOfPages = _.range(1, lastPage)
    const commasSegment = lastPage > 7

    if (commasSegment) {
        rangeOfPages.splice(3, lastPage - 8)
        rangeOfPages[3] = -1
    }

    return (
        <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a href={ currentPage > 1 ? `${urlpathTo}${currentPage - 1}`: ''}
                   className="relative inline-flex items-center rounded-l-md border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              clipRule="evenodd"/>
                    </svg>
                </a>

                { rangeOfPages.map( (pagenum) => (
                    pagenum != -1
                        ? (
                            <a
                                href={`${urlpathTo}${pagenum}`}
                                key={pagenum}
                                className={`
                                    relative inline-flex items-center border px-4 py-2 text-sm font-medium 
                                    ${ pagenum === currentPage ? 'z-10 border-teal-500 bg-teal-50 text-teal-600' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50' }
                                `}
                            >
                                {pagenum}
                            </a>
                        )
                        : (
                            <span key={pagenum} className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"> ... </span>
                        )

                ))}

                <a href={ currentPage < lastPage-1 ? `${urlpathTo}${currentPage + 1}` : ''}
                   className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clipRule="evenodd"/>
                    </svg>
                </a>

            </nav>
        </div>
    );
}

// todo: Use this pagination
// {/* Pagination */}
//              <nav
//         className="bg-white mt-10 px-4 pt-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
//         aria-label="Pagination"
//       >
//         <div className="hidden sm:block">
//           <p className="text-sm text-gray-700">
//             Showing <span className="font-medium">1</span> to{" "}
//             <span className="font-medium">10</span> of{" "}
//             <span className="font-medium">20</span> results
//           </p>
//         </div>
//         <div className="flex-1 flex justify-between sm:justify-end">
//           <a
//             href="/"
//             className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Previous
//           </a>
//           <a
//             href="/"
//             className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Next
//           </a>
//         </div>
//       </nav>