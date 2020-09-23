import React, {PureComponent, lazy, Suspense} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import Header from "./views/sections/Header"
import Footer from "./views/sections/Footer"
import ShowDetailModal from "./views/modals/ShowDetailModal"

const RegisterPage = lazy(() => import("./views/pages/RegisterPage"))
const SelectInsurePage = lazy(() => import("./views/pages/SelectInsurePage"))
const SelectCarPage = lazy(() => import("./views/pages/SelectCarPage"))
const SelectPreviousInsure = lazy(() => import("./views/pages/SelectPreviousInsure"))
const SelectDiscount = lazy(() => import("./views/pages/SelectDiscount"))

class App extends PureComponent
{
    constructor(props)
    {
        super(props)
        this.state = {
            user: undefined,
        }
    }

    componentDidMount()
    {
        if (localStorage.hasOwnProperty("user")) this.setState({...this.state, user: JSON.parse(localStorage.getItem("user"))})
        else this.setState({...this.state, user: null})
    }

    logout = () => this.setState({...this.state, user: null}, () => localStorage.removeItem("user"))

    setUser = user => this.setState({...this.state, user}, () => localStorage.setItem("user", JSON.stringify(user)))

    setInsure = insure => this.setState({...this.state, insure})

    setCarType = carType => this.setState({...this.state, carType, carModel: undefined})

    setCarModel = carModel => this.setState({...this.state, carModel})

    setPreviousInsureCompany = previousInsureCompany => this.setState({...this.state, previousInsureCompany})

    setThirdDiscount = thirdDiscount => this.setState({...this.state, thirdDiscount})

    setDriverDiscount = driverDiscount => this.setState({...this.state, driverDiscount})

    toggleShowDetail = () =>
    {
        const showDetail = !this.state.showDetail
        this.setState({...this.state, showDetail}, () =>
        {
            if (showDetail) document.body.style.overflow = "hidden"
            else document.body.style.overflow = "auto"
        })
    }

    render()
    {
        const {user, insure, carType, carModel, previousInsureCompany, thirdDiscount, driverDiscount, showDetail} = this.state
        return (
            <React.Fragment>
                <Header user={user} logout={this.logout}/>
                <main className="main">
                    <Suspense fallback={null}>
                        {
                            user ?
                                <Switch>
                                    {
                                        previousInsureCompany &&
                                        <Route exact path="/select-discount" render={() =>
                                            <React.Fragment>
                                                <SelectDiscount insure={insure}
                                                                setThirdDiscount={this.setThirdDiscount}
                                                                thirdDiscount={thirdDiscount}
                                                                setDriverDiscount={this.setDriverDiscount}
                                                                driverDiscount={driverDiscount}
                                                                setDiscount={this.setDiscount}
                                                                toggleShowDetail={this.toggleShowDetail}
                                                />
                                                {
                                                    showDetail &&
                                                    <ShowDetailModal insure={insure}
                                                                     carType={carType}
                                                                     carModel={carModel}
                                                                     previousInsureCompany={previousInsureCompany}
                                                                     thirdDiscount={thirdDiscount}
                                                                     driverDiscount={driverDiscount}
                                                                     toggle={this.toggleShowDetail}
                                                    />
                                                }
                                            </React.Fragment>
                                        }/>
                                    }
                                    {
                                        carModel &&
                                        <Route exact path="/select-previous-insure" render={() =>
                                            <SelectPreviousInsure insure={insure}
                                                                  setPreviousInsureCompany={this.setPreviousInsureCompany}
                                                                  previousInsureCompany={previousInsureCompany}
                                            />
                                        }/>
                                    }
                                    {
                                        insure &&
                                        <Route exact path="/select-car" render={() =>
                                            <SelectCarPage insure={insure}
                                                           setCarType={this.setCarType}
                                                           carType={carType}
                                                           setCarModel={this.setCarModel}
                                                           carModel={carModel}
                                            />
                                        }/>
                                    }
                                    <Route exact path="/select-insure" render={() => <SelectInsurePage setInsure={this.setInsure}/>}/>
                                    <Redirect to="/select-insure"/>
                                </Switch>
                                :
                                user !== undefined &&
                                <Switch>
                                    <Route exact path="/register" render={() => <RegisterPage setUser={this.setUser}/>}/>
                                    <Redirect to="/register"/>
                                </Switch>
                        }
                    </Suspense>
                </main>
                <Footer/>

            </React.Fragment>
        )
    }
}

export default App