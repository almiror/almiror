document.addEventListener("DOMContentLoaded", async () => {
  const bufferABase64 = (buffer) =>
    btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const base64ABuffer = (buffer) =>
    Uint8Array.from(atob(buffer), (c) => c.charCodeAt(0));
  const LONGITUD_SAL = 16;
  const LONGITUD_VECTOR_INICIALIZACION = LONGITUD_SAL;
  const derivacionDeClaveBasadaEnContraseña = async (
    contraseña,
    sal,
    iteraciones,
    longitud,
    hash,
    algoritmo = "AES-CBC"
  ) => {
    const encoder = new TextEncoder();
    let keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(contraseña),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(sal),
        iterations: iteraciones,
        hash,
      },
      keyMaterial,
      { name: algoritmo, length: longitud },
      false,
      ["encrypt", "decrypt"]
    );
  };
  const encriptar = async (contraseña, textoPlano) => {
    const encoder = new TextEncoder();
    const sal = window.crypto.getRandomValues(new Uint8Array(LONGITUD_SAL));
    const vectorInicializacion = window.crypto.getRandomValues(
      new Uint8Array(LONGITUD_VECTOR_INICIALIZACION)
    );
    const bufferTextoPlano = encoder.encode(textoPlano);
    const clave = await derivacionDeClaveBasadaEnContraseña(
      contraseña,
      sal,
      100000,
      256,
      "SHA-256"
    );
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: vectorInicializacion },
      clave,
      bufferTextoPlano
    );
    return bufferABase64([
      ...sal,
      ...vectorInicializacion,
      ...new Uint8Array(encrypted),
    ]);
  };

  const desencriptar = async (contraseña, encriptadoEnBase64) => {
    const decoder = new TextDecoder();
    const datosEncriptados = base64ABuffer(encriptadoEnBase64);
    const sal = datosEncriptados.slice(0, LONGITUD_SAL);
    const vectorInicializacion = datosEncriptados.slice(
      0 + LONGITUD_SAL,
      LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION
    );
    const clave = await derivacionDeClaveBasadaEnContraseña(
      contraseña,
      sal,
      100000,
      256,
      "SHA-256"
    );
    const datosDesencriptadosComoBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: vectorInicializacion },
      clave,
      datosEncriptados.slice(LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION)
    );
    return decoder.decode(datosDesencriptadosComoBuffer);
  };
  //* CAPTURA DE DATOS
  const containerAccess = document.getElementById("view-progreses");
  const userName = document.getElementById("userName");
  const passwordUser = document.getElementById("passwords");
  const keySofwateAsigante = document
    .getElementById("main")
    .getAttribute("kadmsyssoft");

  let newKeySoftware = keySofwateAsigante.split("").reverse();
  let newKPassSoftware = keySofwateAsigante.split("").reverse();
  let keyClient = "";
  newKeySoftware.map((item) => {
    keyClient += item;
  }); 
  newKPassSoftware.pop();
  newKPassSoftware.shift();
  newKPassSoftware.shift();
  newKPassSoftware.pop();
  let passClient = "";
  newKPassSoftware.map((item) => {
    passClient += item;
  });
  
//   console.log(passClient);
//   console.log(keyClient);
  //   console.log(keyClient);
  //   console.log(passClient);
  document.getElementById("formLogin").addEventListener("submit", async (e) => {
    const keyImput = passClient.toLocaleUpperCase();
    const textoPlano = keyClient.toLocaleUpperCase();
    e.preventDefault();
    if (!keyImput) {
      return alert("Incorrect password");
    } else if (passwordUser.value.toLocaleUpperCase() !== keyImput) {
      return alert("PASSWORD INCORRECT");
    }
    //DATO A ENCRIPTAR
    if (!textoPlano) {
      return alert("Enter your password");
    } else if (userName.value.toLocaleUpperCase() !== textoPlano) {
      return alert("USER INCORRECT");
    }

    //ciframos los datos
    const encriptado = await encriptar(keyImput, textoPlano);

    // ! datos de salida
    const keyCustomer = keyImput;
    if (!keyCustomer) {
      return alert("Incorrect password");
    }
    const dataCifrada = encriptado;
    if (!dataCifrada) {
      return alert("Enter your password");
    }
    try {
      //desiframos los datos
      const desencriptado = await desencriptar(keyCustomer, dataCifrada);
      containerAccess.classList.add("full-none");
      document.getElementById("codesbody").classList.toggle("full-none");
      document.getElementById("footer").classList.toggle("full-none");
      appendBody();
    } catch (e) {
      console.log(
        "Error desencriptando: " +
          e.message +
          ". ¿La contraseña es la correcta y la información está en base64?"
      );
      //   console.log("LO SENTIMOS TU DATOS SON INCORRECTOS");
      return;
    }
  });
});
const appendBody = () => {
  let body =//html
    `
	<div class="s-mb-5">
                    <h1 class="h1 color-light s-mt-0">Sistema de Ventas POS </h1>
                    <div class="color-light smaller">
                        <span class="bg-dark-gradient s-pxy-2 s-radius-xy-4 s-mb-5 s-mr-2 color-success">
                            Sig. actualización: 23 Jul. 2022
                        </span>
                        <span class="bg-dark-gradient s-pxy-2 s-radius-xy-4 s-mb-5 s-mr-2">
                            Tipo: Softwware
                        </span>
                        <span class="bg-dark-gradient s-pxy-2 s-radius-xy-4 s-mb-5 s-mr-2 color-success">
                            V. Actual: 3.9
                        </span>
                        <span class="bg-dark-gradient s-pxy-2 s-radius-xy-4 s-mb-5 s-mr-2">
                            V. Softwware: Desktop
                        </span>
                        <span class="bg-dark-gradient s-pxy-2 s-radius-xy-4 s-mb-5 s-mr-2 color-danger">
                            LTS: No
                        </span>
                    </div>
                </div>
                <h2 class="t3 color-yellow-300">Estado de actualización</h2>
                <div>
                    <table class="s-width">
                        <thead class="color-link-muted normal">
                            <th class="s-pxy-2 s-text-left s-border-1"> # </th>
                            <th class="s-pxy-2 s-text-left s-border-1">DESCRIPCIÓN</th>
                            <th class="s-pxy-2 s-text-left s-border-1">ACTUALIZACIÓN</th>
                            <th class="s-pxy-2 s-text-left s-border-1">ESTADO</th>
                        </thead>
                        <tbody class="color-text-alt">
                            <!--<tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    CARGA DE PRODUCTOS EN EL AREA DE SERVICIO AL MOMENTO DE REALIZAR EL INGRESO DEL EQUIPO Y CON LA OPCIÓN DE AÑADIRLO POSTERIORMENTE
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    IMPRESIÓN Y REIMPRESIÓN DE COMPROBANTES EN FORMATO 80ML EN EL AREA DE SERVICIOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    HISTORIAL DE SERVICIOS REALIZADOS E IMPRESIÓN DE COMPROBANTE AREA  SERVICIOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    OPCIÓN A MODIFICAR EL ABONO INICIAL AREA SERVICIOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
									FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    GENERAR COMPROBANTE DE 80ML DE PAGO CUANDO UN CLIENTE PAGUE UNA DEUDA AREA CUENTAS POR COBRAR
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    HISTORIAL DE PAGOS ON OPCIÓN A REIMPRESIÓN DE TICKET 80ML AREA CUENTAS POR COBRAR
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    CREAR OFERTAS DE PRODUCTOS Y GENERAR CODIGO DE BARRA CON OPCIONES A ACTIVAR E INACTIVAR EL COMBO AREA PRODUCTOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    OPCIÓN A CREAR KITS DE PRODUCTOS Y GENERAR SU CODIGO DE BARRA AREA PRODUCTOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    OPCIÓN A AÑADIR MAS PRODUCTOS A UNA VENTA YA REALIZADA AREA MODIFICAR COMPROBANTES 
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    OPTIMIZACION DE DESCUENTO GLOBAL Y CREAR LA OPCIÓN PARA PONER UN LIMITE DE DESCUENTO GLOBAL AREA VENTAS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    CREAR LA OPCIÓN PARA VERIFICAR EL PRECIO DEL PRODUCTO AREA VENTAS, SEGÚN KIT, OFERTAS Y PRODUCTOS INDEPENDIENTE
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    OPCIÓN A FIJAR EL TIPO DE COMPROBANTE CON LA CUAL SE VA A TRABAJAR AREA VENTAS Y CONFIGURACIONES
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    DISEÑAR UN VENTANA DE PAGO  EN EL AREA DE VENTA DIRECTA DE PRODUCTOS (OJO. Esa ventana es del monto que paga el cliente y el vuelto que resivirá)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    ACTUALIZACIÓN AUTOMÁTICA DE PRECIO EN TODAS SUS UNIDADES DE MEDIDA CUANDO SE REALICE UNA COMPRA AREA COMPRAS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    OPTIMIZACION DE COMPROBANTE EN LA SECCIÓN DE VENTAS SOLO SE DEBEN DE MOSTRAR COMPROBANTES NECESARIOS AREA VENTAS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    PEDIDOS YA EN LA OPCIÓN VENTAS DEBE DE SER CONFIGURABLE AREA VENTAS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO 
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    REPORTE DETALLADO DE PRODUCTOS VENDIDOS EN DEL DÍA SEGÚN FECHA (CON LA OPCIÓN DE IMPRIMIR)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    LAS VENTAS DEL AREA DE SERVICIO SEAN REFLEJADOS EN EL CIERRE DE CAJA
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    IMPRESIÓN  REPORTE DE CIERRE DE CAJA POR PERSONAL (EN LOS 4 FORMATOS)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    LISTADO DE CIERRE DE CAJA CON OPCIÓN A BUSQUEDA CON OPCIONES A REIMPRESIÓN
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    IMPRESIÓN DE TICKETS EN CUENTAS POR COBRAR
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                           
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    QUITAR LAS ORDENES DE COMPRAS UNA VEZ INSERTADO LOS PRODUCTOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                            </tr>                                                  
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                EL SERVICIO DEBE DE MARCAR LA HORA DE SALIDA DEL EQUIPO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                      
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                               01
                                </td>
                                <td class="s-pxy-2 s-text-left">
                                AGREGAR EL CAMPO IMAGEN EN LA SECCION (ALMACEN PRODUCTOS)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                      
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           02
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                MOSTRAR LA IMAGEN EN LA SECCION VENTAS AL MOMENTO DE AGREGAR EL PRODUCTO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                      
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                               03
                                </td>
                                <td class="s-pxy-2 s-text-left">
                                MOSTRAR LA IMAGEN EN LA SECCION VENTAS FACTURA OLD
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                      
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           04
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                MOSTRAR LA IMAGEN EN LA SECCION VENTAS MODIFICAR VENTA
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                      
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           05
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                MOSTRAR LA IMAGEN EN LA SECCION SERVICIOS AL MOMENTO DE AGREGAR EL PRODUCTO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                     
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           06
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                MOSTRAR LA IMAGEN EN LA SECCION SERVICIOS AL AGREGAR MAS ACCESORIOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>        -->                      
                            <!--<tr class="smaller s-border-1">
                                <td class="s-pxy-2 color-warning s-text-center" colspan="4">
                                PRECIO POR LOS REQUERIMIENTOS Precio <span class="color-success">💲280 </span>( con descuento <span class="color-success">💲220 </span>) PENDIENTE 👇👇👇
                                </td>
                            </tr>                  
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           01
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                AJUSTAR EL REPORTE DE CAJA EN EL AREA VENTAS CIERRE DE CAJA (EL REPORTE EN 80 ML EN ESPECIFICO)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           02
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                INCLUIR EL DESCUENTO GENERAL DE CADA PERSONAL EN EL CIERRE DE CAJA (AREA VENTAS)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           03
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                HISTORIAL DE CUENTAS POR PAGAR CON LA OPCION DE REIMPRIMIR EL TICKET
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           04
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                REESTRUCTURACION GENEREAL DE CUENTAS POR COBRAR (listado tipo cuentas por pagar)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           05
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                AJUSTAR TABLA DE VENTAS (AREA VENTAS)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           06
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                GUARDAR VENTA TEMPORAL AREA VENTAS
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           07
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                OPCIÓN A MARCAR O DESMARCAR TODO LOS ITEMS DE LOS MODULOS (AREA MODULOS)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">
                            <td class="s-pxy-2 s-text-left">
                           08
                            </td>
                                <td class="s-pxy-2 s-text-left">
                                LAS OPCIONES DE IMPRESION DEBEN DE SER CONFIGURABLES PARA CADA TIPO DE COMPROBANTE DE VENTA
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>  
                            <tr class="smaller s-border-1">      
                            <td class="s-pxy-2 s-text-left">
                           09
                            </td>               
                                <td class="s-pxy-2 s-text-left">
                                LAS OPCION A ANULAR UNA FACTURA (3 FACTURAS) 
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">     
                            <td class="s-pxy-2 s-text-left">
                           10
                            </td>                
                                <td class="s-pxy-2 s-text-left">
                                AJUSTAR LA VENTA (MAXIMIZAR EL TAMAÑO) EN EL AREA FACTURA OLD
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                             
                            <tr class="smaller s-border-1">     
                            <td class="s-pxy-2 s-text-left">
                           11
                            </td>                
                                <td class="s-pxy-2 s-text-left">
                                EL SISTEMA DEBE CREAR AUTOMÁTICAMENTE LAS FECHA DE PAGO UNA VEZ CONIGURADO LA CANTIDAD DE DÍAS Y LA FECHA ESPECIFICADA (ventas)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                             
                            <tr class="smaller s-border-1">       
                            <td class="s-pxy-2 s-text-left">
                           12
                            </td>              
                                <td class="s-pxy-2 s-text-left">
                                EL SISTEMA DEBE CREAR AUTOMÁTICAMENTE LAS FECHA DE PAGO UNA VEZ CONIGURADO LA CANTIDAD DE DÍAS Y LA FECHA ESPECIFICADA (factura OLD)
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                       
                            <tr class="smaller s-border-1">       
                            <td class="s-pxy-2 s-text-left">
                           13
                            </td>              
                                <td class="s-pxy-2 s-text-left">
                                CARGAR LA FICHA TÉCNICA Y EL REGISTRO SANITARIO DEL PRODUCTO (AREA ALMACEN PRODUCTOS) 
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr> -->    
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    01
                                </td>
                                <td class="s-pxy-2 s-text-left">
                                    OCULTAR LAS OPCIONES DE FICHAS, IMAGEN DEL PRODUCTO, KITS,OFERTAS ON OPCION DE MOSTRAR
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                    FINALIZADO
                                </td>
                                <td class="s-pxy-2 s-text-left color-success">
                                FINALIZADO
                                </td>
                            </tr>                   
                            <tr class="smaller s-border-1">
                                <td class="s-pxy-2 s-text-left">
                                    01
                                </td>
                                <td class="s-pxy-2 s-text-left">
                                    AÑADIR FECHA DE VENCIMIENTO DE PRODUCTOS
                                </td>
                                <td class="s-pxy-2 s-text-left color-danger">
                                    PENDIENTE
                                </td>
                                <td class="s-pxy-2 s-text-left color-warning">
                                    PROCESO 10%
                                </td>
                            </tr>                   
                        </tbody>
                    </table>
                </div>                
	`;
  document.getElementById("bodyCode").innerHTML = body;
};
document.getElementById("view-dblok").addEventListener("click", () => {
  if (document.getElementById("blok-conten").classList.contains("full-none")) {
    document.getElementById("blok-conten").style.display = "block";
    document.getElementById("blok-conten").classList.remove("full-none");
    document.getElementById("view-dblok").innerText = "Ocultar código";
  } else {
    document.getElementById("blok-conten").classList.add("full-none");
    document.getElementById("blok-conten").style.display = "none";
    document.getElementById("view-dblok").innerText = "Mostrar código";
  }
});
document.getElementById("view-dblok-second").addEventListener("click", () => {
  if (
    document
      .getElementById("blok-conten-second")
      .classList.contains("full-none")
  ) {
    document.getElementById("blok-conten-second").style.display = "block";
    document.getElementById("blok-conten-second").classList.remove("full-none");
    document.getElementById("view-dblok-second").innerText = "Ocultar código";
  } else {
    document.getElementById("blok-conten-second").classList.add("full-none");
    document.getElementById("blok-conten-second").style.display = "none";
    document.getElementById("view-dblok-second").innerText = "Mostrar código";
  }
});
