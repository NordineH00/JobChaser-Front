import { useNavigate } from 'react-router';

const ConfirmInscription = () => {

    const navigate = useNavigate();

    
        return (

            <div className="flex flex-col items-center w-full" >
                < h1 className='text-3xl font-bold text-center' > Bravo l'enregistrement à fonctionné</h1 >
                <h2>Veuillez vous connecter</h2>
                <button
                    onClick={() => navigate('/signin')}
                    className="my-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                    Me connecter
                </button>

            </div >
        )
    
}

export default ConfirmInscription;