import { NumberInput, TextInput, SelectInput, Field } from "./Input/Input";

function AdvancedParameters({ fieldId }) {
    return (
        <div className="parameter-grid">
            <Field label="Learning Rate" htmlFor={fieldId("learning-rate")}>
                <NumberInput id={fieldId("learning-rate")} defaultValue="0.001" min="0" step="0.0001" />
            </Field>
            <Field label="Epochs" htmlFor={fieldId("epochs")}>
                <NumberInput id={fieldId("epochs")} defaultValue="10" min="1" max="1000" step="1" />
            </Field>
            <Field label="Batch Size" htmlFor={fieldId("batch-size")}>
                <NumberInput id={fieldId("batch-size")} defaultValue="64" min="1" max="1024" step="1" />
            </Field>
            <Field label="Lambda (λ)" htmlFor={fieldId("lambda")}>
                <NumberInput id={fieldId("lambda")} defaultValue="0.0001" min="0" step="0.0001" />
            </Field>
            <Field label="Loss Function" htmlFor={fieldId("loss-function")}>
                <SelectInput id={fieldId("loss-function")} defaultValue="cross-entropy">
                    <option value="quadratic">Quadratic</option>
                    <option value="cross-entropy">Cross Entropy</option>
                </SelectInput>
            </Field>
            <Field label="Regularization" htmlFor={fieldId("regularization")}>
                <SelectInput id={fieldId("regularization")} defaultValue="l2">
                    <option value="l1">L1</option>
                    <option value="l2">L2</option>
                </SelectInput>
            </Field>
            
            <Field label="Network Structure (List[int])" htmlFor={fieldId("structure")} className="parameter-field-wide">
                <TextInput id={fieldId("structure")} defaultValue="784, 256, 128, 10" placeholder="e.g. 784, 256, 128, 10" />
            </Field>
        </div>
    );
}

export default AdvancedParameters;