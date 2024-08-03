function setFormData(response) {
    document.getElementById("inputAddress").value = response.logradouro
    document.getElementById("inputNeighborhood").value = response.bairro;
    document.getElementById("inputCity").value = response.localidade;
    document.getElementById("inputState").value = response.uf
}
function erase_CEP_Form(){
     var response = 
        {
            logradouro:"",
            bairro:"",
            localidade:"",
            uf:""
        }
    
    
    setFormData(response)
    document.getElementById("number").value = ""
}


function setError(err) {
    var error = document.getElementById("errorCEP");
    error.innerHTML = err
}

function get_CEP_Data() {


    var cep = document.getElementById("inputSearch").value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    $.getJSON(url, (response) => {



        if ("erro" in response) {
            setError(`<p class="text-danger">Não Encontrado</p>`)
            //document.getElementById("form-block").reset();
            erase_CEP_Form();
            $("#number").prop("disabled", true);
            $("#number").prop("readonly", true);
        } else {
            setFormData(response);
            setError('')
            $("#number").prop("disabled", false);
            $("#number").prop("readonly", false);
        }

    }).fail(() => {
        var cepSearch = document.getElementById("inputSearch").value;
        if (cepSearch.length < 8  ) {
            setError(`<p class="text-danger">CEP Inválido</p>`)
        }



    });

}



var clients = [];
loadClients();
function loadClients() {
    for (let cli of clients) {
        addNewRow(cli)
    }
}

function save() {
    var cli = {
        id: clients.length + 1,
        name: document.getElementById("inputName").value,
        lastName: document.getElementById("inputLastName").value,
        addres: document.getElementById("inputAddress").value,
        num: document.getElementById("number").value,
        CEP: document.getElementById("inputSearch").value,
        city: document.getElementById("inputCity").value,
        neigh: document.getElementById("inputNeighborhood").value,
        state: document.getElementById("inputState").value,
    }

    var addres = document.getElementById("inputAddress").value;
    if (addres != "") {
        addNewRow(cli);
        clients.push(cli);  
        document.getElementById("form").reset();
        
    }
 
    
    
    
}

function addNewRow(cli) {
    var table = document.getElementById("table");
    newRow = table.insertRow();

    var idNode = document.createTextNode(cli.id);
    newRow.insertCell().appendChild(idNode);

    var name = newRow.insertCell();
    name.innerHTML = `${cli.name} ${cli.lastName}`

    var addres = newRow.insertCell();
    addres.innerHTML = `${cli.addres}, ${cli.num}`

    var CEPNode = document.createTextNode(cli.CEP);
    newRow.insertCell().appendChild(CEPNode);

    var neighNode = document.createTextNode(cli.neigh);
    newRow.insertCell().appendChild(neighNode);

    var cityNode = document.createTextNode(cli.city);
    newRow.insertCell().appendChild(cityNode);

    var stateNode = document.createTextNode(cli.state);
    newRow.insertCell().appendChild(stateNode);


}