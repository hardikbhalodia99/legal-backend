module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define(
		"payment",
		{
			legal_payment_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			external_order_id: {
				type: DataTypes.STRING,
			},
			external_payment_id: {
				type: DataTypes.STRING,
			},
			payment_status: {
				type: DataTypes.STRING,
			},
			payment_signature: {
				type: DataTypes.TEXT,
			},
			payment_provider: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: true,
			tableName: "payments",
		}
	);
	return Payment;
};
