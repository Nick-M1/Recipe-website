
//todo: UNUSED - When new recipe is created or edited
// When profile is updated?

export default function SuccessAlert() {
    return (
        <div
            className="p-4 md:p-5 rounded text-emerald-700 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-900 dark:bg-opacity-75">
            <div className="flex items-center mb-2">
                <svg
                    className="hi-solid hi-check-circle inline-block w-5 h-5 mr-3 flex-none text-emerald-500 dark:text-emerald-400"
                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"/>
                </svg>
                <h3 className="font-semibold">Project was added successfully!</h3>
            </div>
            <p className="ml-8">
                Manage all available projects from your <a
                className="underline text-emerald-600 hover:text-emerald-400 dark:text-emerald-400 dark:hover:text-emerald-300"
                href="/dashboard">personal dashboard</a>.
            </p>
        </div>
    );
}