# 🧠 MNIST Model Trainer

An interactive web application and Python deep learning framework designed to build, train, and visualize neural networks from scratch on the MNIST dataset using **NumPy**, **FastAPI**, and **React**.

---

## 🚀 Features

### 💻 Interactive Web Dashboard
- Built with **React** and **Vite**, styled with modern CSS.
- Real-time visualization of training/validation loss and accuracy curves powered by **Chart.js**.
- Support for adding multiple panel configurations to compare different network hyper-parameters side by side.

### 🔧 Modular Architectures
- **Basic Neural Network**: Fully connected neural network built using pure NumPy with standard Gaussian weight initialization and Quadratic cost.
- **Advanced Neural Network**: Implements normalized weight initialization, Cross-Entropy cost, and L1/L2 regularization for faster convergence and higher accuracy.

---

## ⚡ Basic vs. Advanced Model Comparison

| Feature / Technique | 🔴 Basic Model | 🟢 Advanced Model | Why Advanced is Better |
| :--- | :--- | :--- | :--- |
| **Weight Initialization** | Standard Gaussian (`np.random.randn(x, y)`) | Normalized Gaussian (`np.random.randn(x, y) / sqrt(y)`) | **Prevents Neuron Saturation**: Standard initialization creates large initial $z$-values ($\text{Var}(z) \approx n_{\text{in}}$), pushing Sigmoid output into flat saturation regions ($\sigma'(z) \approx 0$). Normalized initialization keeps $z$-variance near $1.0$, preventing early learning stalls. |
| **Cost Function** | Quadratic Cost ($\frac{1}{2}(y - a)^2$) | Cross-Entropy Cost (Default) or Quadratic Cost | **Eliminates Learning Slowdown**: Under Quadratic Cost, output layer gradients depend on $\sigma'(z)$. If a neuron makes a confident wrong prediction, $\sigma'(z) \to 0$ and learning stalls. Cross-Entropy output delta is simply $(a - y)$, driving rapid learning when errors are high. |
| **Overfitting Prevention** | None ($\lambda = 0$) | Built-in L1 & L2 Regularization | **Better Generalization**: L1 ($\text{sign}(w)$) and L2 ($w$) weight decay prevent weight explosion, force the network to rely on robust feature representations, and improve accuracy on unseen test data. |
| **Hyperparameter Control** | Fixed structure & learning rate | Configurable loss function, regularization type, and $\lambda$ strength | **Flexible Experimentation**: Allows fine-tuning network behavior directly from the interactive frontend dashboard. |

---

### ⚡ Optimization & Loss Functions
- **Mini-Batch Gradient Descent**: Accelerates training convergence.
- **Cost Functions**:
  - Quadratic Cost
  - Cross-Entropy Cost (prevents learning slowdown during early training)

### 🛡️ Regularization & Weight Initialization
- **L1 & L2 Regularization**: Built-in support to prevent overfitting.
- **Normalized Weight Initialization**: Scales initial weights by $\frac{1}{\sqrt{n_{in}}}$ to avoid neuron saturation and stabilize training.

---

## 📁 Repository Structure

```
mnist_model_trainer/
├── backend/
│   ├── Model/
│   │   ├── Basic/         # FCNN implementation (Quadratic Cost)
│   │   ├── Advanced/      # FCNN implementation (Cross-Entropy & Regularization)
│   │   ├── CNN/           # Convolutional Neural Network module
│   │   └── data/          # MNIST training & test datasets
│   ├── helper.py          # Validation & payload formatting utilities
│   ├── main.py            # FastAPI REST server & endpoint routing
│   └── requirements.txt   # Backend Python dependencies
├── frontend/
│   ├── src/               # React components, dashboard UI & charts
│   ├── index.html         # Application HTML entry point
│   └── package.json       # Frontend package setup & dependencies
└── README.md              # Project documentation
```

---

## 📐 Mathematical Foundations

The core deep learning algorithms are written from scratch without external ML frameworks:

- **Activation Function:** Sigmoid ($\sigma(z) = \frac{1}{1 + e^{-z}}$)
- **Backpropagation:** Exact gradient computation derived via chain rule across all network layers.
- **Weight Initialization:** Standard deviation scaled by:
  \[
  \sigma = \frac{1}{\sqrt{n_{\text{in}}}}
  \]
- **Regularized Cost Functions:**
  - **L2 Regularization Cost:** 
    \[
    C = C_0 + \frac{\lambda}{2n} \sum_w w^2
    \]
  - **L1 Regularization Cost:** 
    \[
    C = C_0 + \frac{\lambda}{n} \sum_w |w|
    \]

---

## 🛠️ Getting Started

### Prerequisites
- **Python**: 3.9+
- **Node.js**: 18+ and `npm`

### 1. Start the Backend API

Navigate to the `backend/` directory, install requirements, and run the FastAPI server using Uvicorn:

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --reload
```
The backend API will start at `http://127.0.0.1:8000`.

### 2. Start the Frontend Application

In a separate terminal, navigate to the `frontend/` directory, install dependencies, and launch the dev server:

```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173` to access the interactive MNIST Model Trainer dashboard.

---

## 🔗 API Endpoints

- `GET /` - Health check returning server status.
- `POST /api/results/basic` - Trains the basic model and returns training history and evaluation metrics.
- `POST /api/results/advanced` - Trains the advanced model with specified loss function and regularization settings.

### Example Request Body (`POST /api/results/advanced`):

```json
{
  "structure": [784, 128, 10],
  "learning_rate": 0.001,
  "epochs": 10,
  "batch_size": 64,
  "loss_function": "cross-entropy",
  "regularization": "l2",
  "regularization_strength": 0.1
}
```

---

## 📌 Current Status & Future Roadmap

- ✅ **Fully Connected Neural Network (Basic & Advanced)** implemented from scratch using NumPy.
- ✅ **Interactive React Web Interface** for dynamic model training and visualization.
- 🔄 **Convolutional Neural Network (CNN)** integration for spatial feature extraction on image datasets.
