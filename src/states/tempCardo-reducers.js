const initViewCardoState = {
	cardoId: 3,
	cardoName: '我的桐人',
	cardobases: [{'id': 0,'initX': 10, 'initY': 10, 'text': '桐人'},
		{'id': 1,'initX': 10, 'initY': 40, 'text': '雙刀劍士'},
		{'id': 2,'initX': 10, 'initY': 70, 'text': '封弊者'},
	]
};

export function tempCardo(state = initViewCardoState, action) {
	switch(action.type) {
		case '@TEMP_CARDO/CREATE_CARDOBASE':
			let newCardobases = state.cardobases.slice(0);
			newCardobases.push(action.newCardobase);
			return {
				...state, 
				cardobases: newCardobases
			};
		case '@TEMP_CARDO/UPDATE_CARDOBASE':
			let _newCardobases = state.cardobases.slice(0);
			for(let p of _newCardobases)
				if(p.id == action.newCardobase.id) {
					p.text = action.newCardobase.text;
					p.initX = action.newCardobase.initX;
					p.initY = action.newCardobase.initY;
				}
			return {
				...state,
				cardobases: _newCardobases
			};
		case '@TEMP_CARDO/CHANGE_CARDO_NAME':
			return {
				...state,
				cardoName: action.newCardoName
			};
		case '@TEMP_CARDO/INIT_CARDO_ID':
			return {
				...state,
				cardoId: action.cardo.cardoId,
				cardoName: action.cardo.cardoName,
				cardobases: action.cardo.cardobases
			};
		default:
			return state;
	}
}