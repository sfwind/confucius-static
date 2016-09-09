import * as React from "react"
import * as _ from "lodash"
import "./Detail.less"
import { connect } from "react-redux"
import { pget } from "utils/request"
import { set, startLoad, endLoad } from "redux/actions"
import { Button } from "react-weui"
const P = "detail"

@connect(state => state)
export default class Main extends React.Component<any, any> {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			tab: 1,
		}
	}

	componentWillMount() {
		const { dispatch, location, detail } = this.props
		const pageId = Number(location.query.pageId)
		dispatch(startLoad())
		pget(`/chapter/load/${location.query.chapterId}/${pageId}`).then(res => {
			dispatch(endLoad())
			if (res.code === 200) {
				dispatch(set(`${P}.data[${pageId - 1}]`, res.msg))
			} else {
				alert(res.msg)
			}
		}).catch((err) => {
			alert(res.msg)
		})
		// 同步加载下一页
		this.silentLoad(pageId + 1)
	}

	componentWillReceiveProps(newProps) {
		if (this.props.location.query.pageId !== newProps.location.query.pageId) {
			const { dispatch, location, detail } = newProps
			const pageId = Number(location.query.pageId)
			// 获取当前页
			const currentPage = _.get(detail, `data[${pageId - 1}]`, null)
			if (currentPage) {
				// 已经预加载了 静默加载下一页
				pget(`/chapter/load/${location.query.chapterId}/${pageId + 1}`).then(res => {
					if (res.code === 200) {
						dispatch(set(`${P}.data[${pageId}]`, res.msg))
					} else {
						//静默加载 啥都不干
					}
				}).catch((err) => {
					//静默加载 啥都不干
				})
			} else {
				dispatch(startLoad())
				pget(`/chapter/load/${location.query.chapterId}/${pageId}`).then(res => {
					dispatch(endLoad())
					if (res.code === 200) {
						dispatch(set(`${P}.data[${pageId - 1}]`, res.msg))
					} else {
						alert(res.msg)
					}
				}).catch((err) => {
					alert(res.msg)
				})
				// 同步加载下一页
				this.silentLoad(pageId + 1)
			}
		}
	}

	silentLoad(id) {
		//静默加载 不loading
		const { dispatch } = this.props
		pget(`/chapter/load/${this.props.location.query.chapterId}/${id}`).then(res => {
			if (res.code === 200) {
				dispatch(set(`${P}.data[${id - 1}]`, res.msg))
			} else {
				//静默加载 啥都不干
			}
		}).catch((err) => {
			//静默加载 啥都不干
		})
	}

	nextPage() {
		const { pageId, chapterId } = this.props.location.query
		this.context.router.push({
			pathname: '/chapter/detail',
			query: { chapterId: chapterId, pageId: Number(pageId) + 1 }
		})
	}

	render() {
		const { detail, location } = this.props
		const pageId = location.query.pageId
		const materialList = _.get(detail, `data[${pageId - 1}].page.materialList`, [])

		const renderMaterial = (material) => {
			return (
				<div key={material.id}>{material.content}</div>
			)
		}

		return (
			<div className="detail">
				{_.map(materialList, material => renderMaterial(material))}
				<Button onClick={this.nextPage.bind(this)}>下一页</Button>
			</div>
		)
	}
}
