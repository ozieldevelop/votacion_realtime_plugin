class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, num_cliente,nombre,agencia,sala,name_evento){
        //var ventana ='Mesa';
        //console.log(salon);
        var user = {id, num_cliente,nombre,agencia,sala,name_evento};
        this.users.push(user);
		    //console.log(user);
        return user;
    }

    /*
    updateUser(pinId,valId){
        var i;
        for (i = 0; i < this.users.length; ++i) {
          if (this.users[i].name == pinId) {
            this.users[i].estado = valId;
          }
        }
    }

    updateVentana(pinId,ventana){
        console.log(pinId);
        var i;
        for (i = 0; i < this.users.length; ++i) {
          if (this.users[i].name == pinId) {
            //this.users[i].ventana = ventana;
		  }	
	    }
    }
  */
    removeUser(id){
	      
        var user = this.getUser(id);
        //console.log(user);
        if(user){
		        //console.log('Si existe');
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
        }
		else{
			//console.log('No existe');
		}
        return user;
    }

    getUser(id){
      //console.log(this.users);
        var returnUser = []// {id: 0, num_cliente:'', nombre: '', agencia: '' };
        this.users.filter((user) => {
          
            if(user.id == id){
                returnUser.id = user.id;
                returnUser.num_cliente = user.num_cliente;
                returnUser.nombre = user.nombre;
                returnUser.agencia = user.agencia;
                returnUser.sala = user.sala;
                returnUser.name_evento = user.name_evento;
            }
        });
       // console.log(returnUser);
        return returnUser;
    }
    /*
    getUserAdmin(){
        var returnUser = {id: 0, name: '', sala: '' };
        this.users.filter((user) => {
            if(user.administrador == true){
                returnUser.id = user.id;
                returnUser.name = user.name;
                returnUser.sala = user.sala;
                returnUser.estado = user.estado;
            }
        });
        
        return returnUser;
    }
    */
        

    getUserList(room){
       
        var users = this.users.filter((user) => {
            return (user.sala === room);
        });

        //console.log(users);
        
        var namesArray = users.map((user) => {
            return  {id: user.id, num_cliente: user.num_cliente, nombre: user.nombre, agencia: user.agencia, sala: user.sala, name_evento: user.name_evento};
        });
        
        console.log(namesArray);

        return namesArray;

    }
    
    /*
    getUserbyID(usuariored){
       
        var users = this.users.filter((user) => {
            return (user.name == usuariored );
        });

        //console.log(users);

        var namesArray = users.map((user) => {
            return  {iduser: user.id, usuario: user.name};
        });

        return namesArray;

    } 
    */
    /*
    getUserbyIDAdmin(){
        //console.log(usuariored);
        var users = this.users.filter((user) => {
            return (user.administrador == true);
        });

        //

        var namesArray = users.map((user) => {
            return  {iduser: user.id, usuario: user.name};
        });

        return namesArray;

    } 
    */

}

module.exports = {Users};