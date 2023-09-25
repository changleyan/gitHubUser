import EastIcon from '@mui/icons-material/East';
import './CardComponent.css'

interface CardComponentProps {
    title: string;
    subtitle: string;
    onClick: () => void;
}


function CardComponent({title, subtitle, onClick}: CardComponentProps) {
    return (
        <div onClick={onClick}
            className="relative flex flex-col rounded-[2rem] shadow hover:shadow-lg cursor_pointer
                         overflow-hidden transition-shadow ease-in-out duration-300 bg-white justify-between"
        >
            <div className="flex flex-col items-center justify-center text-gray-700 gap-5 mb-5 ">
                <p className="text-3xl font-bold ">{title}</p>
                <div className="md:max-w-160 w-4/5 text-base text-center italic font-medium ">
                    {subtitle}
                </div>
            </div>
            <div className="flex items-center justify-center py-4 text-gray-800 bg-slate-200">
                <div className="mx-8 ">
                    Mostrar <EastIcon></EastIcon>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;


