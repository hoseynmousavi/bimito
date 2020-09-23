import React, {PureComponent} from "react"
import Material from "./Material"
import * as PropTypes from "prop-types"

class SelectBox extends PureComponent
{
    static propTypes = {
        toggle: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        keyField: PropTypes.string.isRequired,
        showField: PropTypes.string.isRequired,
    }

    render()
    {
        const {toggle, onSelect, data, keyField, showField} = this.props
        return (
            <React.Fragment>
                <div className="select-car-page-box-back" onClick={toggle}/>
                <div className="select-car-page-box">
                    {
                        data.map(item =>
                            <Material key={item[keyField]} className="select-car-page-box-item" onClick={() => onSelect(item)}>{item[showField]}</Material>,
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default SelectBox