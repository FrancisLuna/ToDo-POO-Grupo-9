function main(diasParaCompletar: number){
    let fechaDeCreacion: Date = new Date();
    let fechaDeVencimiento: Date = new Date();
    fechaDeVencimiento.setDate(fechaDeVencimiento.getDate()+ diasParaCompletar);
    console.log(fechaDeCreacion);
    console.log(fechaDeVencimiento);
  }
  
  main(45);