import { useNavigate } from "react-router";


const Page404 = () => {

const navigate= useNavigate()

    return (
        <div className="flex flex-col items-center w-full">
            <p>Perdu dans la chasse ? Reviens à l’accueil</p>
            <button
                onClick={() => navigate('/')}
                className="my-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
                Accueil
            </button>
        </div>
    )
}

export default Page404;