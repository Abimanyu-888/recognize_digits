
import network as network
import load_data as load_data
test_data  = load_data.load_kaggle_mnist("../data/mnist_test.csv")
train_data=load_data.load_kaggle_mnist("../data/mnist_train.csv")


def evaluate(eta:float,epoch:int,batch_size:int,lamda:float,loss_function:str,regularization:str,structure:list[int]):
    net=network(structure,loss_function,regularization)
    history=net.train(train_data,batch_size,epoch,eta,lamda)
    loss,accuracy=net.evaluate(test_data)
