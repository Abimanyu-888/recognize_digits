import load_data as load_data
import network2 as network2

train_data = load_data.load_kaggle_mnist("../data/mnist_train.csv")
test_data  = load_data.load_kaggle_mnist("../data/mnist_test.csv")

net = network2.network([784,100,10])
net.train(train_data,30,10,0.5,lamda=5.0,evaluation_data=test_data,moniter=True)
net.save("model2.json")
print("Accuracy on test data ",net.evaluate(test_data))
