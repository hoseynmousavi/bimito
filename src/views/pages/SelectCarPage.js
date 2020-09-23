import React, {Component} from "react"
import api from "../../helpers/api"
import Material from "../components/Material"
import ArrowSvg from "../../media/svgs/ArrowSvg"
import {ClipLoader} from "react-spinners"
import {Link} from "react-router-dom"
import SelectBox from "../components/SelectBox"

class SelectCarPage extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            carTypes: {},
            getCarTypesLoading: true,
        }
    }


    componentDidMount()
    {
        api.get("core/data/third-car-types")
            .then(carTypes => this.setState({...this.state, carTypes: carTypes.result.reduce((sum, item) => ({...sum, [item.carTypeID]: item}), {}), getCarTypesLoading: false}))
    }

    toggleTypeBox = () =>
    {
        const openTypeBox = !this.state.openTypeBox
        this.setState({...this.state, openTypeBox}, () =>
        {
            if (openTypeBox) document.body.style.overflow = "hidden"
            else document.body.style.overflow = "auto"
        })
    }

    selectCarType = carType =>
    {
        this.props.setCarType(carType)
        this.toggleTypeBox()
    }

    toggleModelBox = () =>
    {
        const openModelBox = !this.state.openModelBox
        this.setState({...this.state, openModelBox}, () =>
        {
            if (openModelBox) document.body.style.overflow = "hidden"
            else document.body.style.overflow = "auto"
        })
    }

    selectCarModel = carModel =>
    {
        this.props.setCarModel(carModel)
        this.toggleModelBox()
    }

    goBack = () => window.history.back()

    render()
    {
        const {carTypes, getCarTypesLoading, openTypeBox, openModelBox} = this.state
        const {insure, carType, carModel} = this.props
        return (
            <div className="select-car-page-container">
                <h2 className="select-car-page-title">بیمه {insure}</h2>
                <div className="select-car-page-desc">نوع و مدل خودروی خود را انتخاب کنید.</div>

                <div className="select-car-page-car-cont">
                    <div className="select-car-page-car-type-parent">
                        <Material className={`select-car-page-car-type ${Object.values(carTypes).length > 0 ? "" : "disabled"}`} onClick={Object.values(carTypes).length > 0 ? this.toggleTypeBox : null}>
                            <div>{carType ? carType.carType : "نوع خودرو"}</div>
                            {
                                Object.values(carTypes).length > 0 ?
                                    <ArrowSvg className="select-car-page-car-type-svg"/>
                                    :
                                    getCarTypesLoading && <ClipLoader size={15} color="var(--primary-color)"/>
                            }
                        </Material>
                        {
                            openTypeBox &&
                            <SelectBox toggle={this.toggleTypeBox} onSelect={this.selectCarType} data={Object.values(carTypes)} keyField="carTypeID" showField="carType"/>
                        }
                    </div>

                    <div className="select-car-page-car-type-parent">
                        <Material className={`select-car-page-car-type ${Object.values(carTypes).length > 0 && carType ? "" : "disabled"}`} onClick={Object.values(carTypes).length > 0 && carType ? this.toggleModelBox : null}>
                            <div>{carModel ? carModel.name : "مدل خودرو"}</div>
                            {
                                Object.values(carTypes).length > 0 ?
                                    <ArrowSvg className="select-car-page-car-type-svg"/>
                                    :
                                    getCarTypesLoading && <ClipLoader size={15} color="var(--primary-color)"/>
                            }
                        </Material>
                        {
                            openModelBox &&
                            <SelectBox toggle={this.toggleModelBox} onSelect={this.selectCarModel} data={carTypes[carType?.carTypeID]?.brand} keyField="id" showField="name"/>
                        }
                    </div>

                </div>

                <div className="next-previous-cont">
                    <Material className="next-previous-btn" onClick={this.goBack}>
                        <ArrowSvg className="next-previous-arrow previous"/>
                        <div>بازگشت</div>
                    </Material>
                    <Link to="/select-previous-insure" className={`next-previous-btn-link ${carModel ? "" : "disabled"}`}>
                        <Material className="next-previous-btn">
                            <ArrowSvg className="next-previous-arrow next"/>
                            <div>مرحله بعد</div>
                        </Material>
                    </Link>
                </div>

            </div>
        )
    }
}

export default SelectCarPage