import React, {PureComponent} from "react"
import CarSvg from "../../media/svgs/CarSvg"

class Footer extends PureComponent
{
    render()
    {
        return (
            <div className="footer-container">
                <CarSvg className="footer-car"/>
                <div className="footer-background"/>
            </div>
        )
    }
}

export default Footer