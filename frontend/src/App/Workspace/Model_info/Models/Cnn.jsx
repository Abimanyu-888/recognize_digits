import { NumberInput, TextInput, SelectInput, Field } from "./Input/Input";



export function CnnParameters({ fieldId }) {
    return (
        <div className="parameter-grid">
            <Field label="Learning Rate" htmlFor={fieldId("learning-rate")}>
                <NumberInput id={fieldId("learning-rate")} defaultValue="0.001" min="0" step="0.0001" />
            </Field>
            <Field label="Epochs" htmlFor={fieldId("epochs")}>
                <NumberInput id={fieldId("epochs")} defaultValue="15" min="1" max="1000" step="1" />
            </Field>
            <Field label="Batch Size" htmlFor={fieldId("batch-size")}>
                <NumberInput id={fieldId("batch-size")} defaultValue="64" min="1" max="1024" step="1" />
            </Field>
            <Field label="Convolution Filters (List[int])" htmlFor={fieldId("conv-filters")}>
                <TextInput id={fieldId("conv-filters")} defaultValue="32, 64" placeholder="e.g. 32, 64" />
            </Field>
            <Field label="Dense Layer Structure (List[int])" htmlFor={fieldId("structure")}>
                <TextInput id={fieldId("structure")} defaultValue="128, 10" placeholder="e.g. 128, 10" />
            </Field>
            <Field label="Kernel Size" htmlFor={fieldId("kernel-size")}>
                <NumberInput id={fieldId("kernel-size")} defaultValue="3" min="1" max="11" step="1" />
            </Field>
            <Field label="Dropout" htmlFor={fieldId("dropout")}>
                <NumberInput id={fieldId("dropout")} defaultValue="0.25" min="0" max="0.9" step="0.05" />
            </Field>
            <Field label="Loss Function" htmlFor={fieldId("loss-function")}>
                <SelectInput id={fieldId("loss-function")} defaultValue="cross-entropy">
                    <option value="cross-entropy">Cross Entropy</option>
                </SelectInput>
            </Field>
        </div>
    );
}

export default CnnParameters;