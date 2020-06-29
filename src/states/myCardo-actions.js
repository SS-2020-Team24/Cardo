import { AsyncStorage } from 'react-native';
export function finishEditCardo(newCardo) {
	// console.log(JSON.stringify(newCardo));
	// console.log(JSON.parse(JSON.stringify(newCardo)));
	AsyncStorage.setItem(newCardo.cardoId, JSON.stringify(newCardo));
	console.log("lookhere");
	console.log(newCardo);
	AsyncStorage.getItem(newCardo.cardoId).then((data) => {
		console.log(JSON.parse(data));
	});
	// AsyncStorage.getAllKeys().then((data) => {
	// 	// console.log(data);
	// 	data.forEach((key) => {
	// 		AsyncStorage.getItem(key).then((data) => {
	// 			console.log(JSON.parse(data));
	// 		}).catch((err) => {
	// 			console.log("!!!!!!!!!!!!err");
	// 		})

	// 	})
	// }).catch((err) => {
 //    	console.log("!!!!!!!!!!!!!error");
 //    });
	return {
		type: '@MY_CARDO/FINISH_EDIT_CARDO',
		newCardo
	};
}