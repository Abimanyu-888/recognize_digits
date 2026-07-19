import AdvancedParameters from "./Advanced";
import BasicParameters from "./Basic";
import CnnParameters from "./Cnn";


function Model({ panelId, modelType }) {
    const fieldId = (name) => `model-${panelId}-${name}`;
    if (modelType === "advanced") {
        return <AdvancedParameters fieldId={fieldId} />;
    }

    if (modelType === "cnn") {
        return <CnnParameters fieldId={fieldId} />;
    }

    return <BasicParameters fieldId={fieldId} />;

}
export default Model;