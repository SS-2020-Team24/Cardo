const initOthersCardoState = {
	cardos: [{cardoId: 3, cardoName: 'TTTTTT', cardobases: [{'initX': 50, 'initY': 50, 'text':'操你媽', 'editingCardobaseId': -1, cardoTime: "2022/11/06 11:11:11"}]}
	]
};
import { AsyncStorage } from 'react-native';
// const initMyCardoState = (() => {
// 	let arr=[{cardoId: 3, cardoName: 'TTTTTT', cardobases: [{'initX': 50, 'initY': 50, 'text':'操你媽'}]}];
// 	console.log('init start');
// 	AsyncStorage.getAllKeys().then((data) => {
// 		data.forEach((key) => {
// 			AsyncStorage.getItem(key).then((data) => {
// 				arr.push(JSON.parse(data));
// 				console.log('deb');
// 				console.log(key);
// 				console.log(JSON.parse(data));
// 			}).catch((err) => {
// 				console.log("!!!!!!!!!!!!err");
// 			});
// 		});
// 	});
// 	return {cardos: arr};
// });
export function othersCardo(state = initOthersCardoState, action) {
	switch(action.type) {
		case '@OTHERS_CARDO/FINISH_EDIT_CARDO':
			let newCardos = state.cardos.slice(0);
			console.log("reducer here");
			console.log(action.newCardo);
			let exist = false;
			for(let p of newCardos) {
				if(p.cardoId == action.newCardo.cardoId) {
					p.cardoName = action.newCardo.cardoName;
					p.cardobases = action.newCardo.cardobases;
					p.editingCardobaseId = -1;
					p.cardoTime = action.newCardo.cardoTime;
					// p = action.newCardo;
					exist = true;
				}
			}
			if(!exist) {
				newCardos.push(action.newCardo);
			}
			let x = {
				...state, 
				cardos: newCardos
			};
			console.log(x);
			AsyncStorage.setItem("OthersCardo", JSON.stringify(x));

			return {
				...state, 
				cardos: newCardos
			};
		case '@OTHERS_CARDO/INIT_OTHERSCARDO':
			let tem = action.othersCardo;
			console.log("dd");
			console.log(tem);
			return tem;
		case '@OTHERS_CARDO/DELETE_OTHERSCARDO':
			let remainCardos = state.cardos.slice(0);
			remainCardos = remainCardos.filter((data) => {
				if(data.cardoId !== action.othersCardo.cardoId){
					return data;
				}
			})
			let y = {
				...state, 
				cardos: remainCardos
			};
			AsyncStorage.setItem("OthersCardo", JSON.stringify(y));
			return {
				...state, 
				cardos: remainCardos
			};
		default:
			return state;
	}
}