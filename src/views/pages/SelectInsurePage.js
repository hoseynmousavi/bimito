import React, {PureComponent} from "react"
import InsureSvg from "../../media/svgs/InsureSvg"
import {Link} from "react-router-dom"

class SelectInsurePage extends PureComponent
{

    setInsure(insure)
    {
        this.props.setInsure(insure)
    }

    render()
    {
        return (
            <div className="select-insure-page-container">
                <h2 className="select-insure-page-title">انتخاب بیمه</h2>
                <div>

                    <Link to="/select-car" className="select-insure-choice" onClick={() => this.setInsure("شخص ثالث")}>
                        <InsureSvg className="select-insure-choice-logo"/>
                        <div className="select-insure-choice-title">شخص ثالث</div>
                    </Link>

                    <Link to="/select-car" className="select-insure-choice disabled">
                        <InsureSvg className="select-insure-choice-logo"/>
                        <div className="select-insure-choice-title">بدنه</div>
                    </Link>

                </div>
            </div>
        )
    }
}

export default SelectInsurePage