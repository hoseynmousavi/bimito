import React, {PureComponent} from "react"
import LogoSvg from "../../media/svgs/LogoSvg"
import UserSvg from "../../media/svgs/UserSvg"
import Material from "../components/Material"

class Header extends PureComponent
{
    constructor(props)
    {
        super(props)
        this.state = {
            isCameDown: false,
        }
    }


    componentDidMount()
    {
        document.addEventListener("scroll", this.onScroll)
    }

    componentWillUnmount()
    {
        document.removeEventListener("scroll", this.onScroll)
    }

    onScroll = () =>
    {
        const {isCameDown} = this.state
        if (window.scrollY >= 10)
        {
            if (!isCameDown) this.setState({...this.state, isCameDown: true})
        }
        else
        {
            if (isCameDown) this.setState({...this.state, isCameDown: false})
        }
    }

    render()
    {
        const {isCameDown} = this.state
        const {user, logout} = this.props
        return (
            <div className={`header-container ${isCameDown ? "came-down" : ""}`}>
                <LogoSvg className="header-logo"/>
                <h1 className="header-title">سامانه مقایسه و خرید آنلاین بیمه</h1>
                <div className="header-sign-up">
                    {
                        user ?
                            <Material title="خروج" className="header-sign-up-logout" onClick={logout}>
                                <UserSvg className="header-user-svg"/>
                                <div className="header-sign-up-name">{user.firstName + " " + user.lastName}</div>
                            </Material>
                            :
                            "ثبت نام"
                    }
                </div>
            </div>
        )
    }
}

export default Header