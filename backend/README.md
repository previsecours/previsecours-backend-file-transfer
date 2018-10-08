# Previsecours backend file transfer API to allow Automatic data Updates  

### Prerequisite:
1. You need to have docker installed  

2. You need to create a file named artifacts at the root of the project (same level as the Makefile) and inside you need to write your accessToken like this:  
```javascript
export accessToken=7HyD5l%407GNWi%26U58Q5%24oejU2
```


## Setup:
In your terminal, type:  
```
git clone https://github.com/previsecours/previsecours-backend-file-transfer.git previsecours-backend-API && cd previsecours-backend-API
```  

## Run:  
```bash
make dev
```  

Here you go ! Follow this link to see it working: http://localhost:8081/status  


## Post a file:
Let's say you want to publish for the department 91  
1. Make sure you have the accessToken from the server admin.  
2. Create a POST request to the API endpoint /uploadFile/interventions/91  
3. Add a Header ``` x-access-token:<accessToken> ```  
4. Add a File ``` file=<path-to-your-file>/interventions.csv ```  


Example of a curl:  
```bash  
curl -X POST \
  http://localhost:8081/uploadFile/interventions/91 \
  -H 'Cache-Control: no-cache' \
  -H 'x-access-token: 7HyD5l%407GNWi%26U58Q5%24oejU2' \
  -F file=@/Users/Downloads/example.csv
```
## For more information
There is a full documentation (done using swagger) accessible at the address http://localhost:8081/documentation/
