function NumberInput({ id, defaultValue, min, max, step }) {
    return (
        <input
            id={id}
            type="number"
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            inputMode="decimal"
            className="form-control number-input mt-1 w-full"
        />
    );
}

function Parameters({ panelId }) {
    const fieldId = (name) => `model-${panelId}-${name}`;

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300" htmlFor={fieldId('architecture')}>Architecture</label>
                <select id={fieldId('architecture')} className="form-control form-select mt-1 w-full">
                    <option>Simple CNN (2 Conv Layers)</option>
                    <option>Deep CNN (4 Conv Layers)</option>
                    <option>Multi-Layer Perceptron (MLP)</option>
                    <option>ResNet-18 (Simplified)</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor={fieldId('learning-rate')}>Learning Rate</label>
                    <NumberInput id={fieldId('learning-rate')} defaultValue="0.001" min="0" step="0.0001" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor={fieldId('epochs')}>Epochs</label>
                    <NumberInput id={fieldId('epochs')} defaultValue="10" min="1" max="100" step="1" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor={fieldId('batch-size')}>Batch Size</label>
                    <NumberInput id={fieldId('batch-size')} defaultValue="64" min="1" max="1024" step="1" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor={fieldId('optimizer')}>Optimizer</label>
                    <select id={fieldId('optimizer')} className="form-control form-select mt-1 w-full">
                        <option>Adam</option>
                        <option>SGD</option>
                        <option>RMSprop</option>
                    </select>
                </div>
            </div>
            <div className="pt-2">
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors">
                    Train Model
                </button>
            </div>
        </div>
    );
}

export default Parameters;
