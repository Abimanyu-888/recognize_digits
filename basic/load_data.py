# load_data.py
import numpy as np

def load_kaggle_mnist(csv_path):
    # Kaggle MNIST: first column = label, next 784 columns = pixels
    data = np.loadtxt(csv_path, delimiter=",", skiprows=1)

    labels = data[:, 0].astype(int)      # shape: (N,)
    pixels = data[:, 1:] / 255.0         # shape: (N, 784), normalized to [0,1]

    def one_hot(j):
        e = np.zeros((10))
        e[j] = 1.0
        return e
    label_new= []
    for i in range(labels.shape[0]):
        label_new.append(one_hot(labels[i]))
    label_new=np.array(label_new)
    return (pixels,label_new)

