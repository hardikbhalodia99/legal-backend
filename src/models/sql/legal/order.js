export default (sequelize, DataTypes) => {
	const Order = sequelize.define(
		"order",
		{
			organization_id: {
				type: DataTypes.STRING,
			},
			client_id: {
				type: DataTypes.STRING,
			},
			order_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			product_id: {
				type: DataTypes.STRING,
			},
			order_amount: {
				type: DataTypes.FLOAT,
			},
			reference_id: {
				type: DataTypes.STRING,
			},
			quantity: {
				type: DataTypes.INTEGER,
			},
			is_deleted : {
				type : DataTypes.BOOLEAN,
				defaultValue : false
			}
		},
		{
			timestamps: true,
			tableName: "orders",
		}
	);
	return Order;
};
