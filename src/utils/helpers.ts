import * as _ from "lodash"

export function isPending(state, key): boolean {
	return _.get(state, '$view.$pending') ? _.get(state, '$view.$pending')[key] : false
}

