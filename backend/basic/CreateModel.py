import backend.basic.load_data as load_data
import backend.basic.network as network

train_data = load_data.load_kaggle_mnist("../data/mnist_train.csv")
test_data  = load_data.load_kaggle_mnist("../data/mnist_test.csv")

net = network.network([784,30,10])
net.train(train_data,30,10,3)
net.save("model2.json")
print("Accuracy on test data ",net.evaluate(test_data))
