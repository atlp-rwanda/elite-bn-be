'use strict';
module.exports = {
  up: async(queryInterface, DataTypes) =>{
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tid: 
    {
      type:DataTypes.STRING,
    defaultValue:DataTypes.UUIDV4
    },
    
      source: { 
        type: DataTypes.STRING,
        allowNull:false 
      },
      destination: {
        type: DataTypes.STRING,
        allowNull:false
      },
      accomodation: {
        type: DataTypes.STRING,
        allowNull:false
      },
      status: {
        type: DataTypes.STRING,
        allowNull:false
      },
      dep_date: {
        type:DataTypes.STRING,
        allowNull:false
      },
      ret_date: {
        type:DataTypes.STRING,
        allowNull:false
      },
      reason: {
        type:DataTypes.STRING,
        allowNull:false
      },
    status:{
      type:DataTypes.STRING,
      defaultValue:"Pending"
    },
      userId:{
        type:DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async(queryInterface, DataTypes) =>{
    await queryInterface.dropTable('trips');
  }
};