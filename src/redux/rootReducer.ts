import ReducerFactory from "./ReducerFactory"

export default new ReducerFactory()
	.setInitialState({
		personalInfoEdit: {
			name: '',
			gender: 'M',
			birthDay: '',
			email: '',
		},
	})
	.getReducer()
