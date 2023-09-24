import { motion } from 'framer-motion';
import { Box, TextField } from '@mui/material';
import './GitHubUserComponet.css'
import CardComponent from '../CardCmponent/CardComponent.tsx';
import UserPrimaryDataComponent from '../UserPrimaryDataComponent/UserPrimaryDataComponent.tsx';

function GitHubUserComponet() {

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
                        <TextField label="Usuario" fullWidth variant="filled"/>
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

            <div className="flex flex-col items-center px-24 sm:px-40">
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-y-32 md:gap-y-0 md:gap-x-24 w-full max-w-sm md:max-w-5xl -mt-24">
                    <CardComponent title='Perfil' subtitle='Consulte los datos principales del usuario.'/>
                    <CardComponent title='Repositorios' subtitle='Eche un vistazo al número de seguidores y repositorios.'/>
                    <CardComponent title='Detalles' subtitle='Explore los últimos repositorios y sus resúmenes.'/>
                </div>
            </div>

            <div className='flex justify-center mt-24 mb-20'>
                <UserPrimaryDataComponent/>
            </div>
        </div>
    );
}

export default GitHubUserComponet;
