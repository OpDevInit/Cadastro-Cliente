function setFormData(end, neigh, city, state) {
    document.getElementById("inputAddress").value = end
    document.getElementById("inputNeighborhood").value = neigh;
    document.getElementById("inputCity").value = city;
    document.getElementById("inputState").value = state;
}

function eraserData(){
    setFormData('','','','');
}

function get_CEP_Data() {
    $("#numero").prop("disabled", false);

    var cep = document.getElementById("inputSearch").value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    $.getJSON(url, (response) => {
        eraserData();
        setFormData(response.logradouro, response.bairro, response.localidade, response.uf);

    })
}

