import numpy as np
l2=np.zeros((2,3))
l2[0][1]=1
l2[0][2]=2
l2[1][0]=3
l2[1][1]=4
l2[1][2]=5

l1=l2.reshape((2,3,1))
print(l1,"\n\n\n\n\n\n",l2)
