import React, {PureComponent} from "react"
import Material from "../components/Material"
import ArrowSvg from "../../media/svgs/ArrowSvg"
import {ClipLoader} from "react-spinners"
import SelectBox from "../components/SelectBox"
import api from "../../helpers/api"

class SelectDiscount extends PureComponent
{
    constructor(props)
    {
        super(props)
        this.state = {
            discounts: {},
            getDiscountsLoading: true,
        }
    }

    componentDidMount()
    {
        api.get("core/data/car-third-discount")
            .then(discounts => this.setState({...this.state, getDiscountsLoading: false, discounts: discounts.result.reduce((sum, item) => ({...sum, [item.id]: item}), {})}))
    }

    toggleThirdSelectBox = () =>
    {
        const openThirdSelectBox = !this.state.openThirdSelectBox
        this.setState({...this.state, openThirdSelectBox}, () =>
        {
            if (openThirdSelectBox) document.body.style.overflow = "hidden"
            else document.body.style.overflow = "auto"
        })
    }

    toggleDriverSelectBox = () =>
    {
        const openDriverSelectBox = !this.state.openDriverSelectBox
        this.setState({...this.state, openDriverSelectBox}, () =>
        {
            if (openDriverSelectBox) document.body.style.overflow = "hidden"
            else document.body.style.overflow = "auto"
        })
    }

    selectDriverDiscount = driverDiscount =>
    {
        this.props.setDriverDiscount(driverDiscount)
        this.toggleDriverSelectBox()
    }

    selectThirdDiscount = thirdDiscount =>
    {
        this.props.setThirdDiscount(thirdDiscount)
        this.toggleThirdSelectBox()
    }

    toggleShowDetail = () => this.props.toggleShowDetail()

    goBack = () => window.history.back()

    render()
    {
        const {discounts, openDriverSelectBox, openThirdSelectBox, getDiscountsLoading} = this.state
        const {insure, thirdDiscount, driverDiscount} = this.props
        return (
            <div className="select-car-page-container">
                <h2 className="select-car-page-title">بیمه {insure}</h2>
                <div className="select-car-page-desc">درصد تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید.</div>

                <div className="select-car-page-car-cont">
                    <div className="select-car-page-car-type-parent full-width">
                        <Material className={`select-car-page-car-type ${Object.values(discounts).length > 0 ? "" : "disabled"}`} onClick={Object.values(discounts).length > 0 ? this.toggleThirdSelectBox : null}>
                            <div>{thirdDiscount ? thirdDiscount.title : "درصد تخفیف ثالث"}</div>
                            {
                                Object.values(discounts).length > 0 ?
                                    <ArrowSvg className="select-car-page-car-type-svg"/>
                                    :
                                    getDiscountsLoading && <ClipLoader size={15} color="var(--primary-color)"/>
                            }
                        </Material>
                        {
                            openThirdSelectBox &&
                            <SelectBox data={Object.values(discounts)} keyField="id" showField="title" onSelect={this.selectThirdDiscount} toggle={this.toggleThirdSelectBox}/>
                        }
                    </div>

                    <div className="select-car-page-car-type-parent full-width">
                        <Material className={`select-car-page-car-type ${Object.values(discounts).length > 0 ? "" : "disabled"}`} onClick={Object.values(discounts).length > 0 ? this.toggleDriverSelectBox : null}>
                            <div>{driverDiscount ? driverDiscount.title : "درصد تخفیف حوادث راننده"}</div>
                            {
                                Object.values(discounts).length > 0 ?
                                    <ArrowSvg className="select-car-page-car-type-svg"/>
                                    :
                                    getDiscountsLoading && <ClipLoader size={15} color="var(--primary-color)"/>
                            }
                        </Material>
                        {
                            openDriverSelectBox &&
                            <SelectBox data={Object.values(discounts)} keyField="id" showField="title" onSelect={this.selectDriverDiscount} toggle={this.toggleDriverSelectBox}/>
                        }
                    </div>

                </div>

                <div className="next-previous-cont">
                    <Material className="next-previous-btn" onClick={this.goBack}>
                        <ArrowSvg className="next-previous-arrow previous"/>
                        <div>بازگشت</div>
                    </Material>
                    <Material className={`next-previous-btn done ${driverDiscount && thirdDiscount ? "" : "disabled"}`} onClick={driverDiscount && thirdDiscount ? this.toggleShowDetail : null}>
                        <ArrowSvg className="next-previous-arrow next"/>
                        <div>استعلام قیمت</div>
                    </Material>
                </div>

            </div>
        )
    }
}

export default SelectDiscount