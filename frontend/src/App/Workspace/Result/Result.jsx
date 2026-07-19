function Result() {
    return (
        <div className="mt-4 flex-grow flex flex-col">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Training Results</h3>
            <div className="graph-placeholder relative group cursor-pointer">
                <div className="text-center group-hover:hidden">
                    <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-400">Graph will appear here</span>
                    <span className="mt-1 block text-sm text-gray-500">Loss and Accuracy vs Epochs</span>
                </div>
                <img src="https://placehold.co/600x400/374151/9ca3af?text=Accuracy+%26+Loss+Chart" alt="Mock Chart" className="hidden group-hover:block object-contain w-full h-full absolute inset-0 p-2 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <span className="text-gray-400 text-xs uppercase">Accuracy on TEST Data</span>
                    <div className="font-semibold text-gray-100">--%</div>
                </div>
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <span className="text-gray-400 text-xs uppercase">Loss value on TEST Data</span>
                    <div className="font-semibold text-gray-100">--</div>
                </div>
            </div>
        </div>
    );
}

export default Result;