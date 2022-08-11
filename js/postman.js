// console.log('This is a postmaster clone project')
var paramCount = 0;

// initially, we have dont have to display custom parameters box because JSON is default, so, doing that:
document.getElementById('parametersBox').style.display = 'none';


// now we have to display JSON box or parameter box according to the click target of the user
let json = document.getElementById('jsonRadio');
json.addEventListener('click', ()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';

})
let customParam = document.getElementById('paramsRadio');
customParam.addEventListener('click', ()=>{
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';

})

// add more items to the custom parameters box when + is clicked.
let addBtn = document.getElementById('addParam');
addBtn.addEventListener('click', (e)=>{
    let string = '';
    e.preventDefault()
    let params = document.getElementById('params');
    string = `  <div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${paramCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${paramCount + 2}" placeholder="Enter Parameter Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${paramCount + 2}" placeholder="Enter Parameter Value">
                </div>
                <button class="btn btn-primary deleteParam">-</button>
            </div>`;
    
            params.innerHTML += string;

            
            // when - button is clicked delete the parameter
            let deleteBtn = document.getElementsByClassName('deleteParam');
            for (item of deleteBtn){
                item.addEventListener('click', (e)=>{
                    e.target.parentElement.remove();
            })}
    paramCount++;
})




// When Submit button is clicked:
let send = document.getElementById('submit');
send.addEventListener('click', (e)=>{
    e.preventDefault()
    let url = document.getElementById('url').value;
    let requestType = document.querySelector('input[name=requestType]:checked').value;
    document.getElementById('responsePrism').innerHTML = 'Please Wait.. Fetching Results... ';
    
    

    if (requestType == 'GET'){
        fetch(url, {
            method: 'GET',
        }).then(response => response.text()).then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }


    if (requestType == 'POST'){
        let contentType = document.querySelector('input[name=contentType]:checked').value;
        if (contentType == 'params'){
            let data = {};
            for (let i=0; i<paramCount+1; i++){
                if(document.getElementById('parameterKey' + (i + 1)) != undefined){
                    let key = document.getElementById('parameterKey' + (i + 1)).value;
                    let value = document.getElementById('parameterValue' + (i + 1)).value
                    data[key] = value;
                }
            }
            data = JSON.stringify(data);
        }
        else {
            data = document.getElementById('requestJsonText').value;
        }
        fetch (url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text)
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }

})
