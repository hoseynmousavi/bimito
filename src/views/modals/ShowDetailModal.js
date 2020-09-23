import React from "react"
import InsureSvg from "../../media/svgs/InsureSvg"
import Material from "../components/Material"

const ShowDetailModal = props =>
{
    const {toggle, insure, carType, carModel, previousInsureCompany, thirdDiscount, driverDiscount} = props
    return (
        <React.Fragment>
            <div className="select-car-page-box-back" onClick={toggle}/>
            <div className="show-detail-modal">

                <div className="select-insure-choice">
                    <InsureSvg className="select-insure-choice-logo"/>
                    <div className="select-insure-choice-title">{insure}</div>
                </div>

                <div className="select-car-page-car-cont">
                    <div className="select-car-page-car-type-parent">
                        <Material className="select-car-page-car-type">
                            <div>{carType.carType}</div>
                        </Material>
                    </div>
                    <div className="select-car-page-car-type-parent">
                        <Material className="select-car-page-car-type">
                            <div>{carModel.name}</div>
                        </Material>
                    </div>

                    <div className="select-car-page-car-type-parent full-width">
                        <Material className="select-car-page-car-type">
                            <div>{previousInsureCompany.company}</div>
                        </Material>
                    </div>

                    <div className="select-car-page-car-type-parent full-width">
                        <Material className="select-car-page-car-type">
                            <div>{thirdDiscount.title}</div>
                        </Material>
                    </div>

                    <div className="select-car-page-car-type-parent full-width">
                        <Material className="select-car-page-car-type">
                            <div>{driverDiscount.title}</div>
                        </Material>
                    </div>
                </div>

            </div>

        </React.Fragment>
    )
}

export default ShowDetailModal