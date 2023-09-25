import { motion } from 'framer-motion';
import { Box, TextField } from '@mui/material';
import './GitHubUserComponet.css'
import CardComponent from '../CardCmponent/CardComponent.tsx';
import UserPrimaryDataComponent from '../UserPrimaryDataComponent/UserPrimaryDataComponent.tsx';
import { useEffect, useRef, useState } from 'react';
import WidgetProfileComponent from '../WidgetProfileComponent/WidgetProfileComponent.tsx';
import RepoComponentList from '../RepoComponent/RepoComponentList.tsx';
import axios from 'axios';

interface GitHubResponse {
    id: number;
    login: string;
    avatar_url: string;
    repos_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
}

function GitHubUserComponet() {

    const scrollTargetRef = useRef<null | HTMLDivElement>(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showRepositories, setShowRepositories] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [userExists, setUserExists] = useState<boolean | null>(null);
    const [userData, setUserData] = useState<GitHubResponse | null>(null);
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleClickRepositories = () => {
        setShowRepositories(true);
        setShowProfile(false);
        setShowDetails(false);
    };

    const handleClickProfile = () => {
        setShowRepositories(false);
        setShowProfile(true);
        setShowDetails(false);
    };

    const handleClickDetails = () => {
        setShowRepositories(false);
        setShowProfile(false);
        setShowDetails(true);
    };

    const handleInputChange = (e: any) => {
        setSearchText(e.target.value);
    };

    const handleSearch = async () => {
        if (searchText.trim() === '') {
            setUserExists(null);
            setUserData(null);
            setError(null);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`https://api.github.com/users/${ searchText }`);
            if (response.status === 200) {
                setUserExists(true);
                setUserData(response.data);
                setError(null);
                setLoading(false);
            }
        } catch (err: any) {
            setLoading(false);
            if (err.response && err.response.status === 404) {
                setUserExists(false);
                setUserData(null);
                setError(null);
            } else {
                setUserExists(null);
                setUserData(null);
                setError('Hubo un error al buscar al usuario');
            }
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            setUserExists(null);
            setLoading(true);
            setShowRepositories(false);
            setShowProfile(false);
            setShowDetails(false);
            handleSearch();
        }
    };

    useEffect(() => {
        if (showRepositories || showProfile || showDetails) {
            // Haz scroll hacia el elemento de destino
            if (scrollTargetRef.current) {
                scrollTargetRef.current.scrollIntoView({behavior: 'smooth'});
            }
        }
    }, [showRepositories, showProfile, showDetails]);


    return (
        <div className="flex flex-col flex-auto min-w-0">
            <Box className="relative h-full  px-16 pb-56 pt-24 sm:px-64 overflow-hidden dark:bg-gray-800 text-gray-100">

                <div className="flex flex-col items-center justify-center  mx-auto w-full pt-12 gap-5">
                    <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.2}} }>
                        <h1 color="inherit" className="text-6xl font-semibold">
                            GitHub User
                        </h1>
                    </motion.div>
                    <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.4}} }>
                        <p className="mt-4 text-3xl tracking-tight leading-tight text-center">
                            Busque información de un usuario de github!
                        </p>
                    </motion.div>

                    <div className="input_text flex flex-1 items-center rounded mx-8 w-4/5 ">
                        <TextField label="Usuario"
                                   value={ searchText }
                                   onChange={ handleInputChange }
                                   onKeyUp={ handleKeyPress }
                                   fullWidth variant="filled"/>
                    </div>
                </div>

                <svg
                    className="absolute inset-0 pointer-events-none"
                    viewBox="0 0 960 540"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMax slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        className="text-gray-500 opacity-25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="100"
                    >
                        <circle r="300" cx="106" cy="23"/>
                        <circle r="234" cx="990" cy="491"/>
                    </g>
                </svg>
            </Box>

            { userExists === true && <div className="flex flex-col items-center px-24 sm:px-40 ">
                <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.6}} }
                            className="grid grid-cols-1 md:grid-cols-3 gap-y-32 md:gap-y-0 md:gap-x-24 w-full max-w-sm md:max-w-5xl -mt-24">
                    <CardComponent title='Perfil'
                                   subtitle='Consulte los datos principales del usuario.'
                                   onClick={ handleClickProfile }/>
                    <CardComponent title='Repositorios'
                                   subtitle='Eche un vistazo al número de seguidores y repositorios.'
                                   onClick={ handleClickRepositories }
                    />
                    <CardComponent title='Detalles'
                                   subtitle='Explore los últimos repositorios y sus resúmenes.'
                                   onClick={ handleClickDetails }/>
                </motion.div>
            </div> }

            {loading && <div className='flex justify-center mb-5'>
                <button type="button" className="text-gray-800 text-center flex justify-center flex-col items-center"
                        disabled>
                    <svg className="animate-spin h-5 w-5 mr-3 text-center " viewBox="0 0 24 24">
                        <circle className="opacity-250" cx="120" cy="120" r="120" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Processing...</p>
                </button>
            </div> }

            <div className='flex justify-center mt-24 mb-20 text-gray-800'>

                { error && <p>Error: { error }</p> }

                { userExists === false && <h2>El usuario no existe</h2> }

                { (userExists === true && showRepositories) && <UserPrimaryDataComponent
                    fullName={ userData?.name }
                    fallowers={ `${ userData?.followers }` }
                    repos={ `${ userData?.public_repos }` }/> }

                { (userExists === true && showProfile) && <WidgetProfileComponent
                    urlAvatar={ userData?.avatar_url }
                    username={ userData?.login }
                    fullName={ userData?.name }
                    bio={ userData?.bio }/> }

                { (userExists === true && showDetails) && <RepoComponentList name={userData?.name} url={userData?.repos_url}/> }

            </div>
            <div ref={ scrollTargetRef }></div>
        </div>
    );
}

export default GitHubUserComponet;
