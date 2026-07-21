# 🧠 Recognize Digits: Neural Network from Scratch

A lightweight Python implementation of a fully connected neural network designed for digit recognition, built using NumPy and focused on deep learning fundamentals.

---

## 🚀 Features

### 🔧 Modular Architectures
Supports flexible network structures defined by simple list inputs.

### ⚡ Optimization Techniques
Includes mini-batch gradient descent to accelerate training.

### 📉 Cost Functions
Implements both:
- Quadratic Cost
- Cross-Entropy Cost  

Addresses the **learning slowdown problem** effectively.

### 🛡️ Regularization
Built-in support for:
- L1 Regularization  
- L2 Regularization  

Helps prevent overfitting.

### 📊 Visualization
Integrated Matplotlib support for:
- Training accuracy
- Evaluation accuracy  
across epochs.

---

## 📐 Mathematical Foundations

The network is built on core deep learning principles:

- **Activation Function:** Sigmoid (introduces non-linearity)
- **Backpropagation:** Gradient computation using the chain rule across layers
- **Weight Initialization:**  
  Normalized initialization:
  
  \[
  \frac{1}{\sqrt{n_{in}}}
  \]

  Helps prevent neuron saturation and stabilizes training.

---

## 📌 Current Status

- ✅ Fully Connected Neural Network implemented  
- 🔄 Future Work:
  - Convolutional Neural Network (CNN)
  - Improved spatial feature extraction for image data

---

## 🛠️ Usage

### Run the application

Start the API from `backend/` after installing its requirements:

```bash
python -m pip install -r requirements.txt
uvicorn main:app --reload
```

In another terminal, start the frontend from `frontend/`:

```bash
npm install
npm run dev
```

Choose either **Basic** or **Advanced**, adjust the settings, and select **Train Model**. The frontend sends the selected configuration to the API and displays the training/validation-accuracy chart plus final test accuracy and loss.

### Results API

- `POST /api/results/basic` trains the basic model and returns its history and test metrics.
- `POST /api/results/advanced` trains the advanced model, including the selected loss function and regularization, and returns its history and test metrics.
- `GET /api/results/basic` and `GET /api/results/advanced` return the most recently completed result for that model type.

Example Basic request body:

```json
{
  "learning_rate": 0.001,
  "epochs": 10,
  "batch_size": 64,
  "structure": [784, 128, 10]
}
```

To train the model, initialize the network with your desired architecture and call the `train` method:

```python
# Example: 784 inputs, 30 hidden neurons, 10 outputs
net = network([784, 30, 10], cost=cross_entropy)

net.train(
    train_data,
    batch_size=10,
    epoch=30,
    eta=0.5,
    evaluation_data=test_data,
    moniter=True
)
