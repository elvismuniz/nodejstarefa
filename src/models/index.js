const Sequelize = require('sequelize');

const sequelize = new Sequelize('avaliacao','postgres','masterkey',{
    host: 'localhost',
    dialect: 'postgres',
    define: {
        underscored: false,
        freezeTableName: true,
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        },
        timestamps: true
      },
})

/*******
 * TODO: Definição dos modelos.
 * Defina aqui os modelos a serem mapeados para entidades do banco de dados.
 *******/
const Usuario = sequelize.define('usuario', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
    },
      
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false, 
    },

    email: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true,
        validate: {
            max : 500,
            notNull: {
              msg: 'Por favor digite um e-mail'
            }
          }
    },    

    cpf: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: false,
    },      
      
    nascimento:  Sequelize.DATEONLY,
    
    
    senha: {
        type: Sequelize.STRING(200),
        allowNull: false,
    }
       
})

const Tarefa = sequelize.define('tarefa', {
    id: {
        primaryKey : true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
    
      },
    
      titulo: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
    
      descricao: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },

  concluido: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

/*******
 * TODO: Definição das relações.
 * Defina aqui os relacionamentos entre os modelos.
 *******/

Usuario.hasMany(Tarefa, {
    // ...
})

Tarefa.belongsTo(Usuario)

module.exports = {
    sequelize,
    Usuario,
    Tarefa,
};
