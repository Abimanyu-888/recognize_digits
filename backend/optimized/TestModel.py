
import backend.optimized.network2 as network2
from backend.optimized.network2 import load
import backend.optimized.load_data as load_data
test_data  = load_data.load_kaggle_mnist("../data/mnist_test.csv")
net=load("model1.json")

print(net.evaluate(test_data))