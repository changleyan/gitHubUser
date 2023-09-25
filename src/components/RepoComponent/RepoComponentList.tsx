import  { useEffect, useState } from 'react';
import axios from 'axios';
import RepoComponentCard from './RepoComponentCard.tsx';


interface Repo {
    id: number;
    name: string;
    description: string;
    language: string;
}
interface RepoComponentListProps {
    url: string;
    name: string;
}

const RepoComponentList = ({ url, name }:RepoComponentListProps) => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get(`${url}`);
                setRepos(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Error al obtener los repositorios: ${err.message}`);
                } else {
                    setError('Error desconocido al obtener los repositorios.');
                }
            }
        };

        fetchRepos();
    }, []);

    return (
        <div className='text-gray-800 flex flex-col gap-11'>
            {error && <p>{error}</p>}
            <h2 className='font-bold text-4xl text-center'>Repositorios de {name} en GitHub:</h2>
            <div className='flex flex-wrap gap-5 justify-around'>
                {repos.map((repo) => (
                    <RepoComponentCard key={repo.id} description={repo.description} name={repo.name}/>
                ))}
            </div>
        </div>
    );
};

export default RepoComponentList;
