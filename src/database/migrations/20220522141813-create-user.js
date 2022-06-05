'use strict';
export default {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
       },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      passwordChangedAt: {
        type: DataTypes.DATE
      },
      passwordResetExpires: {
        type: DataTypes.DATE
      },
      passwordResetToken: {type:DataTypes.STRING,
        defaultValue:""
      },
      socialMediaId: {
        type: DataTypes.STRING
      },
      provider: {
        type: DataTypes.STRING
      },
      isVerified: {
        type: DataTypes.BOOLEAN
      },
      gender: {
        type: DataTypes.STRING
      },
      preferredLanguage: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM,
        values: [ 'super user', 'super admin', 'travel admin', 'travel team member',
          'manager', 'requester', 'accommodation supplier' ]
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};