import numpy as np
import matplotlib.pyplot as plt
import json 


def sigmoid(z):
    return 1.0/(1.0+np.exp(-z))
    
def sigmoid_prime(sigz):
    return sigz*(1-sigz)

class quadratic():
    @staticmethod
    def cost(activation,y):
        return 0.5*np.sum((activation-y)**2)
    @staticmethod
    def delta(activation,y):
        return (activation-y)*sigmoid_prime(activation)

class network:
    def __init__(self,structure: list[int]) -> None:
        self.struct=structure
        self.cost=quadratic
        self.total_layers=len(structure)
        self.weights=[np.random.randn(x,y) for x,y in zip(structure[1:],structure[:-1])]
        self.bias=[np.random.randn(x,1) for x in structure[1:]]
    
    def train(self,train_data,batch_size,epoch,eta):

        train_count=[]
        n=train_data[0].shape[0]
        for j in range(epoch):
            perm=np.random.permutation(n)
            train_data = (train_data[0][perm], train_data[1][perm])
           
            mini_batches=[train_data[0][x:x+batch_size] for x in range(0,n,batch_size)]
            mini_label=[train_data[1][x:x+batch_size] for x in range(0,n,batch_size)]
            for x,y in zip(mini_batches,mini_label):
                
                self.train_mini_batch(x,y,eta)
            
            train_count.append(self.evaluate(train_data))
        epoch_count=[x for x in range(1,epoch+1)]
        plt.plot(epoch_count,train_count,label="train_Data")
        plt.legend()
        plt.show()

    

    def train_mini_batch(self,mini_batch,mini_label,eta):
        partial_der_bias=[np.zeros(b.shape) for b in self.bias]
        partial_der_weights=[np.zeros(w.shape) for w in self.weights]
        for x,y in zip(mini_batch,mini_label):
            x=x.reshape(-1,1)
            y=y.reshape(-1,1)
            delta_b,delta_w=self.back_prop(x,y)

            partial_der_bias=[d+p for d,p in zip(delta_b,partial_der_bias)]
            partial_der_weights=[d+p for d,p in zip(delta_w,partial_der_weights)]

        self.weights=[w-eta*delta/len(mini_batch) for w,delta in zip(self.weights,partial_der_weights)]
        self.bias=[b-eta*delta/len(mini_batch) for b,delta in zip(self.bias,partial_der_bias)]



    def back_prop(self,input,label):
        activation=self.forwardPass(input)
    
        partial_der_bias=[np.zeros(b.shape) for b in self.bias]
        partial_der_weights=[np.zeros(w.shape) for w in self.weights]

        delta=self.cost.delta(activation[-1],label)
        
        partial_der_bias[-1]=delta
        partial_der_weights[-1]=np.dot(delta,activation[-2].transpose())

        for i in range(2,self.total_layers):
            delta=np.dot(self.weights[-i+1].transpose(),delta)*sigmoid_prime(activation[-i])

            partial_der_bias[-i]=delta
            partial_der_weights[-i]=np.dot(delta,activation[-i-1].transpose())
        
        return (partial_der_bias,partial_der_weights)
    
    def forwardPass(self,input):

        a=[input]
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




# sigma=1/(1+e^(-z))
# cost function=1/2*(y-a)^2 for one input, for a batch 1/2*n*∑(y-a)^2
