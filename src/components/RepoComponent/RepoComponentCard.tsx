
interface RepoComponentCardProps {
    name: string;
    description: string;
}

function RepoComponentCard({ name, description }: RepoComponentCardProps) {

    return (
        <div
             className="relative flex flex-col rounded-3xl shadow hover:shadow-lg w-3/12 min-h-min
                         overflow-hidden transition-shadow ease-in-out duration-300 bg-white justify-between"
        >
            <div className="flex flex-col items-center justify-center text-gray-700 gap-5 mb-5  ">
                <p className="text-2xl font-bold ">{name}</p>
                <div className='w-4/5  overflow-hidden'>
                    <p className=" text-gray-500 whitespace-normal min-h-min underline-offset-auto break-words ">
                        {description || 'Sin descripción...'}
                    </p>
                </div>

            </div>
            <div className="flex items-center justify-center py-3 text-gray-800 bg-slate-200">
                <div className="mx-8 ">
                </div>
            </div>
        </div>
    );
}

export default RepoComponentCard;
