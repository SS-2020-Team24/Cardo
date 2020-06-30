const initMyCardoState = {
	cardos: [{cardoId: 3, cardoName: 'Example', cardobases: [{'initX': 50, 'initY': 50, 'text':'操你媽', 'editingCardobaseId': -1}], cardoTime: "2022/11/06 11:11:11"}
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
export function myCardo(state = initMyCardoState, action) {
	switch(action.type) {
		case '@MY_CARDO/FINISH_EDIT_CARDO':
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
			AsyncStorage.setItem("MyCardo", JSON.stringify(x));

			return {
				...state, 
				cardos: newCardos
			};
		case '@MY_CARDO/INIT_MYCARDO':
			let tem = action.myCardo;
			console.log("dd");
			console.log(tem);
			return tem;
		case '@MY_CARDO/DELETE_MYCARDO':
			// console.log("dere");
			let remainCardos = state.cardos.slice(0);
			remainCardos = remainCardos.filter((data) => {
				if(data.cardoId !== action.myCardo.cardoId){
					return data;
				}
			})
			let y = {
				...state, 
				cardos: remainCardos
			};
			AsyncStorage.setItem("MyCardo", JSON.stringify(y));
			return {
				...state, 
				cardos: remainCardos
			};
		default:
			return state;
	}
}