import { motion } from "framer-motion"

interface WidgetComponentProps {
    title: string;
    numberData: string;
    bg_class: string;
}

function WidgetComponent({title, numberData, bg_class}: WidgetComponentProps) {
    return (
        <motion.div initial={ {opacity: 0} } animate={ {opacity: 1, transition: {delay: 0.2}} }>
            <div className={`flex flex-col items-center justify-center py-10 px-16 rounded-2xl text-green-800 ${bg_class}`}>
                <div className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight text-gray-800">
                    {numberData}
                </div>
                <p className="mt-4 text-sm sm:text-lg font-medium text-gray-800">{ title }</p>
            </div>
        </motion.div>
    )
}

export default WidgetComponent
