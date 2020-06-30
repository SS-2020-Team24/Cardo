import { AsyncStorage } from 'react-native';
export function finishEditCardo(newCardo) {
	// AsyncStorage.setItem(newCardo.cardoId, JSON.stringify(newCardo));
	return {
		type: '@MY_CARDO/FINISH_EDIT_CARDO',
		newCardo
	};
}

export function initMyCardo(myCardo){
	return {
		type: '@MY_CARDO/INIT_MYCARDO',
		myCardo
	};
}
export function deleteMyCardo(myCardo){
	return {
		type: '@MY_CARDO/DELETE_MYCARDO',
		myCardo
	};
}