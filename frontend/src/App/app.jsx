import { useState } from 'react';
import Header from './Header/Header';
import Workspace from './Workspace/Workspace';

function App() {
    const [panels, setPanels] = useState([1]);
    const maxPanels = 2;

    const addPanel = () => {
        if (panels.length < maxPanels) {
            const nextId = (panels.length > 0 ? Math.max(...panels) : 0) + 1;
            setPanels([...panels, nextId]);
        }
    };

    const removePanel = (idToRemove) => {
        if (panels.length > 1) {
            setPanels(panels.filter(id => id !== idToRemove));
        }
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gray-950 text-gray-100">
            <Header 
                panelCount={panels.length} 
                maxPanels={maxPanels} 
                onAddPanel={addPanel} 
            />
            <Workspace 
                panels={panels} 
                onRemovePanel={removePanel} 
            />
        </div>
    );
}

export default App;