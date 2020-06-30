import { AsyncStorage } from 'react-native';
export function finishEditCardo(newCardo) {
	// AsyncStorage.setItem(newCardo.cardoId, JSON.stringify(newCardo));
	return {
		type: '@OTHERS_CARDO/FINISH_EDIT_CARDO',
		newCardo
	};
}

export function initOthersCardo(othersCardo){
	return {
		type: '@OTHERS_CARDO/INIT_OTHERSCARDO',
		othersCardo
	};
}
export function deleteOthersCardo(othersCardo){
	return {
		type: '@OTHERS_CARDO/DELETE_OTHERSCARDO',
		othersCardo
	};
}