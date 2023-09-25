import { motion } from 'framer-motion';
import WidgetComponent from '../WidgetComponent/WidgetComponent.tsx';

interface UserPrimaryDataComponentProps {
    fullName: string | undefined;
    repos: string | undefined;
    fallowers: string | undefined;
}

function UserPrimaryDataComponent({fullName, repos, fallowers}: UserPrimaryDataComponentProps) {
    return (
        <>
            <div className='flex flex-col gap-7'>
                <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.2}} }>
                    <h1 className="text-6xl font-semibold text-gray-800">
                        {fullName || 'Sin Nombre'}
                    </h1>
                </motion.div>

                <div className='flex flex-row gap-11'>
                    <WidgetComponent bg_class='bg-sky-200' numberData={repos || '0'} title='Repositorios'/>
                    <WidgetComponent bg_class='bg-sky-200' numberData={fallowers || '0'} title='Seguidores'/>
                </div>
            </div>
        </>
    )
}

export default UserPrimaryDataComponent
