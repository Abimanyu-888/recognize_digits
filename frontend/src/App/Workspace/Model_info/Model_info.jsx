import { useState } from "react";
import Model from "./Models/Model";

function Model_info({ panelId }) {
    const [modelType, setModelType] = useState("basic");
    const fieldId = (name) => `model-${panelId}-${name}`;

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300" htmlFor={fieldId("model-type")}>Model Type</label>
                <select
                    id={fieldId("model-type")}
                    className="form-control form-select mt-1 w-full"
                    value={modelType}
                    onChange={(event) => setModelType(event.target.value)}
                >
                    <option value="basic">Basic</option>
                    <option value="advanced">Advanced</option>
                    <option value="cnn">CNN</option>
                </select>
            </div>
            <Model panelId={panelId} modelType={modelType} />
            <div className="pt-2">
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors">
                    Train Model
                </button>
            </div>
        </div>
    );
}

export default Model_info;
