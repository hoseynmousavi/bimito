import React, {PureComponent} from "react"
import Material from "../components/Material"
import constant from "../../constants/constant"

class RegisterPage extends PureComponent
{
    constructor(props)
    {
        super(props)
        this.state = {
            fNameErr: null,
            lNameErr: null,
            phoneErr: null,
            passwordErr: null,

            fNameValid: false,
            lNameValid: false,
            phoneValid: false,
            passwordValid: false,
        }
    }

    componentDidMount()
    {
        document.addEventListener("keydown", this.onKeyDown)
    }

    componentWillUnmount()
    {
        document.removeEventListener("keydown", this.onKeyDown)
    }

    onKeyDown = e =>
    {
        const {fNameValid, lNameValid, phoneValid, passwordValid} = this.state
        e.keyCode === 13 && fNameValid && lNameValid && phoneValid && passwordValid && this.signUp()
    }

    changeName = e =>
    {
        const {name} = e.target
        const value = e.target.value.trim()
        if (name === "first_name")
        {
            if (value.length > 0)
            {
                if (constant.persianRegex.test(value)) this.setState({...this.state, fNameValid: true, fNameErr: null})
                else this.setState({...this.state, fNameValid: false, fNameErr: "فقط کاراکترهای فارسی!"})
            }
            else this.setState({...this.state, fNameValid: false, fNameErr: null})
        }
        else
        {
            if (value.length > 0)
            {
                if (constant.persianRegex.test(value)) this.setState({...this.state, lNameValid: true, lNameErr: null})
                else this.setState({...this.state, lNameValid: false, lNameErr: "فقط کاراکترهای فارسی!"})
            }
            else this.setState({...this.state, lNameValid: false, lNameErr: null})
        }
    }

    blurName = e =>
    {
        const {name} = e.target
        const value = e.target.value.trim()
        if (name === "first_name" && value.length === 0) this.setState({...this.state, fNameErr: "فیلد اجباری!"})
        else if (value.length === 0) this.setState({...this.state, lNameErr: "فیلد اجباری!"})
    }

    changePhone = e =>
    {
        const {value} = e.target
        const phoneValid = constant.phoneRegex.test(value)
        this.setState(state => ({...state, phoneValid, phoneErr: phoneValid ? null : state.phoneErr}))
    }

    blurPhone = e =>
    {
        const {value} = e.target
        if (value.length === 0) this.setState({...this.state, phoneErr: "فیلد اجباری!"})
        else if (!constant.phoneRegex.test(value)) this.setState({...this.state, phoneErr: "شماره وارد شده معتبر نیست!"})
    }

    changePassword = e =>
    {
        const {value} = e.target
        const passwordValid = constant.passwordRegex.test(value)
        this.setState(state => ({...state, passwordValid, passwordErr: passwordValid ? null : state.passwordErr}))
    }

    blurPassword = e =>
    {
        const {value} = e.target
        if (!constant.passwordRegex.test(value)) this.setState({...this.state, passwordErr: "رمز باید حداقل شامل یک کاراکتر بزرگ و یک کاراکتر کوچک و 4 تا 10 کاراکتر باشد!"})
    }

    signUp = () =>
    {
        const {setUser} = this.props
        const firstName = this.firstName.value.trim()
        const lastName = this.lastName.value.trim()
        const phone = this.phone.value
        const password = this.password.value

        setUser({firstName, lastName, phone, password})
    }

    render()
    {
        const {fNameErr, lNameErr, phoneErr, passwordErr, fNameValid, lNameValid, phoneValid, passwordValid} = this.state
        const isFormValid = fNameValid && lNameValid && phoneValid && passwordValid
        return (
            <div className="register-page-container">
                <h2 className="register-page-title">ثبت نام</h2>
                <div className="register-page-form">
                    <div className="register-page-name-cont">
                        <input ref={e => this.firstName = e} className={`register-page-input name ${fNameErr ? "err" : ""}`} name="first_name" placeholder="نام" onChange={this.changeName} onBlur={this.blurName}/>
                        <input ref={e => this.lastName = e} className={`register-page-input name ${lNameErr ? "err" : ""}`} name="last_name" placeholder="نام خانوادگی" onChange={this.changeName} onBlur={this.blurName}/>
                    </div>
                    <div className={`register-page-err ${fNameErr || lNameErr ? "show" : ""}`}>{fNameErr || lNameErr}</div>

                    <input ref={e => this.phone = e} className={`register-page-input phone ${phoneErr ? "err" : ""}`} name="phone" placeholder="شماره موبایل" type="number" onChange={this.changePhone} onBlur={this.blurPhone}/>
                    <div className={`register-page-err ${phoneErr ? "show" : ""}`}>{phoneErr}</div>

                    <input ref={e => this.password = e} className={`register-page-input ${passwordErr ? "err" : ""}`} name="password" type="password" autoComplete="new-password" placeholder="رمز عبور" maxLength={10} onChange={this.changePassword} onBlur={this.blurPassword}/>
                    <div className={`register-page-err ${passwordErr ? "show" : ""}`}>{passwordErr}</div>

                    <Material className={`register-page-submit ${isFormValid ? "valid" : ""}`} backgroundColor="rgba(255,255,255,0.3)" onClick={isFormValid ? this.signUp : null}>ثبت نام</Material>
                </div>
            </div>
        )
    }
}

export default RegisterPage