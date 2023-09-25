import { motion } from 'framer-motion';
import { useState } from 'react';
import imgAvatar from '../../assets/avatar.png';

interface WidgetProfileComponentProps {
    urlAvatar: string;
    username: string;
    bio: string;
    onClick: () => void;
}

function WidgetProfileComponent({urlAvatar, username, bio, onClick}: WidgetProfileComponentProps) {
    const defaultImageUrl = imgAvatar; // Ruta de tu imagen base
    const [imageUrl, setImageUrl] = useState(imgAvatar);

    // Función para cambiar la URL de la imagen cuando se cargue
    const handleImageLoad = () => {
        setImageUrl(urlAvatar);
    };

    return (
        <div className='flex flex-col w-full gap-7 items-center'>
            <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.2}} }>
                <h1 className="text-6xl font-semibold text-gray-800">
                    Leyan Chang Reyes
                </h1>
            </motion.div>
            <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.4}} } onClick={ onClick }
                 className="flex flex-col items-center shadow text-gray-800 rounded-2xl overflow-hidden bg-white w-3/12 px-1 py-10"
            >
                <div className="flex flex-col flex-auto gap-3 text-center">
                    <div className=" mx-auto rounded-full overflow-hidden">
                        <img className="w-full h-48 object-cover" src={imageUrl}
                             alt="Avatar"
                             onLoad={handleImageLoad}
                             onError={() => setImageUrl(defaultImageUrl)}/>
                    </div>
                    <div className=" font-semibold text-2xl">{ username }</div>
                    <div className='text-gray-500 '>{ bio }</div>
                </div>
            </motion.div>
        </div>
    );
}

export default WidgetProfileComponent;
