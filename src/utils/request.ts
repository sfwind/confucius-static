import qs from "qs"
import * as _ from "lodash"

export function appendQs(query: Object): string {
	return !query ? "" : `?${qs.stringify(query)}`
}

export function pget(url: string, query?: Object) {
	return fetch(`${url}${appendQs(query)}`).then((res) => res.json())
}

export function ppost(url: string, body: Object) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(_.merge({ tida_mixnick: window.__mixnick }, body))
	}).then((res) => res.json())
}
