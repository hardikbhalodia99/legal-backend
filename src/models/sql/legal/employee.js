export default (sequelize, DataTypes) => {
	const Employee = sequelize.define(
		"employee",
		{
			organization_id: {
				type: DataTypes.STRING,
			},
			employee_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			employee_name: {
				type: DataTypes.STRING,
			},
			employee_type: {
				type: DataTypes.STRING,
				defaultValue: "EMPLOYEE",
			},
			employee_email: {
				type: DataTypes.STRING,
			},
			employee_phone: {
				type: DataTypes.STRING,
			},
			appwrite_id: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			tableName: "employees",
		}
	);
	return Employee;
};
