interface LabeledInputProps {
    label: string;
    isRequired: boolean;
    children: React.ReactNode;
}

export const LabeledInput = ({ label, isRequired, children }: LabeledInputProps) => {
    return (
        <div className="mb-4">
        <div>{`${label} ${isRequired ? "*" : ""}`}</div>
        {children}
        </div>
    )
}