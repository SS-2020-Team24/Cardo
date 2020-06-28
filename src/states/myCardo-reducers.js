const initMyCardoState = {
	cardos: [{cardoId: 3, cardoName: 'TTTTTT', cardobases: [{'initX': 50, 'initY': 50, 'text':'操你媽'}]}
	]
};

export function myCardo(state = initMyCardoState, action) {
	switch(action.type) {
		case '@MY_CARDO/FINISH_EDIT_CARDO':
			let newCardos = state.cardos.slice(0);
			
			let exist = false;
			for(let p of newCardos) {
				if(p.cardoId == action.newCardo.cardoId) {
					p.cardoName = action.newCardo.cardoName;
					p.cardobases = action.newCardo.cardobases;
					// p = action.newCardo;
					exist = true;
				}
			}
			if(!exist) {
				newCardos.push(action.newCardo);
			}
			return {
				...state, 
				cardos: newCardos
			};
		default:
			return state;
	}
}