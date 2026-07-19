import numpy as np
import matplotlib.pyplot as plt
import json


def sigmoid(z):
    return 1.0/(1.0+np.exp(-z))
    
def sigmoid_prime(sigz):
    return sigz*(1-sigz)

class cross_entropy():
    @staticmethod
    def cost(activation,y):
        a = np.clip(activation, 1e-12, 1-1e-12)
        return np.sum(-y*np.log(a)-(1-y)*np.log(1-a))

    @staticmethod
    def delta(activation,y):
        return activation-y

class quadratic():
    @staticmethod
    def cost(activation,y):
        return 0.5*np.sum((activation-y)**2)
    @staticmethod
    def delta(activation,y):
        return (activation-y)*sigmoid_prime(activation)

class l1():
    @staticmethod
    def value(weights):
        return np.sign(weights)

class l2():
    @staticmethod
    def value(weights):
        return weights
    
class network():
    def __init__(self,structure:list[int],cost=cross_entropy,regularization=l2) -> None:
        self.struct=structure
        self.total_layers=len(structure)
        self.cost=cost
        self.regularization=regularization
        self.bias=[np.random.randn(x,1) for x in structure[1:]]
        self.weights=[np.random.randn(x,y)/np.sqrt(y) for x,y in zip(structure[1:],structure[:-1])]


    def train(self,train_data,batch_size,epoch,eta,lamda=0.0,evaluation_data=None,moniter=False):

        evaluation_acc=[]
        train_acc=[]
        n=train_data[0].shape[0]
        for i in range(epoch):
            perm=np.random.permutation(n)
            train_data = (train_data[0][perm], train_data[1][perm])
           
            mini_batches=[train_data[0][x:x+batch_size] for x in range(0,n,batch_size)]
            mini_label=[train_data[1][x:x+batch_size] for x in range(0,n,batch_size)]
            for x,y in zip(mini_batches,mini_label):
                self.back_prop(x,y,eta,lamda,n)
            if moniter:
                evaluation_acc.append(self.evaluate(evaluation_data))
                train_acc.append(self.evaluate(train_data))
        if(moniter):
            x=range(1,epoch+1)
            plt.plot(x,evaluation_acc,label="evaluation_acc")
            plt.plot(x,train_acc,label="train_acc")
            plt.legend()
            plt.show()


    def back_prop(self,inputs,outputs,eta,lamda,train_size):
        inputs=np.transpose(inputs)
        outputs=np.transpose(outputs)
        activations=self.forwardPass(inputs)

        delta=self.cost.delta(activations[-1],outputs)
        partial_b=[np.sum(delta,axis=1,keepdims=True)]
        partial_w=[np.dot(delta,activations[-2].transpose())]

        for i in range(2,self.total_layers):
            delta=np.dot(self.weights[-i+1].transpose(),delta)*sigmoid_prime(activations[-i])

            partial_b.append(np.sum(delta,axis=1,keepdims=True))
            partial_w.append(np.dot(delta,activations[-i-1].transpose()))

        partial_b.reverse()
        partial_w.reverse()
        self.weights=[w-eta*delta/inputs.shape[1]-lamda*eta/train_size*self.regularization.value(w) for w,delta in zip(self.weights,partial_w)]
        self.bias=[b-eta*delta/inputs.shape[1] for b,delta in zip(self.bias,partial_b)]



    def forwardPass(self,inputs):
        a=[inputs]
        for w,b in zip(self.weights,self.bias):
            a.append(sigmoid(np.dot(w,a[-1])+b))
        return a

    
    def evaluate(self,test_data):
         
        test_result=self.forwardPass(test_data[0].transpose())[-1].transpose()
        return sum(int(np.argmax(x)==np.argmax(y)) for x,y in zip(test_result,test_data[1]))/test_data[0].shape[0]*100

    
    def save(self,filename):

        data={  "structure":self.struct,
                "weights":[w.tolist() for w in self.weights],
                "bias":[b.tolist() for b in self.bias]
            }
        f=open(filename,"w")
        json.dump(data,f)
        f.close()

def load(filename):
    f=open(filename,"r")
    data=json.load(f)
    f.close()
    net=network(data["structure"])
    net.weights=[np.array(w) for w in data["weights"]]
    net.bias=[np.array(b) for b in data["bias"]]
    return net
