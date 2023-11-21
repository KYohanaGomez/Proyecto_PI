const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Activity', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
         },
      difficulty:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          min:1,
          max:5
        }
      },
      duration:{
        type: DataTypes.INTEGER,
            allowNull: false,
      },
      season:{
        type: DataTypes.ENUM('verano', 'otoño', 'invierno', 'primavera'),
        allowNull: false,
      }
    }, { timestamps: false });
  };