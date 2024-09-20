

function initSend(form){

    console.log(form);
    var serviceName = form.dataset.service;
    var serviceAction = form.dataset.serviceAction;
    var servicePlugin = form.dataset.plugin;
    var token = form.querySelector('input[name="__RequestVerificationToken"]');
    var message = form.querySelector("[data-form-belong=\"form-send__result\"]");

    if((serviceName !== null && typeof serviceName !== 'undefined' && serviceName!=="") && (serviceAction !== null && typeof serviceAction !== 'undefined' && serviceAction!=="") && (servicePlugin !== null && typeof servicePlugin !== 'undefined' && servicePlugin!=="")){
        
        var dataForm = {
            PluginName: servicePlugin,
            ServiceName: serviceName,
            ServiceAction: serviceAction,
            AssociateIdentifier: form.dataset.associate,
            BodyData: getDataForm(form,["__RequestVerificationToken"]),
            DataContext: null
        };

        var method = form.method;
        let action = form.dataset.action;

        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const testParam = params.get('test');
        
        if(testParam){
            action = `${action}?${params.toString()}`
        }

        var headers = {};
        if(token){
            headers={
                "Content-Type": "application/json",
                "RequestVerificationToken": token.value
            };
        }else{
            headers={
                "Content-Type": "application/json"
            };
        }

        fetch(action, {
            method: method,
            headers: headers,
            body: JSON.stringify(dataForm)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }
            return response.json();
        })
        .then(data => {
          if(data.status == 200){
            if(form.dataset.redirect != undefined){
                window.location.href = form.dataset.redirect;
            }
            else{
                message.innerHTML = data.result;
                message.className  = "";
                message.classList.add("w-full", "p-3", "border-2", "border-green-500","bg-[#13D40A]","text-white","transition-opacity", "duration-300", "opacity-100","block");
            }
          }
          else{
            throw new Error(data.message);
          }
        })
        .catch(error => {
            message.innerHTML = error;
            message.className  = "";
            message.classList.add("w-full", "p-3", "border-2", "border-red-500","bg-[#DE0000]","text-white","transition-opacity", "duration-300", "opacity-100","block");
            console.log(error);
        }).finally(()=>{
            form.reset();
            setTimeout(() => {
                message.classList.remove('opacity-100');
                message.classList.add('opacity-0');
                setTimeout(() => {
                    message.className  = "";
                    message.classList.add("w-full","hidden");
                    message.innerHTML=""; // Eliminar el elemento del DOM
                }, 300); // Esperar la duración de la transición para eliminar el elemento
              }, 10000); // Esperar 30 segundos antes de comenzar la transición
        });
    }
}

function getDataForm(form,exclude){
    
    // Crear objeto para almacenar datos
    var datos = {};
    
    // Recorrer elementos del formulario
    for (var i = 0; i < form.elements.length; i++) {
      var elemento = form.elements[i];
      
      // Verificar si el elemento tiene un nombre
      if (elemento.name) {
        if(exclude.indexOf(elemento.name) === -1)
            // Asignar el valor del elemento al nombre del campo en el objeto datos
            datos[elemento.name] = elemento.value;
      }
    }
    
    return datos;
}

export { initSend };