import { motion } from 'framer-motion';
import WidgetComponent from '../WidgetComponent/WidgetComponent.tsx';

function UserPrimaryDataComponent(){
    return (
        <>
            <div className='flex flex-col gap-7'>
                <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.2}} }>
                    <h1 className="text-6xl font-semibold text-gray-800">
                        Leyan Chang Reyes
                    </h1>
                </motion.div>

                <div className='flex flex-row gap-11'>
                    <WidgetComponent bg_class='bg-green-300' numberData={'214'} title='Repositorios'/>
                    <WidgetComponent bg_class='bg-teal-300' numberData={'80'} title='Seguidores'/>
                </div>
            </div>
        </>
    )
}

export default UserPrimaryDataComponent
