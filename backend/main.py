from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from threading import Lock

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import zipfile
with zipfile.ZipFile("./Model/data/mnist_train.csv.zip", "r") as zip_ref:
    zip_ref.extractall("./Model/data/")

from Model.load_data import load_kaggle_mnist
from Model.Basic.network import network as BasicNetwork
from Model.Advanced.network import (network as AdvancedNetwork,cross_entropy,quadratic as AdvancedQuadratic,l1,l2)
from helper import make_result,validate_structure

APP_DIR = Path(__file__).resolve().parent
DATA_DIR = APP_DIR / "Model" / "data"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A single process should train one NumPy model at a time. It avoids several browser
# panels exhausting memory and CPU by launching full MNIST training concurrently.
training_lock = Lock()


@lru_cache(maxsize=1)
def training_data():
    return load_kaggle_mnist(DATA_DIR / "mnist_train.csv")


@lru_cache(maxsize=1)
def test_data():
    return load_kaggle_mnist(DATA_DIR / "mnist_test.csv")


@app.get("/")
def read_root():
    return {"message": "All fine running API"}


@app.post("/api/results/basic")
def train_basic(request: dict):
    validate_structure(request["structure"])
    with training_lock:
        network = BasicNetwork(request["structure"])
        history = network.train(training_data(), request["batch_size"], request["epochs"], request["learning_rate"])
        test_loss, test_accuracy = network.evaluate(test_data())

    result = make_result("basic",request,history,test_loss,test_accuracy)
    return result


@app.post("/api/results/advanced")
def train_advanced(request: dict):
    validate_structure(request["structure"])
    cost_function = { "quadratic": AdvancedQuadratic,"cross-entropy": cross_entropy, }[request["loss_function"]]
    regularization = {"l1": l1, "l2": l2}[request["regularization"]]

    with training_lock:
        network = AdvancedNetwork(request["structure"], cost=cost_function, regularization=regularization)
        history = network.train(training_data(),request["batch_size"],request["epochs"],request["learning_rate"],request["regularization_strength"],)
        test_loss, test_accuracy = network.evaluate(test_data())

    result = make_result("advanced",request,history,test_loss,test_accuracy)
    return result