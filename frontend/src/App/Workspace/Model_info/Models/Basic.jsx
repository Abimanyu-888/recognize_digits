import { NumberInput, TextInput, SelectInput, Field } from "./Input/Input";


function BasicParameters({ fieldId }) {
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
            <Field label="Loss Function" htmlFor={fieldId("loss-function")}>
                <SelectInput id={fieldId("loss-function")} defaultValue="quadratic">
                    <option value="quadratic">Quadratic</option>
                </SelectInput>
            </Field>
            <Field label="Network Structure (List[int])" htmlFor={fieldId("structure")} className="parameter-field-wide">
                <TextInput id={fieldId("structure")} defaultValue="784, 128, 10" placeholder="e.g. 784, 128, 10" />
            </Field>
        </div>
    );
}
export default BasicParameters;






