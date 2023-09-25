import { useEffect, useState } from 'react';
import axios from 'axios';
import RepoComponentCard from './RepoComponentCard.tsx';
import { motion } from 'framer-motion';


interface Repo {
    id: number;
    name: string;
    description: string;
    language: string;
}

interface RepoComponentListProps {
    url: string | undefined;
    name: string | undefined;
}

const RepoComponentList = ({url, name}: RepoComponentListProps) => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get(`${ url || '' }`);
                setLoading(false);
                setRepos(response.data);
            } catch (err) {
                setLoading(false);
                if (axios.isAxiosError(err)) {
                    setError(`Error al obtener los repositorios: ${ err.message }`);
                } else {
                    setError('Error desconocido al obtener los repositorios.');
                }
            }
        };

        fetchRepos();

        return () => {
            // Función de limpieza o desmontaje aquí
            setLoading(true);
        };
    }, []);

    return (<div>
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

            <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.6}} }
                        className='text-gray-800 flex flex-col gap-11'>
                { error && <p>{ error }</p> }
                <h2 className='font-bold text-4xl text-center'>Repositorios de { name || 'Sin Nombre' } en GitHub:</h2>
                <div className='flex flex-wrap gap-5 justify-around'>
                    { repos.map((repo) => (
                        <RepoComponentCard key={ repo.id } description={ repo.description } name={ repo.name }/>
                    )) }
                </div>
            </motion.div>
        </div>

    );
};

export default RepoComponentList;
