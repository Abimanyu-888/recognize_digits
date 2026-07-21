from fastapi import HTTPException
def validate_structure(structure: list[int]) -> None:
    if len(structure) < 2:
        raise HTTPException(status_code=422, detail="Network structure needs at least an input and output layer.")
    
    if any(layer <= 0 for layer in structure):
        raise HTTPException(status_code=422, detail="Every network layer size must be a positive integer.")
    
    if structure[0] != 784 or structure[-1] != 10:
        raise HTTPException(status_code=422,detail="MNIST models must start with 784 input neurons and end with 10 output neurons.")


def make_result(model: str, parameters: dict, history: dict, test_loss: float, test_accuracy: float) -> dict:
    return {
        "model": model,
        "parameters": parameters,
        "history": history,
        "test": {
            "accuracy": round(test_accuracy, 4),
            "loss": round(test_loss, 6),
        },
    }
