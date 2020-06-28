export function createCardobase(newCardobase) {
	return {
		type: '@TEMP_CARDO/CREATE_CARDOBASE',
		newCardobase
	};
}

export function changeCardoName(newCardoName) {
	return {
		type: '@TEMP_CARDO/CHANGE_CARDO_NAME',
		newCardoName
	};
}
export function initCardoId(cardo) {
	return {
		type: '@TEMP_CARDO/INIT_CARDO_ID',
		cardo
	};
}