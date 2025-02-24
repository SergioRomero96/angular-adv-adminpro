import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.scss']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) =>{
    //   if(false){
    //     resolve('Hola Mundo');
    //   }else{
    //     reject('Algo salio mal')
    //   }
    // })

    // promesa.then(mensaje =>{
    //   console.log(mensaje);
    // }).catch(err =>{
    //   console.log(err);
    // })

    // console.log("Fin del init");
    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    });
  }

  getUsuarios(){
    return new Promise(resolve =>{
      
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });

  }

}
