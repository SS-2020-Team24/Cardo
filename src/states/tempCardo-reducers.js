const initViewCardoState = {
	cardoId: 3,
	cardoName: '我的桐人',
	cardobases: [{'initX': 10, 'initY': 10, 'text': '桐人'},
		{'initX': 10, 'initY': 40, 'text': '雙刀劍士'},
		{'initX': 10, 'initY': 70, 'text': '封弊者'},
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
		case '@TEMP_CARDO/CHANGE_CARDO_NAME':
			return {
				...state,
				cardoName: action.newCardoName
			}
		default:
			return state;
	}
}