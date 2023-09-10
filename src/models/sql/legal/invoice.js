export default (sequelize, DataTypes) => {
	const Invoice = sequelize.define(
		"invoice",
		{
			organization_id: {
				type: DataTypes.STRING,
			},
			invoice_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			client_id: {
				type: DataTypes.STRING,
			},
			invoice_number: {
				type: DataTypes.STRING,
			},
			invoice_amount: {
				type: DataTypes.FLOAT,
			},
			invoice_url: {
				type: DataTypes.String,
			},
			invoice_status: {
				type: DataTypes.String,
			},
		},
		{
			timestamps: true,
			tableName: "invoices",
		}
	);
	return Invoice;
};
