import { useState } from "react";
import Model from "./Models/Model";

function Model_info({ panelId, onTrain, isTraining }) {
    const [modelType, setModelType] = useState("basic");
    const [formError, setFormError] = useState("");
    const fieldId = (name) => `model-${panelId}-${name}`;

    const getFieldValue = (name) => document.getElementById(fieldId(name))?.value;

    const parseStructure = () => {
        const values = getFieldValue("structure")
            .split(",")
            .map((value) => Number(value.trim()));

        if (!values.length || values.some((value) => !Number.isInteger(value) || value <= 0)) {
            throw new Error("Network structure must be a comma-separated list of positive integers.");
        }
        return values;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isTraining) return;

        try {
            setFormError("");
            const parameters = {
                learning_rate: Number(getFieldValue("learning-rate")),
                epochs: Number(getFieldValue("epochs")),
                batch_size: Number(getFieldValue("batch-size")),
                structure: parseStructure(),
            };

            if (!Number.isFinite(parameters.learning_rate) || !Number.isInteger(parameters.epochs) || !Number.isInteger(parameters.batch_size)) {
                throw new Error("Learning rate, epochs, and batch size must be valid numbers.");
            }

            if (modelType === "advanced") {
                parameters.regularization_strength = Number(getFieldValue("lambda"));
                parameters.loss_function = getFieldValue("loss-function");
                parameters.regularization = getFieldValue("regularization");
                if (!Number.isFinite(parameters.regularization_strength)) {
                    throw new Error("Regularization strength must be a valid number.");
                }
            }

            await onTrain(modelType, parameters);
        } catch (error) {
            setFormError(error.message || "Check the model settings and try again.");
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                    {/* <option value="cnn">CNN</option> */}
                </select>
            </div>
            <Model panelId={panelId} modelType={modelType} />
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isTraining}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors"
                >
                    {isTraining ? "Training…" : "Train Model"}
                </button>
                {formError && <p className="form-error" role="alert">{formError}</p>}
            </div>
        </form>
    );
}

export default Model_info;
