import React, {PureComponent} from "react"
import Material from "../components/Material"
import ArrowSvg from "../../media/svgs/ArrowSvg"
import {ClipLoader} from "react-spinners"
import api from "../../helpers/api"
import SelectBox from "../components/SelectBox"
import {Link} from "react-router-dom"

class SelectPreviousInsure extends PureComponent
{
    constructor(props)
    {
        super(props)
        this.state = {
            companies: {},
            getCompaniesLoading: true,
        }
    }

    componentDidMount()
    {
        api.get("core/data/companies")
            .then(companies => this.setState({...this.state, getCompaniesLoading: false, companies: companies.result.reduce((sum, item) => ({...sum, [item.id]: item}), {})}))
    }

    selectPreviousInsureCompany = previousInsureCompany =>
    {
        this.props.setPreviousInsureCompany(previousInsureCompany)
        this.toggleSelectBox()
    }

    toggleSelectBox = () =>
    {
        const openSelectBox = !this.state.openSelectBox
        this.setState({...this.state, openSelectBox}, () =>
        {
            if (openSelectBox) document.body.style.overflow = "hidden"
            else document.body.style.overflow = "auto"
        })
    }

    goBack = () => window.history.back()

    render()
    {
        const {companies, getCompaniesLoading, openSelectBox} = this.state
        const {insure, previousInsureCompany} = this.props
        return (
            <div className="select-car-page-container">
                <h2 className="select-car-page-title">بیمه {insure}</h2>
                <div className="select-car-page-desc">شرکت بیمه‌گر قبلی خود را در این بخش وارد کنید.</div>

                <div className="select-car-page-car-cont">
                    <div className="select-car-page-car-type-parent full-width">
                        <Material className={`select-car-page-car-type ${Object.values(companies).length > 0 ? "" : "disabled"}`} onClick={Object.values(companies).length > 0 ? this.toggleSelectBox : null}>
                            <div>{previousInsureCompany ? previousInsureCompany.company : "شرکت بیمه‌گر قبلی"}</div>
                            {
                                Object.values(companies).length > 0 ?
                                    <ArrowSvg className="select-car-page-car-type-svg"/>
                                    :
                                    getCompaniesLoading && <ClipLoader size={15} color="var(--primary-color)"/>
                            }
                        </Material>
                        {
                            openSelectBox &&
                            <SelectBox data={Object.values(companies)} keyField="id" showField="company" onSelect={this.selectPreviousInsureCompany} toggle={this.toggleSelectBox}/>
                        }
                    </div>
                </div>

                <div className="next-previous-cont">
                    <Material className="next-previous-btn" onClick={this.goBack}>
                        <ArrowSvg className="next-previous-arrow previous"/>
                        <div>بازگشت</div>
                    </Material>
                    <Link to="/select-discount" className={`next-previous-btn-link ${previousInsureCompany ? "" : "disabled"}`}>
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

export default SelectPreviousInsure