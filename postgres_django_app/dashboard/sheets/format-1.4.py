
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import sys


# In[ ]:


path = sys.argv[1]
opath = sys.argv[2]


# In[ ]:


#path = 'S1.4_add.xls'


# In[2]:


df = pd.read_excel(path)


# In[3]:


df


# In[4]:


df.columns


# In[5]:


to_be_deleted = df.columns[-4:]
to_be_deleted


# In[6]:


df = df.drop(columns=to_be_deleted)


# In[7]:


df


# In[8]:


df = df.drop(labels = [0,1])


# In[9]:


df = df.drop(columns= df.columns[0])


# In[10]:


df


# In[11]:


cols = df.columns.tolist()
cols


# In[12]:


cols = cols[-2:] + cols[:-2]


# In[13]:


cols


# In[14]:


df = df[cols]


# In[15]:


df 


# In[16]:


df = df.drop(labels = [30,51,52])


# In[17]:


df


# In[18]:


temp = df.transpose()


# In[19]:


temp = temp.set_index(temp[2])


# In[20]:


temp


# In[21]:


temp = temp.drop(columns = [2,3])


# In[22]:


temp


# In[23]:


len(temp.loc['Item'])


# In[24]:


temp.loc['Item'].keys()


# In[25]:


lst = [ 4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29,]


# In[26]:


qlst = [31, 32, 33, 34, 35, 36, 37, 38,
            39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]


# In[27]:


pi = temp[lst]


# In[28]:


qi = temp[qlst]


# In[29]:


pi


# In[30]:


pi = pi.drop(columns = [4])


# In[31]:


pi[30] = np.nan


# In[32]:


pi


# In[33]:


rws = len(pi[6])
rws


# In[34]:


ls = ['B.3','index of agricultural production','कृषि उत्‍पादन का सूचकांक ']


# In[35]:


nn = [np.nan for i in range(rws-3)]
nn


# In[36]:


ls.extend(nn)


# In[37]:


pi[30] = ls


# In[38]:


pi


# In[39]:


ls1 = ['B.4','index of industrial production','औद्योगिक उत्‍पादन का सूचकांक']
ls1.extend(nn)


# In[40]:


pi[31] = ls1


# In[41]:


pi


# In[42]:


x = list(pi.columns)
pind = ['price indices'] * len(list(pi.columns))
dct = zip(pind,x)
dcttt = {}
for i,j in dct:
    dcttt[j] = i


# In[43]:


dcttt


# In[44]:


line = pd.DataFrame(data = dcttt, index = ['price indices'] )


# In[45]:


line


# In[46]:


pi


# In[47]:


pi = pd.concat([pi.iloc[:3], line, pi.iloc[3:]] )


# In[48]:


pi


# In[49]:


x = list(pi.columns)
qind = ['quantum indices'] * len(list(pi.columns))
dct = zip(qind,x)
dcttt = {}
for i,j in dct:
    dcttt[j] = i
dcttt


# In[50]:


qline = pd.DataFrame(data = dcttt, index = ['quantum indices'] )


# In[51]:


pi = pd.concat([pi, qline,]  )


# In[52]:


len(pi.columns)


# In[53]:


nl = [
 'A',
 'A.1',
 'A.1.1',
 'A.1.2',
 'A.1.3',
 'A.1.4',
 'A.1.5',
 'A.1.6',
 'A.1.7',
 'A.1.8',
 'A.1.9',
 'A.1.10',
 'A.1.11',
 'A.2',
 'A.3',
 'A.4',
 'B',
 'B.1',
 'B.1.1',
 'B.1.2',
 'B.2',
 'B.2.1',
 'B.2.2',
 'B.2.3',
 'B.2.4',
 'B.3',
 'B.4',]


# In[54]:


pi


# In[55]:


pi.loc['S.No.'] = nl


# In[56]:


pi.loc['Item']


# In[57]:


qi= qi.drop(columns = [31])


# In[58]:


iap = qi[49]
iip = qi[50]


# In[59]:


qi = qi.drop(columns=[49,50])


# In[60]:


qi


# In[61]:


l = ['B.1',
 'wholesale prices (all commodities)',
'थोक मूल्‍य (सभी वस्‍तुएं)',]
l.extend(nn)


# In[62]:


l


# In[63]:


qi[49] = l


# In[64]:


l2 = ['B.1.1',
 'primary articles (food & non-food articles & minerals)',
'प्राथमिक वस्‍तुएं (खाद्य एवं गैर-खाद्य वस्‍तुएं एवं खनिज)',]
l2.extend(nn)
qi[50] = l2


# In[65]:


l3 = ['B.1.2',
 'manufactured products',
'विनिर्मित उत्‍पाद ',]
l3.extend(nn)
qi[51] = l3


# In[66]:


l4 = ['B.2',
 'consumer prices*',
'उपभोक्‍ता मूल्‍य* ',]
l4.extend(nn)
qi[52] = l4


# In[67]:


l5 = ['B.2.1',
 'CPI (Rural)',
'उपभोक्ता मूल्य सूचकांक (ग्रामीण)',]
l5.extend(nn)
qi[53] = l5


# In[68]:


l6 = ['B.2.2',
 'CPI (Urban)',
'उपभोक्ता मूल्य सूचकांक (शहरी)',]
l6.extend(nn)
qi[54] = l6


# In[69]:


l6 = ['B.2.3',
'CPI (Combined)',
'उपभोक्ता मूल्य सूचकांक (संयुक्त)',]
l6.extend(nn)
qi[55] = l6


# In[70]:


l7 = ['B.2.4',
'CPI (IW)',
'उपभोक्ता मूल्य सूचकांक (औ. श्र.)',]
l7.extend(nn)
qi[56] = l7


# In[71]:


qi[57] = iap 
qi[58] = iip


# In[72]:


#pi.to_excel('pi.xlsx')
#qi.to_excel('qi.xlsx')


# In[73]:


qi


# In[74]:


len(nl)


# In[75]:


qi.loc['S.No.'] = nl


# In[76]:


pi


# In[77]:


qi


# In[78]:


pi.columns=pi.loc['S.No.']
qi.columns=qi.loc['S.No.']


# In[79]:


pi


# In[80]:


qi = qi.drop(labels = ['Item', 'मद'])


# In[81]:


qi = qi.drop(labels = 'S.No.')


# In[82]:


final = pd.concat([pi, qi]).drop(labels = ['S.No.'])


# In[83]:


final


# In[84]:


final.to_excel(opath,index_label='S.No.')

