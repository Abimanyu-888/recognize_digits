import numpy as np

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
        n = train_data[0].shape[0]
        perm = np.random.permutation(n)

        X = train_data[0][perm]
        y = train_data[1][perm]

        split_idx = int(0.9 * n)
        train_set = (X[:split_idx], y[:split_idx])
        evaluation_data = (X[split_idx:], y[split_idx:])

        history = {
            "epoch": list(range(0, epoch + 1)),
            "train_loss": [0],
            "train_acc": [0],
            "eval_loss": [0],
            "eval_acc": [0]
        }
        n_train = train_set[0].shape[0]
        for i in range(epoch):
            perm = np.random.permutation(n_train)
            X_train = train_set[0][perm]
            y_train = train_set[1][perm]
           
            for start in range(0, n_train, batch_size):
                x_batch = X_train[start:start + batch_size]
                y_batch = y_train[start:start + batch_size]
                self.back_prop(x_batch, y_batch, eta)
            train_loss, train_acc = self.evaluate((X_train, y_train))
            eval_loss, eval_acc = self.evaluate(evaluation_data)
            history["train_loss"].append(train_loss)
            history["train_acc"].append(train_acc)
            history["eval_loss"].append(eval_loss)
            history["eval_acc"].append(eval_acc)
        return history


    def back_prop(self,inputs,outputs,eta):
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
        self.weights=[w-eta*delta/inputs.shape[1] for w,delta in zip(self.weights,partial_w)]
        self.bias=[b-eta*delta/inputs.shape[1] for b,delta in zip(self.bias,partial_b)]

    
    def forwardPass(self,inputs):
        a=[inputs]
        for w,b in zip(self.weights,self.bias):
            a.append(sigmoid(np.dot(w,a[-1])+b))
        return a
    


    def evaluate(self,test_data):
         
        X_data, y_data = test_data
        n_samples = X_data.shape[0]
        final_activations = self.forwardPass(X_data.transpose())[-1].transpose()
        loss = self.cost.cost(final_activations, y_data) / n_samples
        accuracy = sum(int(np.argmax(x) == np.argmax(y)) for x, y in zip(final_activations, y_data)) / n_samples * 100
        return float(loss), float(accuracy)





# sigma=1/(1+e^(-z))
# cost function=1/2*(y-a)^2 for one input, for a batch 1/2*n*∑(y-a)^2
