export function NumberInput({ id, defaultValue, min, max, step }) {
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
            required
        />
    );
}

export function TextInput({ id, defaultValue, placeholder }) {
    return (
        <input
            id={id}
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="form-control mt-1 w-full"
            required
        />
    );
}

export function SelectInput({ id, children, defaultValue }) {
    return (
        <select id={id} defaultValue={defaultValue} className="form-control form-select mt-1 w-full" required>
            {children}
        </select>
    );
}

export function Field({ label, htmlFor, children, className = "" }) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-300" htmlFor={htmlFor}>{label}</label>
            {children}
        </div>
    );
}