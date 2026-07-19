function Header({ panelCount, maxPanels, onAddPanel }) {
    const isMax = panelCount >= maxPanels;

    return (
        <header className="bg-gray-900 border-b border-gray-800 shadow-md z-10 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-indigo-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <h1 className="text-xl font-bold text-white">MNIST Model Trainer</h1>
                    </div>
                    <div>
                        <button 
                            onClick={onAddPanel}
                            disabled={isMax}
                            className="add-model-button"
                            aria-label={isMax ? `Maximum of ${maxPanels} model panels reached` : 'Add a model panel'}
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <span>Add model</span>
                            <span className="add-model-count" aria-hidden="true">{panelCount}/{maxPanels}</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
