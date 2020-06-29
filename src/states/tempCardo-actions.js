export function createCardobase(newCardobase) {
	return {
		type: '@TEMP_CARDO/CREATE_CARDOBASE',
		newCardobase
	};
}

export function updateCardobase(newCardobase) {
	return {
		type: '@TEMP_CARDO/UPDATE_CARDOBASE',
		newCardobase
	};	
}

export function changeCardoName(newCardoName) {
	return {
		type: '@TEMP_CARDO/CHANGE_CARDO_NAME',
		newCardoName
	};
}

export function clearCardo() {
	return {
		type: '@TEMP_CARDO/CLEAR_CARDO'
	}
}

export function updataEditingCardobaseId(newEditingCardobaseId) {
	return {
		type: '@TEMP_CARDO/UPDATE_EDITING_CARDOBASE_ID',
		newEditingCardobaseId
	};
}

export function initCardoId(cardo) {
	return {
		type: '@TEMP_CARDO/INIT_CARDO_ID',
		cardo
	};
}