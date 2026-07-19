import Model_info from './Model_info/Model_info';
import Result from './Result/Result';

function Workspace({ panels, onRemovePanel }) {
    return (
        <main className="flex-grow bg-gray-950 relative">
            <div className={`grid-container grid-${panels.length}`}>
                {panels.map((id, index) => (
                    <div className="model-panel" key={id}>
                        <div className="panel-header">
                            <h2 className="text-lg font-medium text-gray-100">Model {index + 1}</h2>
                            {panels.length > 1 && (
                                <button 
                                    onClick={() => onRemovePanel(id)}
                                    className="remove-btn" 
                                    aria-label="Remove Panel"
                                >
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="panel-body">
                            <Model_info panelId={id} />
                            <Result />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Workspace;
