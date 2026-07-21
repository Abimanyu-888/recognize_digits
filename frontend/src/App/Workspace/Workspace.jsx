import { useState } from 'react';
import Model_info from './Model_info/Model_info';
import Result from './Result/Result';

function Workspace({ panels, onRemovePanel }) {
    const [runStates, setRunStates] = useState({});

    const trainModel = async (panelId, modelType, parameters) => {
        setRunStates((current) => ({
            ...current,
            [panelId]: { loading: true, result: null, error: null },
        }));

        try {
            const response = await fetch(`https://mnist-model-trainer.onrender.com/api/results/${modelType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parameters),
            });
            const body = await response.json();

            if (!response.ok) {
                throw new Error(typeof body.detail === 'string' ? body.detail : 'Training could not be completed.');
            }

            setRunStates((current) => ({
                ...current,
                [panelId]: { loading: false, result: body, error: null },
            }));
        } catch (error) {
            setRunStates((current) => ({
                ...current,
                [panelId]: { loading: false, result: null, error: error.message || 'Unable to reach the API.' },
            }));
        }
    };

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
                            <Model_info
                                panelId={id}
                                onTrain={(modelType, parameters) => trainModel(id, modelType, parameters)}
                                isTraining={runStates[id]?.loading || false}
                            />
                            <Result {...(runStates[id] || {})} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Workspace;
