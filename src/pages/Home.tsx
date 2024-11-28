import MainPage from "./MainPage";

export default function Home() {
    return (
        <div className="container mx-auto min-h-screen bg-blue-200 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-3xl font-bold text-center my-4">
                <div className="font-serif font-bold bg-blue-300 drop-shadow-md p-4 rounded-lg">
                    Goal Calendar
                </div>
            </h1>
            <MainPage/>
        </div>
    );
}
